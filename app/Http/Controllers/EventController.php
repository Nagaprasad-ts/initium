<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display the home page.
     */
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    /**
     * Display a listing of the events.
     */
    public function index(): Response
    {
        $events = Event::query()
            ->where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Display the specified event.
     */
    public function show(string $slug): Response
    {
        $event = Event::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Events/Show', [
            'event' => [
                ...$event->toArray(),
                'banner_image' => $event->banner_image_url,
            ],
            'has_capacity' => $event->hasCapacity(),
        ]);
    }
}
