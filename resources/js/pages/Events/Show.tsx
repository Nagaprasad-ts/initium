import { Link, Head, usePage } from '@inertiajs/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import { formatTime } from '@/constants';

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: 'individual' | 'group' | 'both' | 'duo';
    venue: string;
    event_start_date: string;
    event_end_date?: string | undefined;
    start_time: string;
    end_time: string;
    price: string;
    banner_image_desktop: string;
    banner_image_mobile: string;
}

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    event: Event;
    category: Category;
    has_capacity: boolean;
    registration_open: boolean;
}

const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    const day   = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year  = d.getFullYear();
    return `${day}-${month}-${year}`;
};

export default function Show({ event, category, has_capacity, registration_open }: ShowProps) {
    const { flash } = usePage<{ flash: { error?: string } }>().props;
    const typeColor = event.type === 'group' ? '#00F5FF' : event.type === 'both' ? '#FFD700' : '#FF0080';

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
           <div className="relative overflow-hidden" style={{ minHeight: 320, height: 500 }}>
                {/* Desktop */}
                <img
                    src={`/storage/${event.banner_image_desktop}`}
                    alt={event.name}
                    className="absolute inset-0 h-full w-full hidden md:block object-top"
                    // style={{ opacity: 0.5, filter: 'saturate(1.3) brightness(0.7)' }}
                />
                {/* Mobile */}
                <img
                    src={`/storage/${event.banner_image_mobile}`}
                    alt={event.name}
                    className="absolute inset-0 h-full w-full object-cover block md:hidden object-top"
                    // style={{ opacity: 0.5, filter: 'saturate(1.3) brightness(0.7)' }}
                />
                {/* gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0F 0%, rgba(11,11,15,0.5) 50%, transparent 100%)' }} />

                {/* Badges */}
                <div className="absolute left-5 top-6 flex gap-3">
                    {category.name === "STANDUP COMEDY" ? "" : <span
                        className="font-orbitron rounded px-3 py-1.5 text-[9px] uppercase tracking-widest"
                        style={{
                            background: typeColor,
                            color: '#000',
                            boxShadow: `0 0 15px ${typeColor}`,
                        }}
                    >
                         {event.type === 'both' ? 'Individual & Group' : event.type} Registration
                    </span>}
                    {!registration_open && (
                        <span
                            className="font-orbitron rounded px-3 py-1.5 text-[9px] uppercase tracking-widest"
                            style={{ background: 'rgba(255,0,0,0.8)', color: '#fff' }}
                        >
                            REGISTRATIONS CLOSED
                        </span>
                    )}
                    {!has_capacity && registration_open && (
                        <span
                            className="font-orbitron rounded px-3 py-1.5 text-[9px] uppercase tracking-widest"
                            style={{ background: 'rgba(255,0,0,0.8)', color: '#fff' }}
                        >
                            EVENT FULL
                        </span>
                    )}
                </div>

                {/* Event title at bottom */}
                <div className="absolute bottom-0 left-0 w-full px-5 pb-8 md:px-10">
                    <div className="mx-auto max-w-5xl">
                        <span className='text-xl tracking-[5px] font-orbitron' style={{ color: typeColor }} >{category.name}</span>
                        <h1
                            className="font-bebas mb-4 text-[clamp(36px,8vw,80px)] leading-none tracking-widest text-white"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                        >
                            {event.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-white/80">
                            <div className="flex items-center gap-2">
                                <Clock size={20} style={{ color: typeColor }} />
                                <span>{formatTime(event.start_time)} – {formatTime(event.end_time)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={20} style={{ color: typeColor }} />
                                <span>{event.venue}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={20} style={{ color: typeColor }} />
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
                                        <p className="font-orbitron mb-1 text-[9px] uppercase tracking-widest text-white/80">
                                            Registration Fee
                                        </p>
                                        <div
                                            className="font-bebas text-5xl"
                                            style={{ color: typeColor, textShadow: `0 0 20px ${typeColor}` }}
                                        >
                                            ₹{parseFloat(event.price).toLocaleString()}
                                        </div>
                                        <p className="font-orbitron mt-3 text-[9px] uppercase tracking-widest text-white/80">{category.name === 'STANDUP COMEDY' && event.type === 'group' && 'Per Person'}</p>
                                    </div>

                                    <div className="space-y-3 border-t pt-6" style={{ borderColor: typeColor + '22' }}>
                                        {!registration_open ? (
                                            <div
                                                className="rounded-lg p-3 text-center text-sm font-bold"
                                                style={{
                                                    background: 'rgba(255,0,0,0.08)',
                                                    border: '1px solid rgba(255,0,0,0.3)',
                                                    color: '#ff6b6b',
                                                }}
                                            >
                                                Registrations are closed for this event.
                                            </div>
                                        ) : !has_capacity ? (
                                            <div
                                                className="rounded-lg p-3 text-center text-sm font-bold"
                                                style={{
                                                    background: 'rgba(255,0,0,0.08)',
                                                    border: '1px solid rgba(255,0,0,0.3)',
                                                    color: '#ff6b6b',
                                                }}
                                            >
                                                Registration closed — capacity reached.
                                            </div>
                                        ) : (
                                            <>
                                                {(event.type === 'individual' || event.type === 'both') && (
                                                    <Link
                                                        href={`/registration/individual/${event.slug}`}
                                                        className="btn-neon block w-full text-center"
                                                        style={{ borderColor: '#FF0080', color: typeColor }}
                                                    >
                                                        INDIVIDUAL REGISTRATION
                                                    </Link>
                                                )}
                                                {(event.type === 'group' || event.type === 'duo' || event.type === 'both') && (
                                                    <Link
                                                        href={`/registration/group/${event.slug}`}
                                                        className="btn-neon block w-full text-center"
                                                        style={{ borderColor: '#00F5FF', color: typeColor }}
                                                    >
                                                        {category.name === 'STANDUP COMEDY' && event.type === 'group'
                                                        ? 'REGISTRATION'
                                                        : (event.type === 'duo' ? 'DUO' : 'GROUP') + ' REGISTRATION'}
                                                    </Link>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {registration_open && has_capacity && (
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
                                        { label: 'Time', value: `${formatTime(event.start_time)} – ${formatTime(event.end_time)}` },
                                        { label: 'Venue', value: event.venue },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between gap-4">
                                            <span className="font-orbitron text-[10px] uppercase tracking-wider text-white/80">{label}</span>
                                            <span className="text-right text-xs text-white/80">{value}</span>
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
