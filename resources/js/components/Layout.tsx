import { Link, usePage } from '@inertiajs/react';
import { Home, Info, Calendar, Mail, FileText } from 'lucide-react';
import React from 'react';

interface LayoutProps { children: React.ReactNode; }

const NAV_ITEMS = [
    { href: '/',         label: 'HOME',     Icon: Home     },
    { href: '/about',    label: 'ABOUT',    Icon: Info     },
    { href: '/events',   label: 'EVENTS',   Icon: Calendar },
    { href: '/contact',  label: 'CONTACT',  Icon: Mail     },
    { href: '/brochure', label: 'BROCHURE', Icon: FileText },
];

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: (i * 1.3 % 3) + 1,
    left: (i * 37 + 13) % 100,
    delay: parseFloat(((i * 0.7) % 8).toFixed(1)),
    duration: parseFloat((((i * 1.1) % 10) + 8).toFixed(1)),
    color: ['#FF0080', '#00F5FF', '#FFD700', '#7C3AED'][i % 4],
}));

function Particles() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {PARTICLE_DATA.map((p) => (
                <div key={p.id} className="particle" style={{
                    width: p.size, height: p.size, left: `${p.left}%`, bottom: '-10px',
                    background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
                }} />
            ))}
        </div>
    );
}

function NavBar() {
    const { url } = usePage();
    const isActive = (href: string) => href === '/' ? url === '/' : url.startsWith(href);
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
            <div className="mx-auto flex max-w-[480px] justify-around rounded-[20px] px-1 py-1.5" style={{
                background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,245,255,0.15)',
                boxShadow: '0 0 30px rgba(0,245,255,0.1), 0 -4px 30px rgba(0,0,0,0.5)',
            }}>
                {NAV_ITEMS.map(({ href, label, Icon }) => (
                    <Link key={href} href={href} className={`nav-item ${isActive(href) ? 'active' : ''}`}>
                        <Icon size={20} strokeWidth={1.5} />
                        <span>{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative min-h-screen" style={{ background: '#0B0B0F', color: '#fff' }}>
            <Particles />
            <main className="relative z-10">{children}</main>
            <footer className="relative z-10 mb-24 border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="font-bebas mb-1 text-3xl tracking-[6px]" style={{ color: '#FF0080', textShadow: '0 0 15px #FF0080' }}>
                    INITIUM 2026
                </p>
                <p className="font-orbitron text-[9px] tracking-[4px] text-white">
                    NEW HORIZON COLLEGE OF ENGINEERING · BENGALURU
                </p>
            </footer>
            <NavBar />
        </div>
    );
}
