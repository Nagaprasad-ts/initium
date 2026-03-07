import { Head } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
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

const CORE_TEAM = [
    'Aditya P V: +91 99024 14459',    'Arya Singh: +91 81478 30510',
    'Rushil S: +91 97410 62736',       'Sudhindra D: +91 91132 36142',
    'Deekshitha Ganiga: +91 84318 47458', 'Adithya Menon: +91 96325 06561',
    'Niveditha: +91 94825 98101',      'Adrian Brine: +91 82770 59223',
];

const INFO = [
    { icon: '📍', label: 'Address', value: 'New Horizon College of Engineering, Outer Ring Road, Bengaluru — 560103' },
    { icon: '📧', label: 'Email',   value: 'initium@nhce.edu.in' },
    { icon: '🎰', label: 'Theme',   value: 'Las Vegas Edition 2026' },
];

export default function Contact() {
    const r1 = useReveal();
    const r2 = useReveal();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Layout>
            <Head title="Contact | Initium 2026" />

            {/* Header */}
            <div
                className="px-5 pb-16 pt-20"
                style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)' }}
            >
                <div className="mb-12 text-center">
                    <p className="font-orbitron mb-2 text-[11px] uppercase tracking-[6px]" style={{ color: '#7C3AED', opacity: 0.7 }}>GET IN TOUCH</p>
                    <h1 className="font-bebas mb-4 leading-none tracking-widest text-white" style={{ fontSize: 'clamp(42px,8vw,80px)' }}>
                        CONTACT <span style={{ color: '#7C3AED' }}>US</span>
                    </h1>
                    <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to left, #7C3AED, transparent)' }} />
                        <div className="h-2 w-2 rounded-full" style={{ background: '#7C3AED', boxShadow: '0 0 12px #7C3AED' }} />
                        <div className="h-px max-w-[80px] flex-1" style={{ background: 'linear-gradient(to right, #7C3AED, transparent)' }} />
                    </div>
                    <p className="text-base text-white/50">Reach out for registrations, sponsorships & more</p>
                </div>

                <div className="mx-auto max-w-5xl" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

                    {/* ── Info + Map + Team ────────────────────── */}
                    <div ref={r1} className="section-reveal">
                        <h3 className="font-bebas mb-6 text-[28px] tracking-widest text-white">
                            REACH <span style={{ color: '#7C3AED' }}>OUT</span>
                        </h3>
                        {INFO.map((item, i) => (
                            <div key={i} className="mb-6 flex gap-4 rounded-r-lg p-5"
                                style={{ background: 'rgba(124,58,237,0.05)', borderLeft: '2px solid #7C3AED' }}>
                                <span className="mt-0.5 text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-orbitron mb-1 text-[9px] tracking-[3px]" style={{ color: '#7C3AED' }}>{item.label}</p>
                                    <p className="text-sm leading-relaxed text-white/70">{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Map */}
                        <div className="overflow-hidden rounded-xl mb-8" style={{ border: '1px solid rgba(124,58,237,0.3)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.854059657489!2d77.70578!3d12.957889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1329dba7d5b5%3A0x4f8e9a4e0f0e8f0!2sNew%20Horizon%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1"
                                width="100%" height="220"
                                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                title="NHCE Map"
                            />
                        </div>

                        {/* Core team */}
                        <h3 className="font-bebas mb-4 text-[22px] tracking-[3px]" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>
                            CORE TEAM
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {CORE_TEAM.map((member, i) => {
                                const [name, num] = member.split(': ');
                                return (
                                    <div key={i} className="rounded-lg p-2.5" style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)' }}>
                                        <p className="font-rajdhani text-[12px] font-semibold text-white/80">{name}</p>
                                        {num && <p className="text-[11px]" style={{ color: 'rgba(255,215,0,0.7)' }}>{num}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Contact form ─────────────────────────── */}
                    <div ref={r2} className="section-reveal">
                        <div className="neon-card rounded-2xl p-8" style={{ borderColor: 'rgba(124,58,237,0.3)' }}>
                            <div className="mb-6 h-px w-full" style={{ background: 'linear-gradient(to right, #7C3AED, transparent)' }} />
                            <h3 className="font-bebas mb-6 text-[28px] tracking-widest text-white">
                                SEND A <span style={{ color: '#7C3AED' }}>MESSAGE</span>
                            </h3>

                            {sent && (
                                <div className="font-orbitron mb-5 rounded-lg p-4 text-center text-[12px] tracking-widest"
                                    style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid #00F5FF', color: '#00F5FF' }}>
                                    ✓ MESSAGE SENT SUCCESSFULLY
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { key: 'name',    placeholder: 'Your Name',  type: 'text'  },
                                    { key: 'email',   placeholder: 'Your Email', type: 'email' },
                                    { key: 'subject', placeholder: 'Subject',    type: 'text'  },
                                ].map((field) => (
                                    <input
                                        key={field.key}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.key as keyof typeof form]}
                                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                        className="neon-input"
                                    />
                                ))}
                                <textarea
                                    placeholder="Your Message"
                                    rows={5}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="neon-input resize-y"
                                />
                                <button type="submit" className="btn-neon btn-neon-purple w-full" style={{ padding: '14px', fontSize: 13 }}>
                                    SEND MESSAGE →
                                </button>
                            </form>

                            {/* Stalls & Sponsors */}
                            <div className="mt-7 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <p className="font-orbitron mb-3 text-[9px] tracking-[3px]" style={{ color: 'rgba(255,215,0,0.6)' }}>
                                    STALLS & SPONSORS ENQUIRY
                                </p>
                                {['Aditya P V: +91 99024 14459', 'Arya Singh: +91 81478 30510', 'Rushil S: +91 97410 62736'].map((c, i) => (
                                    <p key={i} className="mb-1 text-[13px] text-white/60">📞 {c}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
