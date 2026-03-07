import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';

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

// Static featured events for home page display
const FEATURED_EVENTS = [
    {
        club: 'LIT CLUB', name: 'Viva La Voice', subtitle: 'Declamation',
        desc: 'A solo declamation event where you recreate powerful speeches by famous historic...',
        fee: '₹200', color: '#FF0080', icon: '🎤',
    },
    {
        club: 'LIT CLUB', name: 'IPL Auction', subtitle: 'Strategy & Bidding',
        desc: 'Experience the excitement of an IPL Mega Auction where teams strategize, bid, an...',
        fee: '₹1,000', color: '#00F5FF', icon: '🏏',
    },
    {
        club: 'LIT CLUB', name: 'Skyfall', subtitle: 'Aircrash',
        desc: "You're on a plane going down with one parachute — convince everyone in the room ...",
        fee: '₹200', color: '#7C3AED', icon: '✈️',
    },
    {
        club: 'LIT CLUB', name: 'The Late Night Special', subtitle: 'Open Mic',
        desc: 'Walk up, grab the mic, and do whatever it takes to make the room feel something ...',
        fee: '₹200', color: '#FFD700', icon: '🎭',
    },
    {
        club: 'MUSIC CLUB', name: 'Group Groove', subtitle: 'Group Singing',
        desc: 'Powerful group vocals dazzle like the Strip. From soulful ballads to chartbusters...',
        fee: '₹1,000', color: '#00F5FF', icon: '🎵',
    },
    {
        club: 'DANCE CLUB', name: 'All-in Showdown', subtitle: 'Solo Dance Battle',
        desc: 'Two dancers face off in a high-stakes 1v1 battle of skill and style. Every move...',
        fee: '₹200', color: '#FF0080', icon: '🕺',
    },
];

function FeaturedEventCard({ ev }: { ev: typeof FEATURED_EVENTS[0] }) {
    return (
        <div
            className="neon-card cursor-pointer overflow-hidden rounded-xl p-6"
            style={{ borderColor: ev.color + '33', position: 'relative' }}
        >
            {/* Corner glow */}
            <div
                className="absolute right-0 top-0"
                style={{
                    width: 60, height: 60,
                    background: `radial-gradient(circle at top right, ${ev.color}22, transparent)`,
                    borderRadius: '0 0 0 60px',
                }}
            />
            <div className="mb-3 flex items-start justify-between">
                <span className="text-3xl">{ev.icon}</span>
                <span
                    className="font-orbitron rounded px-2 py-1 text-[8px] tracking-widest"
                    style={{ color: ev.color, border: `1px solid ${ev.color}44` }}
                >
                    {ev.club}
                </span>
            </div>
            <h3 className="font-bebas mb-1 text-[22px] tracking-widest text-white">{ev.name}</h3>
            <p className="font-orbitron mb-3 text-[11px] uppercase tracking-widest" style={{ color: ev.color }}>
                {ev.subtitle}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/50">{ev.desc}</p>
            <div
                className="flex items-center justify-between border-t pt-4"
                style={{ borderColor: ev.color + '22' }}
            >
                <span className="font-orbitron text-[9px] tracking-widest text-white/40">REGISTRATION FEE</span>
                <span className="font-bebas text-xl" style={{ color: ev.color, textShadow: `0 0 10px ${ev.color}` }}>
                    {ev.fee}
                </span>
            </div>
        </div>
    );
}

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const statsRef    = useReveal();
    const featuredRef = useReveal();
    const ctaRef      = useReveal();

    useEffect(() => {
        const targetDate = new Date('2026-05-20T09:00:00').getTime();
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

    return (
        <Layout>
            <Head title="Home | Initium 2026" />

            {/* ── Hero ─────────────────────────────────────── */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden">
                {/* <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ zIndex: 0, opacity: 0.55 }}
                    src="/videos/bg-video.mp4"
                /> */}
                <div
                    className="absolute inset-0"
                    style={{
                        zIndex: 1,
                        background: 'linear-gradient(to bottom, rgba(11,11,15,0.3) 0%, rgba(11,11,15,0.15) 50%, rgba(11,11,15,0.7) 100%)',
                    }}
                />
                <div className="grid-bg absolute inset-0 opacity-30" style={{ zIndex: 2 }} />

                <div className="relative px-5 text-center" style={{ zIndex: 3 }}>
                    <p
                        className="font-orbitron animate-glow-cyan mb-4"
                        style={{ fontSize: 'clamp(9px,2vw,12px)', letterSpacing: 8, color: '#00F5FF', textTransform: 'uppercase' }}
                    >
                        New Horizon College of Engineering
                    </p>
                    <NeonTitle />
                    <p className="font-orbitron mt-2 text-white/50" style={{ fontSize: 'clamp(11px,2vw,16px)', letterSpacing: 6 }}>
                        2 0 2 6
                    </p>
                    <p
                        className="font-rajdhani mx-auto mb-3 mt-2 max-w-[500px] font-light text-white/60"
                        style={{ fontSize: 'clamp(14px,3vw,20px)', letterSpacing: 3 }}
                    >
                        INTERCOLLEGIATE LITERARY & CULTURAL FEST
                    </p>
                    <p
                        className="font-bebas mb-9 inline-block text-lg tracking-widest"
                        style={{ color: '#FFD700', padding: '6px 20px', border: '1px solid rgba(255,215,0,0.3)', textShadow: '0 0 10px #FFD700' }}
                    >
                        🎰 LAS VEGAS EDITION 🎰
                    </p>
                    <br />
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/events" className="btn-neon">EXPLORE EVENTS</Link>
                        <Link href="/brochure" className="btn-neon btn-neon-cyan">VIEW BROCHURE</Link>
                    </div>
                </div>

                <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1" style={{ zIndex: 3 }}>
                    <div
                        className="animate-float h-10 w-px"
                        style={{ background: 'linear-gradient(to bottom, transparent, #00F5FF)', boxShadow: '0 0 8px #00F5FF' }}
                    />
                    <span className="font-orbitron text-[8px] tracking-[3px] text-cyan-400/50">SCROLL</span>
                </div>
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
            <section
                className="border-b py-14"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
            >
                <p className="font-orbitron mb-8 text-center text-[11px] tracking-[6px]" style={{ color: '#7C3AED' }}>
                    COUNTING DOWN TO MAY 20, 2026
                </p>
                <div className="mx-auto flex max-w-2xl justify-center gap-4 px-5 sm:gap-8">
                    {[
                        { label: 'DAYS',  value: timeLeft.days    },
                        { label: 'HOURS', value: timeLeft.hours   },
                        { label: 'MINS',  value: timeLeft.minutes },
                        { label: 'SECS',  value: timeLeft.seconds },
                    ].map(({ label, value }, idx) => {
                        const colors = ['#FF0080','#00F5FF','#FFD700','#7C3AED'];
                        const c = colors[idx];
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

            {/* ── Stats ────────────────────────────────────── */}
            <section className="mx-auto max-w-5xl px-5 py-20">
                <div ref={statsRef} className="section-reveal grid grid-cols-2 gap-6 md:grid-cols-4">
                    {STATS.map((s) => (
                        <div key={s.l} className="neon-card rounded-xl p-8 text-center" style={{ borderColor: s.color + '33' }}>
                            <div className="font-bebas text-[52px] leading-none" style={{ color: s.color, textShadow: `0 0 20px ${s.color}` }}>
                                {s.n}
                            </div>
                            <div className="font-orbitron mt-1 text-[11px] uppercase tracking-widest text-white/50">{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Events ───────────────────────────── */}
            <section className="mx-auto max-w-6xl px-5 pb-20">
                {/* Section title */}
                <div className="mb-12 text-center">
                    <p className="font-orbitron mb-2 text-[11px] uppercase tracking-[6px]" style={{ color: '#FF0080', opacity: 0.7 }}>
                        WHAT'S ON
                    </p>
                    <h2 className="font-bebas leading-none tracking-widest text-white" style={{ fontSize: 'clamp(42px,8vw,80px)' }}>
                        FEATURED <span style={{ color: '#FF0080', textShadow: '0 0 20px #FF0080' }}>EVENTS</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[500px] text-base text-white/50">
                        Compete, perform, and shine across disciplines
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to left, #FF0080, transparent)' }} />
                        <div className="h-2 w-2 rounded-full" style={{ background: '#FF0080', boxShadow: '0 0 12px #FF0080' }} />
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to right, #FF0080, transparent)' }} />
                    </div>
                </div>

                {/* Event cards grid */}
                <div
                    ref={featuredRef}
                    className="section-reveal mb-10 grid gap-5"
                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
                >
                    {FEATURED_EVENTS.map((ev, i) => (
                        <Link key={i} href="/events">
                            <FeaturedEventCard ev={ev} />
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/events" className="btn-neon btn-neon-gold">
                        VIEW ALL 13 EVENTS →
                    </Link>
                </div>
            </section>

            {/* ── CTA — Place Your Bets ─────────────────────── */}
            <section
                className="mb-8 border-t px-5 py-20 text-center"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)',
                    borderColor: 'rgba(124,58,237,0.2)',
                }}
            >
                <div ref={ctaRef} className="section-reveal">
                    <p className="font-orbitron mb-3 text-[11px] tracking-[6px]" style={{ color: '#7C3AED' }}>
                        DON'T MISS OUT
                    </p>
                    <h2 className="font-bebas mb-4 leading-none tracking-widest text-white" style={{ fontSize: 'clamp(36px,7vw,72px)' }}>
                        PLACE YOUR{' '}
                        <span style={{ color: '#FFD700', textShadow: '0 0 20px #FFD700' }}>BETS</span>
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