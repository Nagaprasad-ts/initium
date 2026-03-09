/* ═══════════════════════════════════════════════════════════════
   components/ui/PageComponents.tsx
   Shared presentational components for Initium 2026
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState } from 'react';

/* ─── useReveal hook ─────────────────────────────────────────── */
export function useReveal(delay = 0) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setTimeout(() => el.classList.add('rv-in'), delay);
            },
            { threshold: 0.06 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);
    return ref;
}

/* ─── SectionHeader ──────────────────────────────────────────── */
export function SectionHeader({
    eyebrow,
    eyebrowColor,
    title,
    accent,
    accentColor,
}: {
    eyebrow: string;
    eyebrowColor: string;
    title: string;
    accent: string;
    accentColor: string;
}) {
    return (
        <div style={{ marginBottom: 36 }}>
            <p
                style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 11,
                    letterSpacing: 6,
                    color: eyebrowColor,
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    marginBottom: 8,
                }}
            >
                {eyebrow}
            </p>
            <h2
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(40px, 6vw, 64px)',
                    letterSpacing: 3,
                    color: '#fff',
                    lineHeight: 1,
                }}
            >
                {title}{' '}
                <span
                    style={{
                        color: accentColor,
                        textShadow: `0 0 22px ${accentColor}80`,
                    }}
                >
                    {accent}
                </span>
            </h2>
            <div
                style={{
                    marginTop: 14,
                    height: 1,
                    background: `linear-gradient(to right, ${accentColor}, transparent)`,
                    maxWidth: 420,
                }}
            />
        </div>
    );
}

/* ─── NeonDivider ────────────────────────────────────────────── */
export function NeonDivider({ color }: { color: string }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                margin: '18px auto',
                maxWidth: 220,
            }}
        >
            <div
                style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to left, ${color}, transparent)`,
                }}
            />
            <div
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 14px ${color}`,
                }}
            />
            <div
                style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right, ${color}, transparent)`,
                }}
            />
        </div>
    );
}

/* ─── MetaItem ───────────────────────────────────────────────── */
export function MetaItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
            }}
        >
            {icon}
            {children}
        </span>
    );
}

/* ─── NeonInput ──────────────────────────────────────────────── */
export function NeonInput({
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
    const [focused, setFocused] = useState(false);

    const base: React.CSSProperties = {
        width: '100%',
        padding: '14px 18px',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 500,
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${focused ? '#7C3AED' : 'rgba(124,58,237,0.25)'}`,
        color: '#fff',
        outline: 'none',
        boxShadow: focused ? '0 0 14px rgba(124,58,237,0.3)' : 'none',
        transition: 'border-color .2s, box-shadow .2s',
        resize: rows ? 'vertical' : 'none',
    };

    if (rows) {
        return (
            <textarea
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={base}
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
            style={base}
        />
    );
}

/* ─── InfoCard (venue/email/theme strip) ─────────────────────── */
export function InfoCard({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) {
    return (
        <div
            style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                background: 'rgba(124,58,237,0.05)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: 14,
                padding: '20px 22px',
            }}
        >
            <span style={{ fontSize: 24, marginTop: 2 }}>{icon}</span>
            <div>
                <p
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: 10,
                        letterSpacing: 3,
                        color: '#7C3AED',
                        marginBottom: 6,
                        textTransform: 'uppercase',
                    }}
                >
                    {label}
                </p>
                <p
                    style={{
                        fontSize: 15,
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: 1.6,
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

/* ─── TeamMemberCard ─────────────────────────────────────────── */
export function TeamMemberCard({ name, phone }: { name: string; phone: string }) {
    return (
        <div
            style={{
                background: 'rgba(255,215,0,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 12,
                padding: '16px 18px',
                transition: 'background .2s, border-color .2s',
                cursor: 'default',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,215,0,0.09)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,215,0,0.35)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,215,0,0.04)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,215,0,0.15)';
            }}
        >
            <p
                style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#fff',
                    marginBottom: 4,
                }}
            >
                {name}
            </p>
            <p
                style={{
                    fontSize: 14,
                    color: 'rgba(255,215,0,0.8)',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 500,
                }}
            >
                {phone}
            </p>
        </div>
    );
}

/* ─── CoordinatorCard ────────────────────────────────────────── */
export function CoordinatorCard({
    event,
    coords,
    color,
}: {
    event: string;
    coords: string[];
    color: string;
}) {
    return (
        <div
            style={{
                background: `${color}08`,
                border: `1px solid ${color}28`,
                borderRadius: 14,
                padding: '20px 22px',
                transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 28px ${color}28`;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
        >
            <p
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    letterSpacing: 2,
                    color,
                    textShadow: `0 0 10px ${color}70`,
                    marginBottom: 12,
                }}
            >
                {event}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {coords.map((c, i) => (
                    <p
                        key={i}
                        style={{
                            fontSize: 14,
                            color: 'rgba(255,255,255,0.75)',
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <span style={{ fontSize: 13 }}>📞</span>
                        {c}
                    </p>
                ))}
            </div>
        </div>
    );
}

/* ─── PhoneContact ───────────────────────────────────────────── */
export function PhoneContact({ name, phone }: { name: string; phone: string }) {
    return (
        <p
            style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <span>📞</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{name}:</span>
            <span style={{ color: 'rgba(255,215,0,0.85)' }}>{phone}</span>
        </p>
    );
}