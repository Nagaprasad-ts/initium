import { Link, Head } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    category_id: number;
    category: Category;
    type: 'individual' | 'group' | 'both';
    venue: string;
    event_start_date: string;
    start_time: string;
    end_time: string;
    price: string;
    banner_image: string;
}

interface Category {
    id: number;
    name: string;
}

const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

// Cycle through neon colours per category
const CATEGORY_COLORS = ['#FF0080', '#00F5FF', '#FFD700', '#7C3AED'];

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
            { threshold: 0.05 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

function EventCard({ event, color }: { event: Event; color: string }) {
    return (
        <div
            className="neon-card flex flex-col overflow-hidden rounded-2xl"
            style={{ borderColor: color + '33' }}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={event.banner_image}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-700"
                    style={{ filter: 'brightness(0.75) saturate(1.2)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* colour tint overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${color}33, transparent 60%)` }}
                />
                {/* Type badge */}
                <div className="absolute left-3 top-3">
                    <span
                        className="font-orbitron rounded px-3 py-1 text-[9px] uppercase tracking-widest"
                        style={{
                            background: 'rgba(11,11,15,0.8)',
                            border: `1px solid ${color}55`,
                            color,
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {event.type === 'both' ? 'Individual & Group' : event.type}
                    </span>
                </div>
                {/* Price badge */}
                <div className="absolute bottom-3 right-3">
                    <span
                        className="font-bebas rounded px-3 py-1 text-sm tracking-widest"
                        style={{
                            background: color,
                            color: '#000',
                            boxShadow: `0 0 12px ${color}`,
                        }}
                    >
                        ₹{parseFloat(event.price).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <h3
                    className="font-bebas mb-2 text-2xl tracking-widest text-white transition-colors"
                    style={{ letterSpacing: 2 }}
                >
                    {event.name}
                </h3>

                <div className="mb-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-white/45">
                        <span style={{ color }}>📅</span>
                        <span>{formatDate(event.event_start_date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/45">
                        <span style={{ color }}>📍</span>
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <Link
                        href={`/events/${event.slug}`}
                        className="btn-neon block w-full text-center"
                        style={{ borderColor: color, color }}
                    >
                        REGISTER NOW →
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CategorySection({ category, events, colorIndex }: { category: Category; events: Event[]; colorIndex: number }) {
    const ref = useReveal();
    const color = CATEGORY_COLORS[colorIndex % CATEGORY_COLORS.length];

    return (
        <div ref={ref} className="section-reveal mb-20">
            {/* Category heading */}
            <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
                <h2
                    className="font-bebas text-3xl tracking-[6px] md:text-4xl"
                    style={{ color, textShadow: `0 0 15px ${color}` }}
                >
                    {category.name}
                </h2>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${color}, transparent)` }} />
            </div>

            {/* Events grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(ev => (
                    <EventCard key={ev.id} event={ev} color={color} />
                ))}
            </div>
        </div>
    );
}

export default function Index({ events, categories }: { events: Event[]; categories: Category[] }) {
    return (
        <Layout>
            <Head title="Explore Events | Initium 2026" />

            {/* Page header */}
            <div
                className="border-b px-5 pb-14 pt-16"
                style={{
                    background: 'radial-gradient(ellipse at 30% 0%, rgba(255,0,128,0.15) 0%, transparent 60%)',
                    borderColor: 'rgba(255,0,128,0.12)',
                }}
            >
                <div className="mx-auto max-w-3xl text-center">
                    <p
                        className="font-orbitron mb-3 text-[11px] uppercase tracking-[6px]"
                        style={{ color: '#FF0080', opacity: 0.7 }}
                    >
                        PLACE YOUR BET
                    </p>
                    <h1
                        className="font-bebas mb-4 text-[clamp(42px,9vw,90px)] leading-none tracking-widest text-white"
                    >
                        ALL{' '}
                        <span style={{ color: '#FF0080', textShadow: '0 0 30px #FF0080' }}>
                            EVENTS
                        </span>
                    </h1>
                    {/* divider */}
                    <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to left, #FF0080, transparent)' }} />
                        <div className="h-2 w-2 rounded-full" style={{ background: '#FF0080', boxShadow: '0 0 12px #FF0080' }} />
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to right, #FF0080, transparent)' }} />
                    </div>
                    <p className="text-base text-white/50">
                        Compete, perform, and shine — browse all events and find your arena.
                    </p>
                </div>
            </div>

            {/* Events by category */}
            <div className="mx-auto max-w-7xl px-5 py-14">
                {categories.map((category, idx) => {
                    const categoryEvents = events.filter(e => e.category_id === category.id);
                    if (categoryEvents.length === 0) return null;
                    return (
                        <CategorySection
                            key={category.id}
                            category={category}
                            events={categoryEvents}
                            colorIndex={idx}
                        />
                    );
                })}

                {events.length === 0 && (
                    <div
                        className="neon-card rounded-2xl py-24 text-center"
                        style={{ borderColor: 'rgba(255,0,128,0.2)' }}
                    >
                        <p className="font-bebas text-3xl tracking-widest text-white/30">
                            NO EVENTS FOUND
                        </p>
                        <p className="mt-2 text-sm text-white/20">Stay tuned — we're adding more soon!</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
