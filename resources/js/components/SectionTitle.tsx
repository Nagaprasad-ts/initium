import { useReveal } from '@/hooks/useReveal';

interface SectionTitleProps {
    top?: string;
    main: string;
    accent: string;
    sub?: string;
    color?: string;
}

export default function SectionTitle({ top, main, accent, sub, color = '#FF0080' }: SectionTitleProps) {
    const ref = useReveal();

    return (
        <div ref={ref} className="section-reveal mb-12 text-center">
            {top && (
                <p
                    className="font-orbitron mb-2 text-[11px] uppercase"
                    style={{ letterSpacing: 6, color, opacity: 0.7 }}
                >
                    {top}
                </p>
            )}
            <h2
                className="font-bebas leading-none tracking-widest text-white"
                style={{ fontSize: 'clamp(42px,8vw,80px)' }}
            >
                {main}{' '}
                <span style={{ color, textShadow: `0 0 20px ${color}` }}>{accent}</span>
            </h2>
            {sub && (
                <p className="mx-auto mt-3 max-w-[500px] text-base text-white/50">{sub}</p>
            )}
            <div className="mt-5 flex items-center justify-center gap-3">
                <div
                    className="h-px max-w-[80px] flex-1"
                    style={{ background: `linear-gradient(to left, ${color}, transparent)` }}
                />
                <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                />
                <div
                    className="h-px max-w-[80px] flex-1"
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                />
            </div>
        </div>
    );
}