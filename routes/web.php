<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/', [EventController::class, 'home'])->name('home');
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');

Route::get('/registration/individual/{slug}', [RegistrationController::class, 'individual'])->name('registration.individual');
Route::get('/registration/group/{slug}', [RegistrationController::class, 'group'])->name('registration.group');
Route::get('/registration/success/{id}', [RegistrationController::class, 'success'])->name('registration.success');

Route::post('/registration/submit', [RegistrationController::class, 'store'])->name('registration.submit');
Route::post('/razorpay/webhook', [PaymentController::class, 'webhook'])->name('razorpay.webhook');
