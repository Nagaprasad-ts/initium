<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function contact(): Response
    {
        $events = Event::with('category')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Contact', [
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ], [
            'name.required'    => 'Please enter your name.',
            'email.required'   => 'Please enter your email address.',
            'email.email'      => 'Please enter a valid email address.',
            'message.required' => 'Please enter a message.',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Message sent successfully!');
    }
}