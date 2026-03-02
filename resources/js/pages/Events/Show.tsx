import { Link, Head, usePage } from '@inertiajs/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: 'individual' | 'group' | 'both';
    venue: string;
    event_start_date: string;
    event_end_date?: string | undefined;
    start_time: string;
    end_time: string;
    price: string;
    banner_image: string;
}

interface ShowProps {
    event: Event;
    has_capacity: boolean;
}

const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

export default function Show({ event, has_capacity }: ShowProps) {
    const { flash } = usePage<{ flash: { error?: string } }>().props;

    return (
        <Layout>
            <Head title={`${event.name}`} />

            <article className="bg-white min-h-screen">
                {/* Flash Messages */}
                {flash?.error && (
                    <div className="max-w-7xl mx-auto px-4 md:px-16 pt-8">
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-bold rounded-r-xl">
                            {flash.error}
                        </div>
                    </div>
                )}

                {/* Event Hero */}
                <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
                    <img 
                        src={event.banner_image} 
                        alt={event.name} 
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex gap-4 mb-6">
                                <div className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-xs font-black uppercase tracking-widest text-white">
                                    {event.type === "both" ? "Individual & Group" : event.type} Registration
                                </div>
                                {!has_capacity && (
                                    <div className="inline-block px-4 py-2 bg-red-600 rounded-lg text-xs font-black uppercase tracking-widest text-white shadow-lg animate-pulse">
                                        EVENT FULL
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight">
                                {event.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-blue-100/80 text-lg md:text-xl font-medium tracking-wide">
                                <div className="flex items-center gap-3">
                                    <Clock />
                                    <span>{event.start_time} - {event.end_time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin />
                                    <span>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar />
                                    <span>
                                        {formatDate(event.event_start_date)}
                                        {event?.event_end_date && (
                                            <> and {formatDate(event.event_end_date)}</>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 md:px-16 py-20">
                    <div className="grid lg:grid-cols-3 gap-20">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-4">
                                    <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                    Overview
                                </h2>
                                <div className="prose prose-xl text-gray-600 max-w-none leading-relaxed">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: event.description }}
                                    />
                                </div>
                            </section>

                            {/* <section>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-4">
                                    <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                    Rules & Guidelines
                                </h2>
                                <ul className="space-y-6">
                                    {[
                                        'Valid student ID is mandatory for all participants.',
                                        'Ensure you arrive at the venue at least 30 minutes before the start time.',
                                        'All decisions by the judges will be final and binding.',
                                        'Registration fees are non-refundable.'
                                    ].map((rule, idx) => (
                                        <li key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                                            <div className="w-8 h-8 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700 font-medium">{rule}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section> */}
                        </div>

                        {/* Sidebar / Registration Action */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="p-8 bg-white border-2 border-gray-200 rounded-3xl shadow-2xl shadow-blue-600/5 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 border-2 border-blue-200 rounded-full -mr-16 -mt-16 -z-10"></div>
                                    
                                    <div className="mb-8">
                                        <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Registration Fee</div>
                                        <div className="text-5xl font-black text-gray-900">
                                            ₹{parseFloat(event.price).toLocaleString()}
                                        </div>
                                    </div>

                                    {!has_capacity && (
                                        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl text-center font-bold">
                                            Registration closed as capacity has been reached.
                                        </div>
                                    )}

                                    <div className="space-y-4 pt-8 border-t border-gray-100">
                                        {(event.type === 'individual' || event.type === 'both') && (
                                            has_capacity ? (
                                                <Link 
                                                    href={`/registration/individual/${event.slug}`} 
                                                    className="block w-full text-center py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20"
                                                >
                                                    INDIVIDUAL REGISTRATION
                                                </Link>
                                            ) : (
                                                <button disabled className="w-full py-5 bg-gray-100 text-gray-400 font-black rounded-2xl cursor-not-allowed">
                                                    REGISTRATION FULL
                                                </button>
                                            )
                                        )}
                                        
                                        {(event.type === 'group' || event.type === 'both') && (
                                            has_capacity ? (
                                                <Link 
                                                    href={`/registration/group/${event.slug}`} 
                                                    className="block w-full text-center py-5 bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-black rounded-2xl transition-all"
                                                >
                                                    GROUP REGISTRATION
                                                </Link>
                                            ) : null
                                        )}
                                    </div>

                                    {has_capacity && (
                                        <p className="mt-8 text-xs text-center font-bold text-gray-400 uppercase tracking-widest">
                                            Limited spots available
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 p-6 bg-gray-900 rounded-3xl text-white">
                                    <h4 className="text-lg font-black mb-4 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                        </svg>
                                        Important Info
                                    </h4>
                                    <div className="space-y-4 text-sm font-medium text-gray-400">
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span className="text-white">{formatDate(event.event_start_date)}
                                                {event?.event_end_date && (
                                                    <> and {formatDate(event.event_end_date)}</>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Venue:</span>
                                            <span className="text-white">{event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
