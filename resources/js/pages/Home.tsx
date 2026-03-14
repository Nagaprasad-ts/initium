import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';

interface Category {
    id: number;
    name: string;
}

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
    price: string;
    first_price: string;
    banner_image_events_page: string | null;
}

interface HomeProps {
    events: Event[];
    categories: Category[];
}

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
            { threshold: 0.1 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NeonTitle() {
    return (
        <div className="flex justify-center gap-[clamp(4px,1vw,14px)]">
            {'INITIUM'.split('').map((letter, i) => (
                <span
                    key={i}
                    className="letter-animate font-bebas inline-block"
                    style={{
                        fontSize: 'clamp(56px,14vw,140px)',
                        color: '#FF0080',
                        animationDelay: `${i * 0.1}s`,
                        textShadow: '0 0 20px #FF0080, 0 0 60px #FF0080, 0 0 120px rgba(255,0,128,0.5)',
                        letterSpacing: 4,
                    }}
                >
                    {letter}
                </span>
            ))}
        </div>
    );
}

const MARQUEE_ITEMS = [
    'VIVA LA VOICE','IPL AUCTION','SKYFALL','OPEN MIC','BGMI',
    'CLASH ROYALE','GROUP GROOVE','REEL DEAL','SOLO DANCE','RAMP WALK','PAPER TOWER','INSTRUMENTAL',
];

const STATS = [
    { n: '70+',     l: 'Events Hosted', color: '#FF0080' },
    { n: '11,753+', l: 'Total Footfall', color: '#00F5FF' },
    { n: '2,058+',  l: 'Participants',   color: '#FFD700' },
    { n: '2022',    l: 'Est. Year',      color: '#7C3AED' },
];

const NEON_COLORS = ['#FF0080', '#00F5FF', '#FFD700', '#7C3AED'];

function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent ?? '';
}

function truncate(text: string, max = 100) {
    const clean = stripHtml(text);
    return clean.length > max ? clean.slice(0, max) + '...' : clean;
}

function FeaturedEventCard({ event, color }: { event: Event; color: string }) {
    const typeLabel = event.type === 'duo' ? 'Duo' : event.type === 'group' ? 'Group' : 'Solo';

    return (
        <div
            className="neon-card flex h-full flex-col overflow-hidden rounded-xl p-6"
            style={{ borderColor: color + '33', position: 'relative' }}
        >
            <div
                className="pointer-events-none absolute right-0 top-0"
                style={{
                    width: 60, height: 60,
                    background: `radial-gradient(circle at top right, ${color}22, transparent)`,
                    borderRadius: '0 0 0 60px',
                }}
            />

            {/* Image — bigger, full width */}
            {event.banner_image_events_page && (
                <div className="mb-4 overflow-hidden rounded-lg" style={{ height: 120 }}>
                    <img
                        src={`/storage/${event.banner_image_events_page}`}
                        alt={event.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 object-top"
                        style={{ filter: 'brightness(0.85) saturate(1.2)' }}
                    />
                </div>
            )}

            <div className="mb-3 flex items-center justify-between">
                <span
                    className="font-orbitron rounded px-2 py-1 text-[10px] uppercase tracking-widest"
                    style={{ color, border: `1px solid ${color}44` }}
                >
                    {event.category?.name}
                </span>
            </div>

            <h3 className="font-bebas mb-2 text-[22px] tracking-widest text-white">{event.name}</h3>
            <p className="font-orbitron mb-3 text-[12px] uppercase tracking-widest" style={{ color }}>
                {typeLabel}
            </p>

            {/* Truncated description — no dangerouslySetInnerHTML */}
            <p className="font-rajdhani mb-4 flex-1 text-sm font-medium leading-relaxed text-white/80">
                {truncate(event.description, 120)}
            </p>

            <div
                className="flex items-center justify-between border-t pt-4"
                style={{ borderColor: color + '22' }}
            >
                <span className="font-orbitron text-[12px] tracking-widest text-white/80">REGISTRATION FEE</span>
                <span className="font-bebas text-xl" style={{ color, textShadow: `0 0 10px ${color}` }}>
                    ₹{parseFloat(event.price).toLocaleString()}
                </span>
            </div>
        </div>
    );
}

export default function Home({ events, categories }: HomeProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const statsRef    = useReveal();
    const featuredRef = useReveal();
    const ctaRef      = useReveal();

    useEffect(() => {
        const targetDate = new Date('2026-04-26T09:00:00').getTime();
        const interval = setInterval(() => {
            const diff = targetDate - Date.now();
            if (diff > 0) {
                setTimeLeft({
                    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            } else clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const featured = events.slice(0, 6);

    const eventColor = (event: Event) => {
        const catIdx = categories.findIndex(c => c.id === event.category_id);
        return NEON_COLORS[(catIdx >= 0 ? catIdx : event.id) % NEON_COLORS.length];
    };

    return (
        <Layout>
            <Head title="Home | Initium 2026" />

            {/* ── Hero ─────────────────────────────────────── */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden">
                <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ zIndex: 0, opacity: 0.55 }}
                    src="/videos/bg-video-two.mp4"
                />
                <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(11,11,15,0.3) 0%, rgba(11,11,15,0.15) 50%, rgba(11,11,15,0.7) 100%)' }} />
                <div className="grid-bg absolute inset-0 opacity-30" style={{ zIndex: 2 }} />

                <div className="relative px-5 text-center" style={{ zIndex: 3 }}>
                    <p className="font-orbitron animate-glow-cyan mb-4 text-sm tracking-[9px] text-[#00F5FF]">
                        New Horizon College of Engineering
                    </p>
                    {/* <NeonTitle /> */}
                    <div className='flex justify-center'>
                        <img src="/images/initium-logo.png" alt='Initium 2026 - Las Vegas' className='w-72 h-48' />
                    </div>
                    <p className="font-orbitron mt-2 text-white" style={{ fontSize: 'clamp(11px,2vw,16px)', letterSpacing: 6 }}>2 0 2 6</p>
                    <p className="font-rajdhani mx-auto mb-3 mt-2 max-w-125 font-light text-white" style={{ fontSize: 'clamp(14px,3vw,20px)', letterSpacing: 3 }}>
                        INTERCOLLEGIATE LITERARY & CULTURAL FEST
                    </p>
                    <p className="font-bebas mb-9 inline-block text-xl tracking-widest bg-amber-400/20 text-[#FFD700] border border-[rgba(255,215,0,0.3)] px-5 py-1.5 [text-shadow:0_0_10px_#FFD700]">
                        LAS VEGAS EDITION
                    </p>
                    <br />
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/events" className="btn-neon">EXPLORE EVENTS</Link>
                        <Link href="/brochure" className="btn-neon btn-neon-cyan">VIEW BROCHURE</Link>
                    </div>
                </div>

                {/* <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1" style={{ zIndex: 3 }}>
                    <div className="animate-float h-10 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #00F5FF)', boxShadow: '0 0 8px #00F5FF' }} />
                    <span className="font-orbitron text-[8px] tracking-[3px] text-cyan-400/50">SCROLL</span>
                </div> */}
            </section>

            {/* ── Marquee ──────────────────────────────────── */}
            <div className="marquee-wrap border-y py-3.5" style={{ borderColor: 'rgba(255,0,128,0.2)', background: 'rgba(255,0,128,0.05)' }}>
                <div className="marquee-track">
                    {MARQUEE_ITEMS.map((item, i) => (
                        <span key={i} className="font-bebas mr-16 text-lg tracking-widest" style={{ color: '#FF0080', textShadow: '0 0 8px #FF0080' }}>
                            ✦ {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Countdown ────────────────────────────────── */}
            <section className="border-b py-14" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)' }}>
                <p className="font-orbitron mb-8 text-center text-[12px] tracking-[4px] md:text-[11px] md:tracking-[6px]" style={{ color: '#7C3AED' }}>
                    COUNTING DOWN TO APRIL 26, 2026
                </p>
                <div className="mx-auto flex max-w-2xl justify-center gap-4 px-5 sm:gap-8">
                    {[
                        { label: 'DAYS',  value: timeLeft.days    },
                        { label: 'HOURS', value: timeLeft.hours   },
                        { label: 'MINS',  value: timeLeft.minutes },
                        { label: 'SECS',  value: timeLeft.seconds },
                    ].map(({ label, value }, idx) => {
                        const c = ['#FF0080','#00F5FF','#FFD700','#7C3AED'][idx];
                        return (
                            <div key={label} className="flex-1 text-center">
                                <div className="neon-card rounded-xl py-5" style={{ borderColor: c + '33' }}>
                                    <div className="font-bebas leading-none" style={{ fontSize: 'clamp(32px,8vw,56px)', color: c, textShadow: `0 0 15px ${c}` }}>
                                        {String(value).padStart(2, '0')}
                                    </div>
                                </div>
                                <p className="font-orbitron mt-2 text-[8px] tracking-[3px] text-white/40">{label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── About ────────────────────────────────────── */}
            <section className="border-b py-20" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="mx-auto max-w-3xl px-5 text-center">
                    <p className="font-orbitron mb-3 text-[11px] uppercase tracking-[6px]" style={{ color: '#00F5FF', opacity: 0.8 }}>
                        OUR STORY
                    </p>
                    <h2 className="font-bebas mb-6 leading-none tracking-widest text-white" style={{ fontSize: 'clamp(36px,6vw,64px)' }}>
                        WHAT IS <span style={{ color: '#00F5FF', textShadow: '0 0 24px rgba(0,245,255,0.6)' }}>INITIUM</span>
                    </h2>
                    <div className="mx-auto mb-8 flex items-center justify-center gap-3">
                        <div className="h-px max-w-20 flex-1" style={{ background: 'linear-gradient(to left, #00F5FF, transparent)' }} />
                        <div className="h-2 w-2 rounded-full" style={{ background: '#00F5FF', boxShadow: '0 0 12px #00F5FF' }} />
                        <div className="h-px max-w-20 flex-1" style={{ background: 'linear-gradient(to right, #00F5FF, transparent)' }} />
                    </div>
                    <p className="font-rajdhani text-lg font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                        Discover the enchanting story surrounding <span className="font-semibold text-white">INITIUM</span>, the intercollegiate
                        literary extravaganza hosted by the Literary Club in conjunction with Music, Media, Fashion, Dance, and Art Clubs of{' '}
                        <span className="font-semibold text-white">New Horizon College of Engineering</span>. INITIUM emerged in 2022 from a
                        unified vision among students seeking a literary celebration.
                    </p>
                </div>
            </section>


            {/* ── Stats ────────────────────────────────────── */}
            <section className="mx-auto max-w-5xl px-5 py-20">
                <div ref={statsRef} className="section-reveal grid grid-cols-2 gap-6 md:grid-cols-4">
                    {STATS.map((s) => (
                        <div key={s.l} className="neon-card rounded-xl p-8 text-center" style={{ borderColor: s.color + '33' }}>
                            <div className="font-bebas text-[38px] leading-none" style={{ color: s.color, textShadow: `0 0 20px ${s.color}` }}>{s.n}</div>
                            <div className="font-orbitron mt-1 text-[11px] uppercase tracking-widest text-white/50">{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Events ───────────────────────────── */}
            {featured.length > 0 && (
                <section className="mx-auto max-w-6xl px-5 pb-20">
                    <div className="mb-12 text-center">
                        <p className="font-orbitron mb-2 text-[11px] uppercase tracking-[6px]" style={{ color: '#FF0080', opacity: 0.7 }}>WHAT'S ON</p>
                        <h2 className="font-bebas leading-none tracking-widest text-white" style={{ fontSize: 'clamp(42px,8vw,80px)' }}>
                            FEATURED <span style={{ color: '#FF0080', textShadow: '0 0 20px #FF0080' }}>EVENTS</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-125 text-base text-white/50">Compete, perform, and shine across disciplines</p>
                        <div className="mt-5 flex items-center justify-center gap-3">
                            <div className="h-px max-w-20 flex-1" style={{ background: 'linear-gradient(to left, #FF0080, transparent)' }} />
                            <div className="h-2 w-2 rounded-full" style={{ background: '#FF0080', boxShadow: '0 0 12px #FF0080' }} />
                            <div className="h-px max-w-20 flex-1" style={{ background: 'linear-gradient(to right, #FF0080, transparent)' }} />
                        </div>
                    </div>

                    <div ref={featuredRef} className="section-reveal mb-10 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {featured.map((ev) => (
                            <Link key={ev.id} href={`/events/${ev.slug}`} className="block h-full">
                                <FeaturedEventCard event={ev} color={eventColor(ev)} />
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/events" className="btn-neon btn-neon-gold">
                            VIEW ALL {events.length} EVENTS →
                        </Link>
                    </div>
                </section>
            )}

            {/* ── CTA ──────────────────────────────────────── */}
            <section className="mb-8 border-t px-5 py-20 text-center" style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)', borderColor: 'rgba(124,58,237,0.2)' }}>
                <div ref={ctaRef} className="section-reveal">
                    <p className="font-orbitron mb-3 text-[11px] tracking-[6px]" style={{ color: '#7C3AED' }}>DON'T MISS OUT</p>
                    <h2 className="font-bebas mb-4 leading-none tracking-widest text-white" style={{ fontSize: 'clamp(36px,7vw,72px)' }}>
                        PLACE YOUR <span style={{ color: '#FFD700', textShadow: '0 0 20px #FFD700' }}>BETS</span>
                    </h2>
                    <p className="mb-8 text-lg text-white/50">Register now and stake your claim to glory</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/events" className="btn-neon">REGISTER NOW</Link>
                        <Link href="/contact" className="btn-neon btn-neon-cyan">CONTACT US</Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}