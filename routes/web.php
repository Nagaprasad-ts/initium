<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', [EventController::class, 'home'])->name('home');
// Route::get('/events', [EventController::class, 'index'])->name('events.index');

Route::get('/', [EventController::class, 'home'])->name('home');
Route::get('/about',    fn() => Inertia::render('About'))->name('about');
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/brochure', [EventController::class, 'brochure'])->name('brochure');

Route::get('/registration/individual/{slug}', [RegistrationController::class, 'individual'])->name('registration.individual');
Route::get('/registration/group/{slug}', [RegistrationController::class, 'group'])->name('registration.group');
Route::get('/registration/success/{id}', [RegistrationController::class, 'success'])->name('registration.success');
Route::post('/registration/verify', [RegistrationController::class, 'verify'])->name('registration.verify');

Route::post('/registration/submit', [RegistrationController::class, 'store'])->name('registration.submit');
Route::post('/razorpay/webhook', [PaymentController::class, 'webhook'])->name('razorpay.webhook');
