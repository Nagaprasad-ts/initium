import { Link, Head, usePage } from '@inertiajs/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: 'individual' | 'group' | 'both';
    venue: string;
    event_start_date: string;
    event_end_date?: string | undefined;
    start_time: string;
    end_time: string;
    price: string;
    banner_image: string;
}

interface ShowProps {
    event: Event;
    has_capacity: boolean;
}

const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    const day   = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year  = d.getFullYear();
    return `${day}-${month}-${year}`;
};

export default function Show({ event, has_capacity }: ShowProps) {
    const { flash } = usePage<{ flash: { error?: string } }>().props;

    const typeColor = event.type === 'group' ? '#7C3AED' : event.type === 'both' ? '#FFD700' : '#FF0080';

    return (
        <Layout>
            <Head title={`${event.name} | Initium 2026`} />

            {/* Flash error */}
            {flash?.error && (
                <div className="relative z-20 mx-auto max-w-5xl px-5 pt-6">
                    <div
                        className="rounded-lg p-4 font-bold"
                        style={{
                            background: 'rgba(255,0,0,0.08)',
                            border: '1px solid rgba(255,0,0,0.4)',
                            color: '#ff6b6b',
                        }}
                    >
                        {flash.error}
                    </div>
                </div>
            )}

            {/* ── Hero Banner ───────────────────────────────── */}
            <div className="relative h-[55vh] overflow-hidden" style={{ minHeight: 320 }}>
                <img
                    src={event.banner_image}
                    alt={event.name}
                    className="h-full w-full object-cover"
                    style={{ opacity: 0.5, filter: 'saturate(1.3) brightness(0.7)' }}
                />
                {/* gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0F 0%, rgba(11,11,15,0.5) 50%, transparent 100%)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${typeColor}18, transparent 60%)` }} />

                {/* Badges */}
                <div className="absolute left-5 top-6 flex gap-3">
                    <span
                        className="font-orbitron rounded px-3 py-1.5 text-[9px] uppercase tracking-widest"
                        style={{
                            background: typeColor,
                            color: '#000',
                            boxShadow: `0 0 15px ${typeColor}`,
                        }}
                    >
                        {event.type === 'both' ? 'Individual & Group' : event.type} Registration
                    </span>
                    {!has_capacity && (
                        <span
                            className="font-orbitron rounded px-3 py-1.5 text-[9px] uppercase tracking-widest"
                            style={{ background: 'rgba(255,0,0,0.8)', color: '#fff', animation: 'pulse 2s infinite' }}
                        >
                            EVENT FULL
                        </span>
                    )}
                </div>

                {/* Event title at bottom */}
                <div className="absolute bottom-0 left-0 w-full px-5 pb-8 md:px-10">
                    <div className="mx-auto max-w-5xl">
                        <h1
                            className="font-bebas mb-4 text-[clamp(36px,8vw,80px)] leading-none tracking-widest text-white"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                        >
                            {event.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/60">
                            <div className="flex items-center gap-2">
                                <Clock size={15} style={{ color: typeColor }} />
                                <span>{event.start_time} – {event.end_time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={15} style={{ color: typeColor }} />
                                <span>{event.venue}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={15} style={{ color: typeColor }} />
                                <span>
                                    {formatDate(event.event_start_date)}
                                    {event.event_end_date && <> &amp; {formatDate(event.event_end_date)}</>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content ───────────────────────────────────── */}
            <div className="mx-auto max-w-5xl px-5 py-14">
                <div className="grid gap-12 lg:grid-cols-3">

                    {/* Description */}
                    <div className="lg:col-span-2">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-8 w-1.5 rounded-full" style={{ background: typeColor, boxShadow: `0 0 10px ${typeColor}` }} />
                            <h2 className="font-bebas text-3xl tracking-widest text-white">OVERVIEW</h2>
                        </div>
                        <div
                            className="prose prose-invert prose-lg max-w-none leading-relaxed text-white/65"
                            dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                    </div>

                    {/* Registration sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">

                            {/* Price + Register card */}
                            <div
                                className="neon-card mb-5 overflow-hidden rounded-2xl"
                                style={{ borderColor: typeColor + '44' }}
                            >
                                {/* Top accent stripe */}
                                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${typeColor}, transparent)` }} />

                                <div className="p-7">
                                    <div className="mb-6">
                                        <p className="font-orbitron mb-1 text-[9px] uppercase tracking-widest text-white/40">
                                            Registration Fee
                                        </p>
                                        <div
                                            className="font-bebas text-5xl"
                                            style={{ color: typeColor, textShadow: `0 0 20px ${typeColor}` }}
                                        >
                                            ₹{parseFloat(event.price).toLocaleString()}
                                        </div>
                                    </div>

                                    {!has_capacity && (
                                        <div
                                            className="mb-5 rounded-lg p-3 text-center text-sm font-bold"
                                            style={{
                                                background: 'rgba(255,0,0,0.08)',
                                                border: '1px solid rgba(255,0,0,0.3)',
                                                color: '#ff6b6b',
                                            }}
                                        >
                                            Registration closed — capacity reached.
                                        </div>
                                    )}

                                    <div className="space-y-3 border-t pt-6" style={{ borderColor: typeColor + '22' }}>
                                        {/* Individual Registration */}
                                        {(event.type === 'individual' || event.type === 'both') && (
                                            has_capacity ? (
                                                <Link
                                                    href={`/registration/individual/${event.slug}`}
                                                    className="btn-neon block w-full text-center"
                                                    style={{ borderColor: '#FF0080', color: '#FF0080' }}
                                                >
                                                    INDIVIDUAL REGISTRATION
                                                </Link>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="w-full rounded cursor-not-allowed py-3 font-bold uppercase tracking-widest text-white/30"
                                                    style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: 12 }}
                                                >
                                                    REGISTRATION FULL
                                                </button>
                                            )
                                        )}

                                        {/* Group Registration */}
                                        {(event.type === 'group' || event.type === 'both') && has_capacity && (
                                            <Link
                                                href={`/registration/group/${event.slug}`}
                                                className="btn-neon btn-neon-purple block w-full text-center"
                                            >
                                                GROUP REGISTRATION
                                            </Link>
                                        )}
                                    </div>

                                    {has_capacity && (
                                        <p className="font-orbitron mt-5 text-center text-[8px] uppercase tracking-widest text-white/25">
                                            Limited spots available
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Info card */}
                            <div
                                className="neon-card rounded-2xl p-6"
                                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                            >
                                <h4 className="font-bebas mb-4 text-lg tracking-widest text-white">
                                    EVENT DETAILS
                                </h4>
                                <div className="space-y-3 text-sm">
                                    {[
                                        { label: 'Date', value: `${formatDate(event.event_start_date)}${event.event_end_date ? ` & ${formatDate(event.event_end_date)}` : ''}` },
                                        { label: 'Time', value: `${event.start_time} – ${event.end_time}` },
                                        { label: 'Venue', value: event.venue },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between gap-4">
                                            <span className="font-orbitron text-[9px] uppercase tracking-wider text-white/35">{label}</span>
                                            <span className="text-right text-white/70">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Back link */}
                            <div className="mt-5 text-center">
                                <Link
                                    href="/events"
                                    className="font-orbitron text-[9px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60"
                                >
                                    ← BACK TO EVENTS
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
