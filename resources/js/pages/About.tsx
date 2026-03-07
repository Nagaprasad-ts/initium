import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import { useReveal } from '@/hooks/useReveal';

const TIMELINE = [
    { year: '2022', title: 'The Genesis', desc: 'INITIUM emerged from a unified vision among students seeking a literary celebration. Born in the halls of NHCE, it was the spark of something extraordinary.', color: '#FF0080' },
    { year: '2023', title: 'Anime Universe', desc: 'Captivated audiences through the vibrant world of anime and contemporary pop culture, bringing characters to life on stage.', color: '#00F5FF' },
    { year: '2024', title: 'Retro Echoes', desc: 'Transported participants through wistful retro aesthetics — a nostalgic journey wrapped in modern energy and artistic expression.', color: '#FFD700' },
    { year: '2025', title: 'Wizarding World', desc: 'The enchanting wizarding world came alive as magic and imagination took center stage, creating unforgettable moments of wonder.', color: '#7C3AED' },
    { year: '2026', title: 'Las Vegas Edition', desc: 'Welcome to Sin City — where neon lights, high stakes, and electrifying performances converge for the most dazzling INITIUM yet.', color: '#FF0080' },
];

const CLUBS = [
    { name: 'Literary Club', desc: 'Words that stir the soul — debates, declamations, and dramatic performances.', icon: '📖', color: '#FF0080' },
    { name: 'Music Club', desc: 'Melodies that echo through the night — from solo spotlights to grand choruses.', icon: '🎵', color: '#00F5FF' },
    { name: 'Media Club', desc: 'Digital artists and esports warriors — creativity meets competition.', icon: '🎬', color: '#7C3AED' },
    { name: 'Art Club', desc: 'Where imagination takes physical form — structures that defy expectation.', icon: '🎨', color: '#FFD700' },
    { name: 'Dance Club', desc: 'Bodies in motion, rhythm in heart — from duets to battle royales.', icon: '💃', color: '#FF0080' },
    { name: 'Fashion Club', desc: 'Runway royalty under neon lights — style as a form of artistry.', icon: '👗', color: '#00F5FF' },
];

const STAT_BAR = [
    { n: '70+', l: 'Events Hosted', color: '#FF0080' },
    { n: '11,753+', l: 'Total Footfall', color: '#00F5FF' },
    { n: '2,058+', l: 'Participants', color: '#FFD700' },
    { n: '4', l: 'Years Strong', color: '#7C3AED' },
];

function TimelineItem({ item, index }: { item: (typeof TIMELINE)[0]; index: number }) {
    const ref = useReveal();
    const isLeft = index % 2 === 0;
    return (
        <div
            ref={ref}
            className="section-reveal mb-10 flex"
            style={{
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                paddingLeft: !isLeft ? 60 : 0,
                paddingRight: isLeft ? 60 : 0,
            }}
        >
            <div className="neon-card max-w-sm rounded-xl p-6" style={{ borderColor: item.color + '44' }}>
                <p className="font-bebas text-5xl leading-none" style={{ color: item.color, textShadow: `0 0 20px ${item.color}` }}>
                    {item.year}
                </p>
                <h3 className="font-bebas mb-2 text-[22px] tracking-widest text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
            </div>
        </div>
    );
}

export default function About() {
    const clubsRef = useReveal();

    return (
        <Layout>
            <Head title="About — INITIUM 2026" />

            {/* Hero */}
            <div
                className="border-b px-5 pb-16 pt-20 text-center"
                style={{
                    background: 'radial-gradient(ellipse at 70% 0%, rgba(0,245,255,0.12) 0%, transparent 60%)',
                    borderColor: 'rgba(0,245,255,0.1)',
                }}
            >
                <SectionTitle
                    top="OUR STORY"
                    main="ABOUT"
                    accent="INITIUM"
                    color="#00F5FF"
                    sub="Four years of artistry, imagination, and student-led excellence"
                />
                <p className="mx-auto max-w-2xl text-[17px] leading-[1.9] text-white/65">
                    INITIUM is the intercollegiate literary extravaganza hosted by the Literary Club in conjunction
                    with Music, Media, Fashion, Dance, and Art Clubs of{' '}
                    <span style={{ color: '#00F5FF' }}>New Horizon College of Engineering</span>.
                    Cultivated exclusively through student-led efforts, it stands as proof of the unlimited
                    imagination flourishing across our institutional community.
                </p>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center border-b" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                {STAT_BAR.map(({ n, l, color }, i) => (
                    <div key={i} className="px-10 py-7 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                        <p className="font-bebas text-[40px] leading-none" style={{ color, textShadow: `0 0 15px ${color}` }}>{n}</p>
                        <p className="font-orbitron text-[9px] tracking-widest text-white/40 uppercase">{l}</p>
                    </div>
                ))}
            </div>

            {/* Timeline */}
            <section className="relative mx-auto max-w-3xl px-5 py-20">
                <SectionTitle top="THROUGH THE YEARS" main="OUR" accent="JOURNEY" color="#FFD700" />
                <div className="relative">
                    <div className="timeline-line" />
                    {TIMELINE.map((item, i) => (
                        <TimelineItem key={i} item={item} index={i} />
                    ))}
                </div>
            </section>

            {/* Clubs */}
            <section className="mx-auto max-w-5xl px-5 pb-20">
                <SectionTitle top="ORGANIZED BY" main="THE" accent="CLUBS" color="#FF0080" />
                <div
                    ref={clubsRef}
                    className="section-reveal grid gap-5"
                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
                >
                    {CLUBS.map((c, i) => (
                        <div key={i} className="neon-card rounded-xl p-7" style={{ borderColor: c.color + '33' }}>
                            <div className="mb-3 text-4xl">{c.icon}</div>
                            <h3 className="font-bebas mb-2 text-[22px] tracking-widest" style={{ color: c.color, textShadow: `0 0 10px ${c.color}` }}>
                                {c.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/55">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
