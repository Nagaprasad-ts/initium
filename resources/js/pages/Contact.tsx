import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import {
    useReveal,
    SectionHeader,
    NeonDivider,
    NeonInput,
    InfoCard,
    TeamMemberCard,
    CoordinatorCard,
    PhoneContact,
} from '@/components/ui/PageComponents';
import {
    CORE_TEAM,
    EVENT_COORDINATORS,
    STALL_CONTACTS,
    VENUE_INFO,
    NEON_PALETTE,
} from '@/constants';

/* ─── Page ───────────────────────────────────────────────────── */
export default function Contact() {
    const refHero   = useReveal(0);
    const refInfo   = useReveal(80);
    const refForm   = useReveal(100);
    const refMap    = useReveal(140);
    const refTeam   = useReveal(80);
    const refCoords = useReveal(80);

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
                /* Reveal */
                .rv-item { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
                .rv-in   { opacity: 1 !important; transform: translateY(0) !important; }

                /* Placeholder */
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }

                /* Submit button */
                .submit-btn {
                    background: linear-gradient(135deg, #7C3AED, #9D4EDD);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 12px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    cursor: pointer;
                    width: 100%;
                    padding: 16px;
                    transition: opacity .2s, transform .15s, box-shadow .2s;
                }
                .submit-btn:hover {
                    opacity: .9;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 32px rgba(124,58,237,.5);
                }
            `}</style>

            {/* ═══════════════ HERO ═══════════════ */}
            <section
                style={{
                    background: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(124,58,237,.18) 0%, transparent 65%)',
                    paddingTop: 112,
                    paddingBottom: 60,
                    textAlign: 'center',
                }}
            >
                <div ref={refHero} className="rv-item">
                    <p
                        style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: 11,
                            letterSpacing: 7,
                            color: '#7C3AED',
                            opacity: 0.8,
                            marginBottom: 10,
                            textTransform: 'uppercase',
                        }}
                    >
                        GET IN TOUCH
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 'clamp(56px, 10vw, 110px)',
                            lineHeight: 1,
                            letterSpacing: 4,
                            color: '#fff',
                            marginBottom: 8,
                        }}
                    >
                        CONTACT{' '}
                        <span style={{ color: '#7C3AED', textShadow: '0 0 36px rgba(124,58,237,.65)' }}>
                            US
                        </span>
                    </h1>
                    <NeonDivider color="#7C3AED" />
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: 15,
                            letterSpacing: 3,
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        REGISTRATIONS · SPONSORSHIPS · STALLS · ENQUIRIES
                    </p>
                </div>
            </section>

            {/* ═══════════════ INFO STRIP ═══════════════ */}
            <section style={{ padding: '0 20px 60px' }}>
                <div
                    ref={refInfo}
                    className="rv-item mx-auto"
                    style={{ maxWidth: 960 }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 16,
                        }}
                    >
                        {VENUE_INFO.map((item, i) => (
                            <InfoCard key={i} icon={item.icon} label={item.label} value={item.value} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ FORM + MAP ═══════════════ */}
            <section style={{ padding: '0 20px 80px' }}>
                <div
                    className="mx-auto"
                    style={{
                        maxWidth: 1020,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: 32,
                    }}
                >
                    {/* ── Contact form ── */}
                    <div ref={refForm} className="rv-item">
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(124,58,237,0.22)',
                                borderRadius: 20,
                                padding: '36px 32px',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontSize: 10,
                                    letterSpacing: 4,
                                    color: '#7C3AED',
                                    opacity: 0.8,
                                    textTransform: 'uppercase',
                                    marginBottom: 8,
                                }}
                            >
                                REACH OUT
                            </p>
                            <h2
                                style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 42,
                                    letterSpacing: 2,
                                    color: '#fff',
                                    marginBottom: 28,
                                    lineHeight: 1,
                                }}
                            >
                                SEND A{' '}
                                <span style={{ color: '#7C3AED' }}>MESSAGE</span>
                            </h2>

                            {sent && (
                                <div
                                    style={{
                                        background: 'rgba(0,245,255,0.08)',
                                        border: '1px solid rgba(0,245,255,0.4)',
                                        borderRadius: 10,
                                        padding: 16,
                                        marginBottom: 20,
                                        textAlign: 'center',
                                        fontFamily: "'Orbitron', sans-serif",
                                        fontSize: 12,
                                        letterSpacing: 3,
                                        color: '#00F5FF',
                                    }}
                                >
                                    ✓ MESSAGE SENT SUCCESSFULLY
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <NeonInput placeholder="Your Name"    value={form.name}    onChange={set('name')} />
                                <NeonInput placeholder="Your Email"   value={form.email}   onChange={set('email')}   type="email" />
                                <NeonInput placeholder="Subject"      value={form.subject} onChange={set('subject')} />
                                <NeonInput placeholder="Your Message" value={form.message} onChange={set('message')} rows={5} />
                                <button type="submit" className="submit-btn" style={{ marginTop: 4 }}>
                                    SEND MESSAGE →
                                </button>
                            </form>

                            {/* Stalls & sponsors */}
                            <div
                                style={{
                                    marginTop: 30,
                                    paddingTop: 26,
                                    borderTop: '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "'Orbitron', sans-serif",
                                        fontSize: 10,
                                        letterSpacing: 3,
                                        color: 'rgba(255,215,0,0.7)',
                                        textTransform: 'uppercase',
                                        marginBottom: 14,
                                    }}
                                >
                                    STALLS & SPONSORS ENQUIRY
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {STALL_CONTACTS.map((c, i) => (
                                        <PhoneContact key={i} name={c.name} phone={c.phone} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Map ── */}
                    <div ref={refMap} className="rv-item" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div
                            style={{
                                borderRadius: 20,
                                overflow: 'hidden',
                                border: '1px solid rgba(124,58,237,0.28)',
                                flex: 1,
                                minHeight: 320,
                            }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.595117784001!2d77.69212069999999!3d12.933724100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13cb00000001%3A0xab10e26281718cc2!2sNew%20Horizon%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1772874038665!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: 'block', minHeight: 320, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="New Horizon College of Engineering"
                            />
                        </div>
                        <div
                            style={{
                                background: 'rgba(124,58,237,0.06)',
                                border: '1px solid rgba(124,58,237,0.22)',
                                borderRadius: 14,
                                padding: '20px 24px',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontSize: 10,
                                    letterSpacing: 3,
                                    color: '#7C3AED',
                                    marginBottom: 10,
                                    textTransform: 'uppercase',
                                }}
                            >
                                HOW TO REACH
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: 'rgba(255,255,255,0.68)',
                                    lineHeight: 1.7,
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                Located on Outer Ring Road, Bengaluru. Nearest metro: Kadugodi / Whitefield.
                                Accessible via BMTC, cab services, and auto-rickshaws.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CORE TEAM ═══════════════ */}
            <section style={{ padding: '0 20px 80px' }}>
                <div className="mx-auto" style={{ maxWidth: 1020 }}>
                    <div ref={refTeam} className="rv-item">
                        <SectionHeader
                            eyebrow="THE TEAM"
                            eyebrowColor="#FFD700"
                            title="CORE"
                            accent="TEAM"
                            accentColor="#FFD700"
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                                gap: 14,
                            }}
                        >
                            {CORE_TEAM.map((m, i) => (
                                <TeamMemberCard key={i} name={m.name} phone={m.phone} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ EVENT CO-ORDINATORS ═══════════════ */}
            <section style={{ padding: '0 20px 100px' }}>
                <div className="mx-auto" style={{ maxWidth: 1020 }}>
                    <div ref={refCoords} className="rv-item">
                        <SectionHeader
                            eyebrow="EVENT CONTACTS"
                            eyebrowColor="#00F5FF"
                            title="EVENT"
                            accent="CO-ORDINATORS"
                            accentColor="#00F5FF"
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                                gap: 16,
                            }}
                        >
                            {EVENT_COORDINATORS.map((item, idx) => (
                                <CoordinatorCard
                                    key={item.event}
                                    event={item.event}
                                    coords={item.coords}
                                    color={NEON_PALETTE[idx % NEON_PALETTE.length]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}