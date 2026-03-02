<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class PaymentController extends Controller
{
    /**
     * Handle Razorpay webhook.
     */
    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('X-Razorpay-Signature');
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
            $payment = $data['payload']['payment']['entity'];
            $orderId = $payment['order_id'];
            $paymentId = $payment['id'];

            $registration = Registration::where('razorpay_order_id', $orderId)->first();

            if ($registration) {
                $registration->update([
                    'payment_id' => $paymentId,
                    'payment_status' => 'paid',
                ]);

                Log::info("Registration {$registration->id} marked as paid. Payment ID: {$paymentId}");
            } else {
                Log::warning("Razorpay Webhook: Registration not found for Order ID: {$orderId}");
            }
        }

        return response()->json(['status' => 'success']);
    }
}
