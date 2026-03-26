<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/razorpay/webhook', [PaymentController::class, 'webhook'])->name('razorpay.webhook');
