<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfirmationMail;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class PaymentController extends Controller
{
    /**
     * Handle Razorpay webhook.
     * This is the source of truth for payment status — fires server-side from Razorpay.
     */
     public function webhook(Request $request)
{
    Log::info('Webhook HIT');

    $payload = $request->getContent();
    $signature = $request->header('X-Razorpay-Signature');
    $webhookSecret = config('razorpay.webhook_secret');

    // 🚨 Handle missing signature (manual calls / invalid requests)
    if (!$signature) {
        Log::warning('Razorpay Webhook: Missing signature');
        return response()->json(['error' => 'Missing signature'], 400);
    }

    // 🚨 Handle missing webhook secret
    if (!$webhookSecret) {
        Log::error('Razorpay Webhook: Missing webhook secret in config');
        return response()->json(['error' => 'Server misconfigured'], 500);
    }

    try {
        $api = new Api(config('razorpay.key'), config('razorpay.secret'));

        $api->utility->verifyWebhookSignature(
            $payload,
            $signature,
            $webhookSecret
        );

    } catch (SignatureVerificationError $e) {
        Log::error('Razorpay Signature Verification Failed: ' . $e->getMessage());
        return response()->json(['error' => 'Invalid signature'], 400);
    } catch (\Exception $e) {
        Log::error('Unexpected Webhook Error: ' . $e->getMessage());
        return response()->json(['error' => 'Server error'], 500);
    }

    // ✅ Decode payload safely
    $data = json_decode($payload, true);

    if (!$data) {
        Log::error('Invalid JSON payload');
        return response()->json(['error' => 'Invalid payload'], 400);
    }

    // ✅ Process only required events
    if (($data['event'] ?? null) === 'payment.captured') {

        $payment = $data['payload']['payment']['entity'] ?? null;

        if (!$payment) {
            Log::warning('Payment entity missing in payload');
            return response()->json(['status' => 'ignored']);
        }

        $orderId = $payment['order_id'] ?? null;
        $paymentId = $payment['id'] ?? null;

        if (!$orderId) {
            Log::warning('Order ID missing in payment payload');
            return response()->json(['status' => 'ignored']);
        }

        $registration = Registration::with(['event', 'participants'])
            ->where('razorpay_order_id', $orderId)
            ->first();

        if (!$registration) {
            Log::warning("Registration not found for Order ID: {$orderId}");
            return response()->json(['status' => 'ignored']);
        }

        // ✅ Prevent duplicate processing
        if ($registration->payment_status !== 'paid') {

            $registration->update([
                'payment_id'     => $paymentId,
                'payment_status' => 'paid',
            ]);

            try {
                Mail::to($registration->contact_email)
                    ->send(new RegistrationConfirmationMail($registration));

                Log::info("Email sent for Registration {$registration->id}");

            } catch (\Exception $e) {
                Log::error("Mail failed for Registration {$registration->id}: " . $e->getMessage());
            }

            Log::info("Registration {$registration->id} marked as PAID");
        } else {
            Log::info("Duplicate webhook ignored for Registration {$registration->id}");
        }
    }

    return response()->json(['status' => 'success']);
     }
}
