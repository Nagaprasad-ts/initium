import { Link, Head } from '@inertiajs/react';
import { useRef, useEffect, useState } from 'react';
import Layout from '@/components/Layout';

/* ─── Types ─────────────────────────────────────────────────── */
interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    category_id: number;
    category: Category;
    type: 'individual' | 'group' | 'duo';
    venue: string;
    event_start_date: string;
    start_time: string;
    end_time: string;
    price: string;
    first_price: string;
    max_participants: number;
    min: number | null;
    max: number | null;
    banner_image: string | null;
}

interface Category {
    id: number;
    name: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const formatDate = (date: string) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

// Display label for category names like "LITCLUB" → "Lit Club"
const formatCategoryName = (name: string) => {
    const map: Record<string, string> = {
        LITCLUB: 'Lit Club',
        ARTCLUB: 'Art Club',
        MUSICCLUB: 'Music Club',
        MEDIACLUB: 'Media Club',
        FASHIONCLUB: 'Fashion Club',
        DANCECLUB: 'Dance Club',
    };
    return map[name] ?? name;
};

// Stable color per category
const CATEGORY_COLORS: Record<string, string> = {
    LITCLUB:     '#FF0080',
    ARTCLUB:     '#FFD700',
    MUSICCLUB:   '#00F5FF',
    MEDIACLUB:   '#7C3AED',
    FASHIONCLUB: '#FF6B35',
    DANCECLUB:   '#00FF88',
};
const DEFAULT_COLOR = '#FF0080';

const TYPE_LABELS: Record<string, string> = {
    individual: 'Solo',
    duo:        'Duo',
    group:      'Group',
};

/* ─── Reveal hook ────────────────────────────────────────────── */
function useReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add('ev-visible'), delay); },
            { threshold: 0.06 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return ref;
}

/* ─── EventCard ──────────────────────────────────────────────── */
function EventCard({ event, index }: { event: Event; index: number }) {
    const color = CATEGORY_COLORS[event.category?.name] ?? DEFAULT_COLOR;
    const ref = useReveal(index * 60);

    const placeholderBg = `linear-gradient(135deg, ${color}18 0%, rgba(0,0,0,0.6) 100%)`;

    return (
        <div
            ref={ref}
            className="ev-card ev-reveal"
            style={{ '--card-color': color } as React.CSSProperties}
        >
            {/* Image area */}
            <div className="ev-card-img">
                {event.banner_image ? (
                    <img
                        src={event.banner_image}
                        alt={event.name}
                        className="ev-card-img-inner"
                    />
                ) : (
                    <div className="ev-card-img-placeholder" style={{ background: placeholderBg }}>
                        <span className="ev-placeholder-icon">🎰</span>
                    </div>
                )}
                {/* gradient overlay */}
                <div className="ev-card-img-overlay" style={{ background: `linear-gradient(to top, #0b0b0f 20%, transparent 70%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)` }} />

                {/* Type pill */}
                <div className="ev-pill ev-pill-top">
                    {TYPE_LABELS[event.type] ?? event.type}
                </div>

                {/* Prize pill */}
                <div className="ev-pill ev-pill-prize">
                    🏆 ₹{parseFloat(event.first_price).toLocaleString()}
                </div>
            </div>

            {/* Body */}
            <div className="ev-card-body">
                {/* Category tag */}
                <p className="ev-cat-tag" style={{ color }}>
                    {formatCategoryName(event.category?.name)}
                </p>

                {/* Name */}
                <h3 className="ev-card-title">{event.name}</h3>

                {/* Meta row */}
                <div className="ev-meta">
                    <span className="ev-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        {formatDate(event.event_start_date)}
                    </span>
                    <span className="ev-meta-dot" />
                    <span className="ev-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {formatTime(event.start_time)}
                    </span>
                </div>

                <div className="ev-meta" style={{ marginTop: 6 }}>
                    <span className="ev-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue}</span>
                    </span>
                    {event.max_participants && (
                        <>
                            <span className="ev-meta-dot" />
                            <span className="ev-meta-item">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                                Max {event.max_participants}
                            </span>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="ev-card-footer">
                    <div className="ev-price">
                        <span className="ev-price-label">Entry</span>
                        <span className="ev-price-value" style={{ color }}>
                            ₹{parseFloat(event.price).toLocaleString()}
                        </span>
                    </div>
                    <Link href={`/events/${event.slug}`} className="ev-btn" style={{ '--btn-color': color } as React.CSSProperties}>
                        Register →
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Index({ events, categories }: { events: Event[]; categories: Category[] }) {
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

    const filtered = activeCategory === 'all'
        ? events
        : events.filter(e => e.category_id === activeCategory);

    return (
        <Layout>
            <Head title="Events | Initium 2026" />

            <style>{`
                /* ── Reveal ── */
                .ev-reveal { opacity: 0; transform: translateY(22px); transition: opacity .55s ease, transform .55s ease; }
                .ev-visible { opacity: 1 !important; transform: translateY(0) !important; }

                /* ── Card ── */
                .ev-card {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
                    position: relative;
                }
                .ev-card:hover {
                    transform: translateY(-5px);
                    border-color: color-mix(in srgb, var(--card-color) 40%, transparent);
                    box-shadow: 0 12px 40px color-mix(in srgb, var(--card-color) 20%, transparent);
                }
                .ev-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: var(--card-color);
                    opacity: 0;
                    transition: opacity .25s;
                }
                .ev-card:hover::before { opacity: 1; }

                /* ── Card image ── */
                .ev-card-img { position: relative; height: 200px; overflow: hidden; background: #111; flex-shrink: 0; }
                .ev-card-img-inner { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; filter: brightness(.8) saturate(1.1); }
                .ev-card:hover .ev-card-img-inner { transform: scale(1.06); }
                .ev-card-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
                .ev-placeholder-icon { font-size: 48px; opacity: .35; }
                .ev-card-img-overlay { position: absolute; inset: 0; pointer-events: none; }

                /* ── Pills ── */
                .ev-pill {
                    position: absolute;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 9px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 5px 10px;
                    border-radius: 6px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                .ev-pill-top {
                    top: 12px; left: 12px;
                    background: rgba(0,0,0,0.65);
                    border: 1px solid color-mix(in srgb, var(--card-color) 50%, transparent);
                    color: var(--card-color);
                }
                .ev-pill-prize {
                    bottom: 12px; right: 12px;
                    background: rgba(0,0,0,0.75);
                    border: 1px solid rgba(255,215,0,0.35);
                    color: #FFD700;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 12px;
                    letter-spacing: 1px;
                }

                /* ── Card body ── */
                .ev-card-body { padding: 20px 22px 22px; flex: 1; display: flex; flex-direction: column; gap: 0; }
                .ev-cat-tag { font-family: 'Orbitron', sans-serif; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px; opacity: .85; }
                .ev-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; color: #fff; line-height: 1.1; margin-bottom: 14px; }

                /* ── Meta ── */
                .ev-meta { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.4); font-size: 12px; }
                .ev-meta-item { display: flex; align-items: center; gap: 5px; }
                .ev-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.2); flex-shrink: 0; }

                /* ── Footer ── */
                .ev-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.06); }
                .ev-price { display: flex; flex-direction: column; gap: 1px; }
                .ev-price-label { font-family: 'Orbitron', sans-serif; font-size: 8px; letter-spacing: 2px; color: rgba(255,255,255,.3); text-transform: uppercase; }
                .ev-price-value { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; line-height: 1; }

                /* ── Register button ── */
                .ev-btn {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 10px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 10px 18px;
                    border-radius: 8px;
                    border: 1px solid color-mix(in srgb, var(--btn-color) 60%, transparent);
                    color: var(--btn-color);
                    background: color-mix(in srgb, var(--btn-color) 10%, transparent);
                    text-decoration: none;
                    transition: background .2s, box-shadow .2s, transform .15s;
                    white-space: nowrap;
                }
                .ev-btn:hover {
                    background: color-mix(in srgb, var(--btn-color) 20%, transparent);
                    box-shadow: 0 0 18px color-mix(in srgb, var(--btn-color) 35%, transparent);
                    transform: translateY(-1px);
                }

                /* ── Filter tabs ── */
                .ev-tabs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .ev-tab {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 10px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 10px 20px;
                    border-radius: 50px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.03);
                    color: rgba(255,255,255,0.45);
                    cursor: pointer;
                    transition: all .2s ease;
                    white-space: nowrap;
                }
                .ev-tab:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.06); }
                .ev-tab-active {
                    border-color: var(--tab-color, #FF0080) !important;
                    color: var(--tab-color, #FF0080) !important;
                    background: color-mix(in srgb, var(--tab-color, #FF0080) 12%, transparent) !important;
                    box-shadow: 0 0 16px color-mix(in srgb, var(--tab-color, #FF0080) 30%, transparent);
                }

                /* ── Grid ── */
                .ev-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
                    gap: 24px;
                }

                /* ── Count badge ── */
                .ev-count {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    font-size: 9px;
                    background: rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.4);
                    margin-left: 6px;
                    font-family: 'Orbitron', sans-serif;
                }
                .ev-tab-active .ev-count {
                    background: color-mix(in srgb, var(--tab-color, #FF0080) 25%, transparent);
                    color: var(--tab-color, #FF0080);
                }

                /* ── Section label ── */
                .ev-section-label {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }
                .ev-section-label-line { flex: 1; height: 1px; }
                .ev-section-label-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 13px;
                    letter-spacing: 5px;
                    opacity: .5;
                }
            `}</style>

            {/* ══════════ HERO ══════════ */}
            <section style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,0,128,0.12) 0%, transparent 70%)',
                paddingTop: 110,
                paddingBottom: 56,
                textAlign: 'center',
            }}>
                <p style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 10,
                    letterSpacing: 7,
                    color: '#FF0080',
                    opacity: .7,
                    marginBottom: 10,
                    textTransform: 'uppercase',
                }}>
                    PLACE YOUR BET
                </p>
                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(56px, 10vw, 110px)',
                    lineHeight: 1,
                    letterSpacing: 4,
                    color: '#fff',
                    marginBottom: 10,
                }}>
                    ALL{' '}
                    <span style={{ color: '#FF0080', textShadow: '0 0 40px rgba(255,0,128,.6)' }}>EVENTS</span>
                </h1>

                {/* Decorative divider */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '16px auto 20px', maxWidth: 200 }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, #FF0080, transparent)' }} />
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF0080', boxShadow: '0 0 14px #FF0080' }} />
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #FF0080, transparent)' }} />
                </div>

                <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, letterSpacing: 2 }}>
                    {events.length} events across {categories.length} clubs
                </p>
            </section>

            {/* ══════════ STICKY FILTER TABS ══════════ */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(11,11,15,0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '14px 20px',
            }}>
                <div className="ev-tabs" style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* ALL tab */}
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`ev-tab ${activeCategory === 'all' ? 'ev-tab-active' : ''}`}
                        style={{ '--tab-color': '#FF0080' } as React.CSSProperties}
                    >
                        All
                        <span className="ev-count">{events.length}</span>
                    </button>

                    {/* Category tabs */}
                    {categories.map(cat => {
                        const color = CATEGORY_COLORS[cat.name] ?? DEFAULT_COLOR;
                        const count = events.filter(e => e.category_id === cat.id).length;
                        if (count === 0) return null;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`ev-tab ${activeCategory === cat.id ? 'ev-tab-active' : ''}`}
                                style={{ '--tab-color': color } as React.CSSProperties}
                            >
                                {formatCategoryName(cat.name)}
                                <span className="ev-count">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ══════════ EVENTS GRID ══════════ */}
            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 20px 100px' }}>

                {/* Section context label */}
                <div className="ev-section-label" style={{ marginBottom: 36 }}>
                    <div className="ev-section-label-line" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <span className="ev-section-label-text">
                        {activeCategory === 'all'
                            ? `Showing all ${filtered.length} events`
                            : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} in ${formatCategoryName(categories.find(c => c.id === activeCategory)?.name ?? '')}`
                        }
                    </span>
                    <div className="ev-section-label-line" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>

                {filtered.length > 0 ? (
                    <div className="ev-grid">
                        {filtered.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        border: '1px dashed rgba(255,255,255,0.08)',
                        borderRadius: 20,
                    }}>
                        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 4, color: 'rgba(255,255,255,.2)' }}>
                            NO EVENTS FOUND
                        </p>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.15)', marginTop: 8 }}>
                            Check back soon — more events coming!
                        </p>
                    </div>
                )}
            </main>
        </Layout>
    );
}