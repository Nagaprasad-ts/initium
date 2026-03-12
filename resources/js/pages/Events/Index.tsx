import { Link, Head } from '@inertiajs/react';
import { useRef, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import type { Event, Category } from '@/constants';
import {
    CATEGORY_COLORS,
    DEFAULT_COLOR,
    TYPE_LABELS,
    formatDate,
    formatTime,
    formatPrice,
    formatCategoryName,
} from '@/constants';

/* ─── Reveal hook ────────────────────────────────────────────── */
function useReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add('rv-in'), delay); },
            { threshold: 0.06 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return ref;
}

/* ─── SVG icons ──────────────────────────────────────────────── */
const IconCalendar = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
);
const IconClock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
);
const IconPin = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
);
const IconUsers = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
);

/* ─── EventCard ──────────────────────────────────────────────── */
function EventCard({ event, index }: { event: Event; index: number }) {
    const color = CATEGORY_COLORS[event.category?.name] ?? DEFAULT_COLOR;
    const ref   = useReveal(index * 55);

    return (
        <div
            ref={ref}
            className="rv-in relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300"
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-5px)';
                el.style.borderColor = color + '72';
                el.style.boxShadow = `0 14px 44px ${color}2E`;
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = 'none';
            }}
        >
            {/* Top colour accent — shown on hover via JS */}
            <div className="absolute left-0 right-0 top-0 z-10 h-0.5" style={{ background: color, opacity: 0 }}
                ref={el => {
                    if (!el) return;
                    const card = el.parentElement;
                    card?.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
                    card?.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
                }}
            />

            {/* ── Image ── */}
            <div className="relative h-52 flex-shrink-0 overflow-hidden bg-black/50">
                {event.banner_image_events_page ? (
                    <img
                        src={`/storage/${event.banner_image_events_page}`}
                        alt={event.name}
                        className="h-full w-full object-cover brightness-[0.8] saturate-[1.15] transition-transform duration-700 hover:scale-[1.07]"
                    />
                ) : (
                    <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${color}1A 0%, rgba(0,0,0,0.7) 100%)` }}
                    >
                        <span className="text-5xl opacity-30">🎰</span>
                    </div>
                )}
                {/* Gradient overlay */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0b0b0f 15%, transparent 65%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
                />
                {/* Type badge */}
                <span
                    className="font-orbitron absolute left-3 top-3 rounded-md px-3 py-1.5 text-[10px] uppercase tracking-widest backdrop-blur-md"
                    style={{ background: 'rgba(0,0,0,0.7)', border: `1px solid ${color}8C`, color }}
                >
                    {TYPE_LABELS[event.type] ?? event.type}
                </span>
                {/* Prize badge */}
                <span
                    className="font-bebas absolute bottom-3 right-3 rounded-md px-3 py-1 text-sm tracking-wide backdrop-blur-md"
                    style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}
                >
                    🏆 {formatPrice(event.first_price)}
                </span>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                {/* Category */}
                <p className="font-orbitron mb-1.5 text-[10px] uppercase tracking-[3px]" style={{ color, opacity: 0.9 }}>
                    {formatCategoryName(event.category?.name)}
                </p>

                {/* Title */}
                <h3 className="font-bebas mb-4 text-[28px] leading-tight tracking-wide text-white">
                    {event.name}
                </h3>

                {/* Meta row 1 */}
                <div className="font-rajdhani flex flex-wrap items-center gap-2 text-sm font-medium text-white/70">
                    <span className="flex items-center gap-1.5"><IconCalendar />{formatDate(event.event_start_date)}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><IconClock />{formatTime(event.start_time)}</span>
                </div>

                {/* Meta row 2 */}
                <div className="font-rajdhani mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-white/70">
                    <span className="flex max-w-[200px] items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                        <IconPin />{event.venue}
                    </span>
                    {event.max_participants && (
                        <>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="flex items-center gap-1.5"><IconUsers />Max {event.max_participants}</span>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-5">
                    <div>
                        <p className="font-orbitron mb-0.5 text-[9px] uppercase tracking-[2px] text-white/40">
                            Entry Fee
                        </p>
                        <p className="font-bebas text-[26px] leading-none tracking-wide" style={{ color }}>
                            {formatPrice(event.price)}
                        </p>
                    </div>
                    <Link
                        href={`/events/${event.slug}`}
                        className="font-orbitron rounded-lg px-5 py-3 text-[11px] uppercase tracking-widest transition-all duration-200 hover:-translate-y-px"
                        style={{ border: `1px solid ${color}A5`, color, background: `${color}1A` }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.background = `${color}38`;
                            el.style.boxShadow = `0 0 20px ${color}60`;
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.background = `${color}1A`;
                            el.style.boxShadow = 'none';
                        }}
                    >
                        Register →
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── FilterTab ──────────────────────────────────────────────── */
function FilterTab({
    label,
    count,
    color,
    active,
    onClick,
}: {
    label: string;
    count: number;
    color: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="font-orbitron inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] uppercase tracking-widest transition-all duration-200"
            style={{
                border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.12)',
                color: active ? color : 'rgba(255,255,255,0.55)',
                background: active ? `${color}24` : 'rgba(255,255,255,0.04)',
                boxShadow: active ? `0 0 18px ${color}50` : 'none',
            }}
            onMouseEnter={e => {
                if (active) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = 'rgba(255,255,255,0.28)';
                el.style.color = 'rgba(255,255,255,0.85)';
            }}
            onMouseLeave={e => {
                if (active) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = 'rgba(255,255,255,0.12)';
                el.style.color = 'rgba(255,255,255,0.55)';
            }}
        >
            {label}
            <span
                className="font-orbitron inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
                style={{
                    background: active ? `${color}40` : 'rgba(255,255,255,0.09)',
                    color: active ? color : 'rgba(255,255,255,0.5)',
                }}
            >
                {count}
            </span>
        </button>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Index({ events, categories }: { events: Event[]; categories: Category[] }) {
    const [active, setActive] = useState<number | 'all'>('all');

    const filtered = active === 'all' ? events : events.filter(e => e.category_id === active);
    const activeCatName = active !== 'all'
        ? formatCategoryName(categories.find(c => c.id === active)?.name ?? '')
        : '';

    return (
        <Layout>
            <Head title="Events | Initium 2026" />

            {/* ═══ HERO ═══ */}
            <section
                className="pb-14 pt-28 text-center"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,0,128,0.13) 0%, transparent 70%)' }}
            >
                <p
                    className="font-orbitron mb-2.5 uppercase"
                    style={{ fontSize: 11, letterSpacing: 7, color: '#FF0080', opacity: 0.75 }}
                >
                    PLACE YOUR BET
                </p>
                <h1
                    className="font-bebas mb-2 leading-none tracking-widest text-white"
                    style={{ fontSize: 'clamp(60px, 10vw, 110px)' }}
                >
                    ALL{' '}
                    <span style={{ color: '#FF0080', textShadow: '0 0 40px rgba(255,0,128,.6)' }}>
                        EVENTS
                    </span>
                </h1>

                {/* Divider */}
                <div className="mx-auto my-4 flex max-w-[200px] items-center gap-3">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #FF0080, transparent)' }} />
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#FF0080', boxShadow: '0 0 14px #FF0080' }} />
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #FF0080, transparent)' }} />
                </div>

                <p className="font-rajdhani font-medium text-white/50" style={{ fontSize: 15, letterSpacing: 2 }}>
                    {events.length} events across {categories.length} clubs
                </p>
            </section>

            {/* ═══ STICKY FILTER BAR ═══ */}
            <div
                className="sticky top-0 z-50 border-b border-white/[0.07] px-5 py-3.5 backdrop-blur-lg"
                style={{ background: 'rgba(11,11,15,0.88)' }}
            >
                <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-2">
                    <FilterTab
                        label="All"
                        count={events.length}
                        color="#FF0080"
                        active={active === 'all'}
                        onClick={() => setActive('all')}
                    />
                    {categories.map(cat => {
                        const count = events.filter(e => e.category_id === cat.id).length;
                        if (!count) return null;
                        return (
                            <FilterTab
                                key={cat.id}
                                label={formatCategoryName(cat.name)}
                                count={count}
                                color={CATEGORY_COLORS[cat.name] ?? DEFAULT_COLOR}
                                active={active === cat.id}
                                onClick={() => setActive(cat.id)}
                            />
                        );
                    })}
                </div>
            </div>

            {/* ═══ GRID ═══ */}
            <main className="mx-auto max-w-[1200px] px-5 pb-24 pt-12">

                {/* Context label */}
                <div className="mb-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <p
                        className="font-orbitron whitespace-nowrap uppercase text-white/40"
                        style={{ fontSize: 11, letterSpacing: 3 }}
                    >
                        {active === 'all'
                            ? `All ${filtered.length} events`
                            : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} · ${activeCatName}`}
                    </p>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                </div>

                {filtered.length > 0 ? (
                    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                        {filtered.map((ev, i) => (
                            <EventCard key={ev.id} event={ev} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-white/[0.08] px-5 py-20 text-center">
                        <p className="font-bebas text-[36px] tracking-widest text-white/20">
                            NO EVENTS FOUND
                        </p>
                        <p className="mt-2 font-rajdhani text-[15px] text-white/[0.18]">
                            Check back soon — more events coming!
                        </p>
                    </div>
                )}
            </main>
        </Layout>
    );
}