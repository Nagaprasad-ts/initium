import { Link, Head } from '@inertiajs/react';
import Layout from '@/components/Layout';

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: 'individual' | 'group' | 'both';
    venue: string;
    event_start_date: string;
    start_time: string;
    end_time: string;
    price: string;
    banner_image: string;
}

interface IndexProps {
    events: Event[];
}

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function Index({ events }: IndexProps) {
    return (
        <Layout>
            <Head title="Explore Events | Initium 2026" />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                            Events at <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Initium</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            From high-stakes hackathons to creative competitions, browse our diverse range of events and find your perfect match.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event) => (
                            <div 
                                key={event.id} 
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={event.banner_image} 
                                        alt={event.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest text-blue-600 shadow-sm">
                                            {event.type}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <span className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-lg">
                                            ₹{parseFloat(event.price).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {event.name}
                                    </h2>
                                    
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span className="text-sm font-medium">{formatDate(event.event_start_date)}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span className="text-sm font-medium truncate">{event.venue}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <Link 
                                            href={`/events/${event.slug}`} 
                                            className="block w-full text-center py-4 bg-gray-900 group-hover:bg-blue-600 text-white font-black rounded-2xl transition-colors shadow-lg shadow-gray-900/10 group-hover:shadow-blue-600/20"
                                        >
                                            REGISTER NOW
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">No events found</h3>
                            <p className="text-gray-400">Stay tuned, we're adding more soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
