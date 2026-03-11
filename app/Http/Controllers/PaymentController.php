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
        $payload       = $request->getContent();
        $signature     = $request->header('X-Razorpay-Signature');
        $webhookSecret = config('razorpay.webhook_secret');

        try {
            $api = new Api(config('razorpay.key'), config('razorpay.secret'));
            $api->utility->verifyWebhookSignature($payload, $signature, $webhookSecret);
        } catch (SignatureVerificationError $e) {
            Log::error('Razorpay Webhook Signature Verification Failed: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $data = json_decode($payload, true);

        if ($data['event'] === 'payment.captured') {
            $payment  = $data['payload']['payment']['entity'];
            $orderId  = $payment['order_id'];
            $paymentId = $payment['id'];

            $registration = Registration::with(['event', 'participants'])
                ->where('razorpay_order_id', $orderId)
                ->first();

            if ($registration) {
                // Guard against duplicate processing on repeated webhooks
                if ($registration->payment_status !== 'paid') {
                    $registration->update([
                        'payment_id'     => $paymentId,
                        'payment_status' => 'paid',
                    ]);

                    try {
                        Mail::to($registration->contact_email)
                            ->send(new RegistrationConfirmationMail($registration));

                        Log::info("Confirmation email sent for Registration {$registration->id}");
                    } catch (\Exception $e) {
                        Log::error("Failed to send email for Registration {$registration->id}: " . $e->getMessage());
                    }

                    Log::info("Registration {$registration->id} marked as paid. Payment ID: {$paymentId}");
                }
            } else {
                Log::warning("Razorpay Webhook: Registration not found for Order ID: {$orderId}");
            }
        }

        return response()->json(['status' => 'success']);
    }
}