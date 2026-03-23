<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display the home page.
     */
    public function home(): Response
    {
        $events = Event::query()
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->get();

        $categories = Category::all();

        return Inertia::render('Home', [
            'events' => $events,
            'categories' => $categories,
        ]);
    }

    public function test(): Response
    {
        $events = Event::query()
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->get();

        $categories = Category::all();

        return Inertia::render('WhatsApp', [
            'events' => $events,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the brochure page.
     */
    public function brochure(): Response
    {
        $events = Event::query()
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->get();

        $categories = Category::all();

        return Inertia::render('Brochure', [
            'events' => $events,
            'categories' => $categories,
        ]);
    }


    /**
     * Display a listing of the events.
     */
    public function index(): Response
    {
        $events = Event::query()
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->get();

        $categories = Category::all();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'categories' => $categories,
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
