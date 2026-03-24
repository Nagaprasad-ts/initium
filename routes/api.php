<?php

use App\Http\Controllers\PaymentController;

Route::post('/razorpay/webhook', [PaymentController::class, 'webhook'])->name('razorpay.webhook');
