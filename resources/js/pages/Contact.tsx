import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';

/* ─── Reveal hook ───────────────────────────────────────────── */
function useReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => el.classList.add('visible'), delay);
                }
            },
            { threshold: 0.08 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return ref;
}

/* ─── Data ──────────────────────────────────────────────────── */
const CORE_TEAM = [
    { name: 'Aditya P V',        phone: '+91 99024 14459' },
    { name: 'Arya Singh',         phone: '+91 81478 30510' },
    { name: 'Rushil S',           phone: '+91 97410 62736' },
    { name: 'Sudhindra D',        phone: '+91 91132 36142' },
    { name: 'Deekshitha Ganiga',  phone: '+91 84318 47458' },
    { name: 'Adithya Menon',      phone: '+91 96325 06561' },
    { name: 'Niveditha',          phone: '+91 94825 98101' },
    { name: 'Adrian Brine',       phone: '+91 82770 59223' },
    { name: 'Siddhant Paradkar',  phone: '+91 72596 93997' },
    { name: 'Ashvin Sam Suraj',   phone: '+91 96207 83504' },
    { name: 'Shreya R Varur',     phone: '+91 89044 08234' },
    { name: 'Darshan D M',        phone: '+91 78991 94234' },
    { name: 'Megha',              phone: '+91 96506 19969' },
    { name: 'Sharanya',           phone: '+91 90356 86087' },
];

const EVENT_COORDINATORS = [
    { event: 'Viva La Voice',          coords: ['Sudhamshu D: +91 97316 90773', 'Naveen J: +91 78929 15699'] },
    { event: 'IPL Auction',            coords: ['Aadish Elijah R: +91 99026 12533', 'Shivani Handral: +91 93532 59007'] },
    { event: 'Skyfall',                coords: ['Sudhindra: +91 91132 36142', 'Malavika: +91 63646 76834'] },
    { event: 'The Late Night Special', coords: ['Monal: +91 77955 48439', 'Dhanya: +91 96861 25738'] },
    { event: 'Stack Your Luck',        coords: ['Pramod R: 9880970528', 'Vishwanath K: 9110649772'] },
    { event: 'Group Groove',           coords: ['Aakash V: +91 78998 82361', 'Aden Godly: +91 80736 67219'] },
    { event: 'The Silver Spotlight',   coords: ['Sachin Sharan: +91 79750 43982', 'Sreesha Sajesh: +91 62381 41538'] },
    { event: 'Clash of Kings',         coords: ['Jeetesh: 9886420994'] },
    { event: 'BGMI',                   coords: ['Vilasini: 9606644486'] },
    { event: 'The Reel Deal',          coords: ['Joshitha: 7619607360'] },
    { event: 'Two of a Kind',          coords: ['Sriharsha: 9845689877', 'Tejashwani: 8123580593'] },
    { event: 'All-in Showdown',        coords: ['Adithya: 9632506561', 'Sneha: 7204025137'] },
    { event: 'Sin City Silhouettes',   coords: ['Lalitha: 6364536488'] },
];

const NEON: string[] = ['#FF0080', '#00F5FF', '#FFD700', '#7C3AED', '#00FF88', '#FF6B35'];

const STALL_CONTACTS = [
    'Aditya P V: +91 99024 14459',
    'Arya Singh: +91 81478 30510',
    'Rushil S: +91 97410 62736',
    'Sudhindra D: +91 91132 36142',
];

/* ─── Sub-components ────────────────────────────────────────── */
function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
    return (
        <p
            style={{ color, letterSpacing: '6px', fontSize: 10, opacity: 0.8 }}
            className="font-orbitron mb-2 uppercase"
        >
            {children}
        </p>
    );
}

function NeonDivider({ color }: { color: string }) {
    return (
        <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, ${color}, transparent)` }} />
        </div>
    );
}

function InputField({
    type = 'text',
    placeholder,
    value,
    onChange,
    rows,
}: {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}) {
    const base: React.CSSProperties = {
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 10,
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        padding: '12px 16px',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'border-color .2s, box-shadow .2s',
        resize: rows ? 'vertical' : undefined,
    };
    const [focused, setFocused] = useState(false);
    const focused_style: React.CSSProperties = focused
        ? { borderColor: '#7C3AED', boxShadow: '0 0 12px rgba(124,58,237,0.35)' }
        : {};

    if (rows) {
        return (
            <textarea
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ ...base, ...focused_style }}
            />
        );
    }
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...base, ...focused_style }}
        />
    );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Contact() {
    const refHero    = useReveal(0);
    const refInfo    = useReveal(100);
    const refForm    = useReveal(150);
    const refMap     = useReveal(200);
    const refTeam    = useReveal(100);
    const refCoords  = useReveal(100);

    const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent]   = useState(false);

    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
        setTimeout(() => setSent(false), 3500);
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Layout>
            <Head title="Contact | Initium 2026" />

            <style>{`
                /* Placeholder color */
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }

                /* Reveal animation */
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
                .reveal.visible { opacity: 1; transform: translateY(0); }

                /* Coordinator card hover */
                .coord-card { transition: transform .2s, box-shadow .2s; }
                .coord-card:hover { transform: translateY(-3px); }

                /* Team member card */
                .team-card { transition: background .2s, border-color .2s; }
                .team-card:hover { background: rgba(255,215,0,0.08) !important; border-color: rgba(255,215,0,0.3) !important; }

                /* Submit button */
                .submit-btn {
                    background: linear-gradient(135deg, #7C3AED, #9D4EDD);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 12px;
                    letter-spacing: 3px;
                    cursor: pointer;
                    width: 100%;
                    padding: 15px;
                    transition: opacity .2s, transform .15s, box-shadow .2s;
                }
                .submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 30px rgba(124,58,237,.5); }
                .submit-btn:active { transform: translateY(0); }
            `}</style>

            {/* ══════════════════ HERO ══════════════════ */}
            <section
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,.2) 0%, transparent 65%)',
                    paddingTop: 100,
                    paddingBottom: 60,
                    textAlign: 'center',
                }}
            >
                <div ref={refHero} className="reveal">
                    <SectionLabel color="#7C3AED">GET IN TOUCH</SectionLabel>
                    <h1
                        className="font-bebas text-white leading-none tracking-widest"
                        style={{ fontSize: 'clamp(52px, 9vw, 100px)', marginTop: 4 }}
                    >
                        CONTACT{' '}
                        <span style={{ color: '#7C3AED', textShadow: '0 0 30px rgba(124,58,237,.7)' }}>US</span>
                    </h1>
                    <NeonDivider color="#7C3AED" />
                    <p className="text-white/40 text-sm tracking-widest" style={{ letterSpacing: 4 }}>
                        REGISTRATIONS · SPONSORSHIPS · STALLS · ENQUIRIES
                    </p>
                </div>
            </section>

            {/* ══════════════════ INFO STRIP ══════════════════ */}
            <section style={{ padding: '0 20px 60px' }}>
                <div ref={refInfo} className="reveal mx-auto" style={{ maxWidth: 900 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                        {[
                            { icon: '📍', label: 'VENUE',  value: 'New Horizon College of Engineering, Outer Ring Road, Bengaluru — 560103' },
                            { icon: '📧', label: 'EMAIL',  value: 'initium@nhce.edu.in' },
                            { icon: '🎰', label: 'THEME',  value: 'Las Vegas Edition 2026' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    background: 'rgba(124,58,237,0.05)',
                                    border: '1px solid rgba(124,58,237,0.2)',
                                    borderRadius: 14,
                                    padding: '20px 22px',
                                    display: 'flex',
                                    gap: 14,
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ fontSize: 22, marginTop: 1 }}>{item.icon}</span>
                                <div>
                                    <p
                                        className="font-orbitron"
                                        style={{ color: '#7C3AED', fontSize: 9, letterSpacing: 3, marginBottom: 6 }}
                                    >
                                        {item.label}
                                    </p>
                                    <p className="text-white/65" style={{ fontSize: 13, lineHeight: 1.6 }}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ FORM + MAP ══════════════════ */}
            <section style={{ padding: '0 20px 80px' }}>
                <div
                    className="mx-auto"
                    style={{ maxWidth: 1000, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}
                >
                    {/* ── Contact Form ── */}
                    <div ref={refForm} className="reveal">
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(124,58,237,0.2)',
                                borderRadius: 20,
                                padding: '36px 32px',
                            }}
                        >
                            <SectionLabel color="#7C3AED">REACH OUT</SectionLabel>
                            <h2
                                className="font-bebas text-white tracking-widest"
                                style={{ fontSize: 38, marginBottom: 24 }}
                            >
                                SEND A <span style={{ color: '#7C3AED' }}>MESSAGE</span>
                            </h2>

                            {sent && (
                                <div
                                    className="font-orbitron text-center mb-5"
                                    style={{
                                        background: 'rgba(0,245,255,0.08)',
                                        border: '1px solid rgba(0,245,255,0.4)',
                                        borderRadius: 10,
                                        padding: '14px',
                                        color: '#00F5FF',
                                        fontSize: 11,
                                        letterSpacing: 3,
                                    }}
                                >
                                    ✓ MESSAGE SENT SUCCESSFULLY
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <InputField placeholder="Your Name"  value={form.name}    onChange={set('name')} />
                                <InputField placeholder="Your Email" value={form.email}   onChange={set('email')}   type="email" />
                                <InputField placeholder="Subject"    value={form.subject} onChange={set('subject')} />
                                <InputField placeholder="Your Message" value={form.message} onChange={set('message')} rows={5} />
                                <button type="submit" className="submit-btn" style={{ marginTop: 4 }}>
                                    SEND MESSAGE →
                                </button>
                            </form>

                            {/* Stalls & Sponsors */}
                            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <p
                                    className="font-orbitron"
                                    style={{ color: 'rgba(255,215,0,0.65)', fontSize: 9, letterSpacing: 3, marginBottom: 12 }}
                                >
                                    STALLS & SPONSORS ENQUIRY
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {STALL_CONTACTS.map((c, i) => (
                                        <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>📞 {c}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Map ── */}
                    <div ref={refMap} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div
                            style={{
                                borderRadius: 20,
                                overflow: 'hidden',
                                border: '1px solid rgba(124,58,237,0.25)',
                                flex: 1,
                                minHeight: 300,
                            }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.595117784001!2d77.69212069999999!3d12.933724100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13cb00000001%3A0xab10e26281718cc2!2sNew%20Horizon%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1772874038665!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: 'block', minHeight: 300, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="New Horizon College of Engineering"
                            />
                        </div>

                        {/* Quick direction card */}
                        <div
                            style={{
                                background: 'rgba(124,58,237,0.06)',
                                border: '1px solid rgba(124,58,237,0.2)',
                                borderRadius: 14,
                                padding: '18px 22px',
                            }}
                        >
                            <p className="font-orbitron" style={{ color: '#7C3AED', fontSize: 9, letterSpacing: 3, marginBottom: 8 }}>
                                HOW TO REACH
                            </p>
                            <p className="text-white/55" style={{ fontSize: 13, lineHeight: 1.7 }}>
                                Located on Outer Ring Road, Bengaluru. Nearest metro: Kadugodi / Whitefield. 
                                Available via BMTC, cab services and auto-rickshaws.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════ CORE TEAM ══════════════════ */}
            <section style={{ padding: '0 20px 80px' }}>
                <div className="mx-auto" style={{ maxWidth: 1000 }}>
                    <div ref={refTeam} className="reveal">

                        {/* Section header */}
                        <div style={{ marginBottom: 32 }}>
                            <SectionLabel color="#FFD700">THE TEAM</SectionLabel>
                            <h2
                                className="font-bebas text-white tracking-widest leading-none"
                                style={{ fontSize: 'clamp(36px, 6vw, 62px)' }}
                            >
                                CORE{' '}
                                <span style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,.6)' }}>TEAM</span>
                            </h2>
                            <div className="h-px mt-4" style={{ background: 'linear-gradient(to right, #FFD700, transparent)' }} />
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                gap: 12,
                            }}
                        >
                            {CORE_TEAM.map((m, i) => (
                                <div
                                    key={i}
                                    className="team-card"
                                    style={{
                                        background: 'rgba(255,215,0,0.03)',
                                        border: '1px solid rgba(255,215,0,0.12)',
                                        borderRadius: 12,
                                        padding: '14px 16px',
                                    }}
                                >
                                    <p className="font-rajdhani font-semibold text-white/85" style={{ fontSize: 13, marginBottom: 4 }}>
                                        {m.name}
                                    </p>
                                    <p style={{ fontSize: 11, color: 'rgba(255,215,0,0.65)' }}>{m.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════ EVENT COORDINATORS ══════════════════ */}
            <section style={{ padding: '0 20px 100px' }}>
                <div className="mx-auto" style={{ maxWidth: 1000 }}>
                    <div ref={refCoords} className="reveal">

                        {/* Section header */}
                        <div style={{ marginBottom: 32 }}>
                            <SectionLabel color="#00F5FF">EVENT CONTACTS</SectionLabel>
                            <h2
                                className="font-bebas text-white tracking-widest leading-none"
                                style={{ fontSize: 'clamp(36px, 6vw, 62px)' }}
                            >
                                EVENT{' '}
                                <span style={{ color: '#00F5FF', textShadow: '0 0 20px rgba(0,245,255,.6)' }}>
                                    CO-ORDINATORS
                                </span>
                            </h2>
                            <div className="h-px mt-4" style={{ background: 'linear-gradient(to right, #00F5FF, transparent)' }} />
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))',
                                gap: 14,
                            }}
                        >
                            {EVENT_COORDINATORS.map((item, idx) => {
                                const color = NEON[idx % NEON.length];
                                return (
                                    <div
                                        key={item.event}
                                        className="coord-card"
                                        style={{
                                            background: `${color}07`,
                                            border: `1px solid ${color}25`,
                                            borderRadius: 14,
                                            padding: '18px 20px',
                                            boxShadow: `0 0 0 0 ${color}`,
                                        }}
                                        onMouseEnter={e =>
                                            ((e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${color}30`)
                                        }
                                        onMouseLeave={e =>
                                            ((e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${color}`)
                                        }
                                    >
                                        <p
                                            className="font-bebas tracking-widest"
                                            style={{ color, fontSize: 16, textShadow: `0 0 10px ${color}80`, marginBottom: 10 }}
                                        >
                                            {item.event}
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            {item.coords.map((c, i) => (
                                                <p
                                                    key={i}
                                                    className="font-rajdhani"
                                                    style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}
                                                >
                                                    📞 {c}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}