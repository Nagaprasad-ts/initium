import Layout from '@/components/Layout';
import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Target date for Initium 2026
        const targetDate = new Date('2026-05-20T09:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            <Head title="Home | Initium 2026" />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 via-black/80 to-purple-900/70"></div>
                    {/* Placeholder for background image */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')] bg-cover bg-center"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 animate-fade-in">
                        Initium <span className="text-blue-500">2026</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the grandest multi-event platform where innovation meets celebration. 
                        Unleash your potential and redefine boundaries.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/events" 
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-blue-600/20"
                        >
                            Explore Events
                        </Link>
                        <a 
                            href="#about" 
                            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:bg-white/10 text-white text-lg font-bold rounded-full transition-all backdrop-blur-sm"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Countdown Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Days', value: timeLeft.days },
                            { label: 'Hours', value: timeLeft.hours },
                            { label: 'Minutes', value: timeLeft.minutes },
                            { label: 'Seconds', value: timeLeft.seconds }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="text-4xl md:text-6xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-500">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold tracking-widest uppercase mb-6">
                                The Story
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                                About Initium
                            </h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Initium is more than just a series of events; it's a movement that brings together brilliant minds from across the region. Since its inception, we've focused on creating a platform for individual growth and team collaboration.
                                </p>
                                <p>
                                    Our mission is to foster innovation, celebrate talent, and create lasting memories. Whether you're a coder, an artist, a gamer, or a thinker, there's something for everyone at Initium 2026.
                                </p>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-200 pt-10">
                                <div>
                                    <div className="text-3xl font-black text-blue-600 mb-1">20+</div>
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Unique Events</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-blue-600 mb-1">5000+</div>
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Expected Participants</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative">
                                <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-3xl -z-10 rotate-3"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1540575861501-7ad05823c95b" 
                                    alt="Event" 
                                    className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
                        Ready to be a part of the legacy?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Registration is now open for all events. Secure your spot today and compete with the best.
                    </p>
                    <Link 
                        href="/events" 
                        className="inline-block px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl shadow-black/10"
                    >
                        View All Events
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
