<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Razorpay\Api\Api;

class RegistrationController extends Controller
{
    /**
     * Display the individual registration form.
     */
    public function individual(string $slug): Response|\Illuminate\Http\RedirectResponse
    {
        $event = Event::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        if (! $event->hasCapacity()) {
            return redirect()->route('events.show', $slug)->with('error', 'This event has reached its maximum capacity.');
        }

        if (! $event->isIndividualSupported()) {
            return redirect()->route('events.show', $slug)->with('error', 'Individual registration is not supported for this event.');
        }

        return Inertia::render('Registration/Individual', [
            'event' => $event,
        ]);
    }

    /**
     * Display the group registration form.
     */
    public function group(string $slug): Response|\Illuminate\Http\RedirectResponse
    {
        $event = Event::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        if (! $event->hasCapacity()) {
            return redirect()->route('events.show', $slug)->with('error', 'This event has reached its maximum capacity.');
        }

        if (! $event->isGroupSupported()) {
            return redirect()->route('events.show', $slug)->with('error', 'Group registration is not supported for this event.');
        }

        return Inertia::render('Registration/Group', [
            'event' => $event,
        ]);
    }

    /**
     * Store a new registration and create a Razorpay order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id'          => ['required', 'exists:events,id'],
            'registration_type' => ['required', 'in:individual,group'],
            'college_name'      => ['required', 'string', 'max:255'],
            'contact_email'     => ['required', 'regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/', 'max:255'],
            'contact_phone'     => ['required', 'digits:10'],
            'team_name'         => ['nullable', 'required_if:registration_type,group', 'string', 'max:255'],
            'name'              => ['nullable', 'required_if:registration_type,individual', 'string', 'max:255'],
            'student_id'        => ['nullable', 'required_if:registration_type,individual', 'string', 'max:255'],
            'participants'      => ['nullable', 'required_if:registration_type,group', 'array'],
        ], [
            'contact_email.required' => 'Email is required.',
            'contact_email.regex'    => 'Invalid email address.',
            'contact_email.max'      => 'Email address is too long.',
            'contact_phone.required' => 'Phone number is required.',
            'contact_phone.digits'   => 'Phone number must be exactly 10 digits.',
        ]);

        $event = Event::findOrFail($validated['event_id']);

        if ($validated['registration_type'] === 'group') {
            $min = $event->min;
            $max = $event->max;

            $request->validate([
                'participants'                => ['required', 'array', "min:$min", "max:$max"],
                'participants.*.name'         => ['required', 'string', 'max:255'],
                'participants.*.email'        => ['required', 'regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/', 'max:255'],
                'participants.*.phone'        => ['required', 'digits:10'],
                'participants.*.student_id'   => ['required', 'string', 'max:255'],
            ], [
                'participants.*.email.required' => 'Email is required.',
                'participants.*.email.regex'    => 'Invalid email address.',
                'participants.*.email.max'      => 'Email address is too long.',
                'participants.*.phone.required' => 'Phone number is required.',
                'participants.*.phone.digits'   => 'Phone number must be exactly 10 digits.',
            ]);

            $validated = array_merge($validated, $request->only('participants'));
        }

        if (! $event->hasCapacity()) {
            return response()->json(['error' => 'This event has reached its maximum capacity.'], 422);
        }

        return DB::transaction(function () use ($validated, $event) {
            $registration = Registration::create([
                'event_id'          => $event->id,
                'registration_type' => $validated['registration_type'],
                'team_name'         => $validated['team_name'] ?? null,
                'college_name'      => $validated['college_name'],
                'contact_email'     => $validated['contact_email'],
                'contact_phone'     => $validated['contact_phone'],
                'total_amount'      => $event->price,
                'payment_status'    => 'pending',
            ]);

            if ($validated['registration_type'] === 'individual') {
                $registration->participants()->create([
                    'name'       => $validated['name'],
                    'email'      => $validated['contact_email'],
                    'phone'      => $validated['contact_phone'],
                    'student_id' => $validated['student_id'],
                ]);
            } else {
                foreach ($validated['participants'] as $participant) {
                    $registration->participants()->create([
                        'name'       => $participant['name'],
                        'email'      => $participant['email'],
                        'phone'      => $participant['phone'],
                        'student_id' => $participant['student_id'],
                    ]);
                }
            }

            try {
                $api = new Api(config('razorpay.key'), config('razorpay.secret'));

                $razorpayOrder = $api->order->create([
                    'receipt'  => 'rcpt_' . $registration->id,
                    'amount'   => $registration->total_amount * 100, // paise
                    'currency' => 'INR',
                    'notes'    => [
                        'registration_id' => $registration->id,
                        'event_name'      => $event->name,
                        'event'           => 'Initium 2026',
                    ],
                ]);

                $registration->update(['razorpay_order_id' => $razorpayOrder['id']]);

                return response()->json([
                    'registration_id'  => $registration->id,
                    'razorpay_order_id' => $razorpayOrder['id'],
                    'amount'           => $registration->total_amount,
                    'razorpay_key'     => config('razorpay.key'),
                    'contact_name'     => $validated['registration_type'] === 'individual'
                        ? $validated['name']
                        : ($validated['team_name'] . ' Leader'),
                    'contact_email'    => $validated['contact_email'],
                    'contact_phone'    => $validated['contact_phone'],
                    'event_name'       => $event->name,
                ]);
            } catch (\Exception $e) {
                if (config('app.debug')) {
                    return response()->json([
                        'error'           => 'Razorpay integration failed: ' . $e->getMessage(),
                        'registration_id' => $registration->id,
                        'mock_payment'    => true,
                        'debug_error'     => $e->getMessage(),
                    ], 200);
                }
                throw $e;
            }
        });
    }

    /**
     * Verify Razorpay payment signature from the frontend callback.
     * Email is handled by the webhook — this only updates razorpay_payment_id and confirms status.
     */
    public function verify(Request $request)
    {
        $validated = $request->validate([
            'razorpay_order_id'   => ['required', 'string'],
            'razorpay_payment_id' => ['required', 'string'],
            'razorpay_signature'  => ['required', 'string'],
            'registration_id'     => ['required', 'exists:registrations,id'],
        ]);

        $api = new Api(config('razorpay.key'), config('razorpay.secret'));

        try {
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id'   => $validated['razorpay_order_id'],
                'razorpay_payment_id' => $validated['razorpay_payment_id'],
                'razorpay_signature'  => $validated['razorpay_signature'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Payment verification failed.'], 422);
        }

        $registration = Registration::findOrFail($validated['registration_id']);

        // Store the payment ID — webhook may have already set status to 'paid'
        // If webhook hasn't fired yet, set it here as a fallback
        $registration->update([
            'razorpay_payment_id' => $validated['razorpay_payment_id'],
            'payment_status'      => 'paid',
        ]);

        return response()->json([
            'message'         => 'Payment verified successfully.',
            'registration_id' => $registration->id,
        ]);
    }

    /**
     * Display the registration success page.
     */
    public function success(int $id): Response|\Illuminate\Http\RedirectResponse
    {
        $registration = Registration::with('event')->findOrFail($id);

        if ($registration->payment_status !== 'paid') {
            return redirect()->route('home');
        }

        return Inertia::render('Registration/Success', [
            'registration' => $registration,
        ]);
    }
}