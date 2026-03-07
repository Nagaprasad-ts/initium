import { Head } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
            { threshold: 0.1 },
        );
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return ref;
}

// Static event list for brochure display (from PDF)
const BROCHURE_EVENTS = [
    { club: 'LIT CLUB',     name: 'Viva La Voice',         subtitle: 'Declamation',        prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '🎤', color: '#FF0080' },
    { club: 'LIT CLUB',     name: 'IPL Auction',           subtitle: 'Strategy & Bidding', prize: '₹7,000', fee: '₹1,000', type: 'Team (5)',     icon: '🏏', color: '#FF0080' },
    { club: 'LIT CLUB',     name: 'Skyfall',               subtitle: 'Aircrash',           prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '✈️', color: '#FF0080' },
    { club: 'LIT CLUB',     name: 'The Late Night Special', subtitle: 'Open Mic',          prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '🎭', color: '#FF0080' },
    { club: 'ART CLUB',     name: 'Stack Your Luck',       subtitle: 'Paper Tower',        prize: '₹4,000', fee: '₹400',   type: 'Duo',         icon: '🗼', color: '#00F5FF' },
    { club: 'MUSIC CLUB',   name: 'Group Groove',          subtitle: 'Group Singing',      prize: '₹10,000',fee: '₹1,000', type: 'Group (4-10)',icon: '🎵', color: '#FFD700' },
    { club: 'MUSIC CLUB',   name: 'The Silver Spotlight',  subtitle: 'Solo Instrumental',  prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '🎸', color: '#FFD700' },
    { club: 'MEDIA CLUB',   name: 'Clash of Kings',        subtitle: 'Clash Royale',       prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '⚔️', color: '#7C3AED' },
    { club: 'MEDIA CLUB',   name: 'BGMI',                  subtitle: 'Battle Royale',      prize: '₹7,000', fee: '₹1,000', type: 'Team',        icon: '🎮', color: '#7C3AED' },
    { club: 'MEDIA CLUB',   name: 'The Reel Deal',         subtitle: 'Reel Making',        prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '🎬', color: '#7C3AED' },
    { club: 'FASHION CLUB', name: 'Sin City Silhouettes',  subtitle: 'Solo Ramp Walk',     prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '👑', color: '#00F5FF' },
    { club: 'DANCE CLUB',   name: 'Two of a Kind',         subtitle: 'Duet Dance',         prize: '₹6,000', fee: '₹400',   type: 'Duo',         icon: '💃', color: '#FF0080' },
    { club: 'DANCE CLUB',   name: 'All-in Showdown',       subtitle: 'Solo Dance Battle',  prize: '₹4,000', fee: '₹200',   type: 'Solo',        icon: '🕺', color: '#FF0080' },
];

const CLUB_ORDER = ['LIT CLUB','MUSIC CLUB','MEDIA CLUB','ART CLUB','DANCE CLUB','FASHION CLUB'];

const CLUB_COLORS: Record<string, string> = {
    'LIT CLUB':     '#FF0080',
    'MUSIC CLUB':   '#FFD700',
    'MEDIA CLUB':   '#7C3AED',
    'ART CLUB':     '#00F5FF',
    'DANCE CLUB':   '#FF0080',
    'FASHION CLUB': '#00F5FF',
};

export default function Brochure() {
    const r1 = useReveal();

    const totalPrize = BROCHURE_EVENTS.reduce((sum, e) => {
        return sum + parseInt(e.prize.replace(/[₹,]/g, ''));
    }, 0);

    return (
        <Layout>
            <Head title="Brochure | Initium 2026" />

            {/* Header */}
            <div
                className="px-5 pb-16 pt-20 text-center"
                style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(255,215,0,0.1) 0%, transparent 60%)' }}
            >
                <p className="font-orbitron mb-2 text-[11px] uppercase tracking-[6px]" style={{ color: '#FFD700', opacity: 0.7 }}>OFFICIAL DOCUMENT</p>
                <h1 className="font-bebas mb-4 leading-none tracking-widest text-white" style={{ fontSize: 'clamp(42px,8vw,80px)' }}>
                    EVENT <span style={{ color: '#FFD700' }}>BROCHURE</span>
                </h1>
                <div className="mx-auto mb-5 flex items-center justify-center gap-3">
                    <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to left, #FFD700, transparent)' }} />
                    <div className="h-2 w-2 rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 12px #FFD700' }} />
                    <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to right, #FFD700, transparent)' }} />
                </div>
                <p className="text-base text-white/50">Complete guide to INITIUM 2026 — Las Vegas Edition</p>
            </div>

            <div className="mx-auto max-w-3xl px-5 pb-16">

                {/* ── Download card ────────────────────────── */}
                <div
                    ref={r1}
                    className="section-reveal neon-card mb-10 rounded-2xl p-10 text-center"
                    style={{ borderColor: 'rgba(255,215,0,0.2)', background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(0,0,0,0.3))' }}
                >
                    <div className="animate-float mb-4 text-7xl">📄</div>
                    <h2 className="font-bebas mb-2 text-4xl tracking-widest" style={{ color: '#FFD700', textShadow: '0 0 20px #FFD700' }}>
                        INITIUM 2026
                    </h2>
                    <p className="font-orbitron mb-1 text-[11px] tracking-[3px] text-white/50">LAS VEGAS EDITION — OFFICIAL BROCHURE</p>
                    <p className="mb-8 text-sm text-white/40">New Horizon College of Engineering, Bengaluru</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/brochure/download" className="btn-neon btn-neon-gold">⬇ DOWNLOAD PDF</a>
                        <a href="/brochure/view" target="_blank" rel="noreferrer" className="btn-neon btn-neon-cyan">👁 VIEW ONLINE</a>
                    </div>
                </div>

                {/* ── Prize summary ─────────────────────────── */}
                <div
                    className="mb-10 flex flex-wrap justify-around gap-4 rounded-2xl p-7 text-center"
                    style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)' }}
                >
                    {[
                        { n: `₹${totalPrize.toLocaleString()}+`, l: 'TOTAL PRIZE POOL', color: '#FFD700' },
                        { n: String(BROCHURE_EVENTS.length),     l: 'TOTAL EVENTS',     color: '#FF0080' },
                        { n: '6',                                l: 'CLUBS',            color: '#00F5FF' },
                    ].map(({ n, l, color }) => (
                        <div key={l}>
                            <p className="font-bebas text-5xl" style={{ color, textShadow: `0 0 20px ${color}` }}>{n}</p>
                            <p className="font-orbitron text-[9px] tracking-[3px] text-white/40">{l}</p>
                        </div>
                    ))}
                </div>

                {/* ── Events by club ────────────────────────── */}
                {CLUB_ORDER.map((club) => {
                    const evs = BROCHURE_EVENTS.filter(e => e.club === club);
                    if (!evs.length) return null;
                    const color = CLUB_COLORS[club] ?? '#FF0080';
                    return (
                        <div key={club} className="mb-8">
                            <h3
                                className="font-bebas mb-3 border-b pb-2.5 text-xl tracking-[6px]"
                                style={{ color, borderColor: color + '33', textShadow: `0 0 10px ${color}` }}
                            >
                                ✦ {club}
                            </h3>
                            {evs.map((ev, i) => (
                                <div
                                    key={i}
                                    className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-lg p-3"
                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{ev.icon}</span>
                                        <div>
                                            <p className="font-bebas text-lg tracking-widest text-white">{ev.name}</p>
                                            <p className="font-orbitron text-[9px] tracking-widest" style={{ color: ev.color }}>
                                                {ev.subtitle} · {ev.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bebas text-base" style={{ color: '#FFD700' }}>{ev.prize}</p>
                                        <p className="font-orbitron text-[9px] tracking-widest text-white/30">1ST PRIZE</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}

                {/* ── Venue ─────────────────────────────────── */}
                <div
                    className="rounded-2xl p-7 text-center"
                    style={{ background: 'linear-gradient(135deg, rgba(255,0,128,0.08), rgba(0,245,255,0.04))', border: '1px solid rgba(255,0,128,0.2)' }}
                >
                    <p className="font-orbitron mb-2 text-[11px] tracking-[4px] text-white/40">VENUE</p>
                    <p className="font-bebas text-[22px] tracking-[3px] text-white">NEW HORIZON COLLEGE OF ENGINEERING</p>
                    <p className="text-sm text-white/50">Outer Ring Road, Bengaluru — 560103</p>
                </div>
            </div>
        </Layout>
    );
}
