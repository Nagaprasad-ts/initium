import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Layout from '@/components/Layout';

interface Registration {
    id: number;
    registration_type: string;
    team_name: string | null;
    payment_status: string;
    total_amount: string;
    event: {
        name: string;
    };
}

interface SuccessProps {
    registration: Registration;
}

export default function Success({ registration }: SuccessProps) {
    return (
        <Layout>
            <Head title="Registration Successful" />

            <section className="py-24 bg-primary min-h-screen flex items-center justify-center">
                <div className="max-w-2xl w-full px-4 text-center">
                    <div className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-green-600 text-green-100 rounded-full shadow-xl shadow-green-600/10">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Payment Successful!
                    </h1>
                    
                    <p className="text-xl text-gray-200 mb-12 font-medium">
                        Thank you for registering. Your spot for <span className="text-purple-500 font-bold">{registration.event.name}</span> is now confirmed.
                    </p>

                    <div className="bg-white rounded-3xl p-8 mb-12 text-left">
                        <div className="grid grid-cols-2 gap-y-6">
                            <div>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Registration ID</p>
                                <p className="font-bold text-gray-900">#INTM-{registration.id}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Type</p>
                                <p className="font-bold text-gray-900 uppercase">{registration.registration_type}</p>
                            </div>
                            {registration.team_name && (
                                <div>
                                    <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Team Name</p>
                                    <p className="font-bold text-gray-900">{registration.team_name}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Amount Paid</p>
                                <p className="font-bold text-gray-900">₹{parseFloat(registration.total_amount).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Status</p>
                                <p className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-black uppercase tracking-wider">
                                    {registration.payment_status}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                            href="/" 
                            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20"
                        >
                            Back to Home
                        </Link>
                        <Link 
                            href="/events" 
                            className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-black rounded-2xl transition-all"
                        >
                            Explore More Events
                        </Link>
                    </div>
                    
                    <p className="mt-12 text-sm text-gray-200 font-medium leading-relaxed">
                        A confirmation email has been sent to your registered address. <br />
                        Please show your Registration ID at the venue on the day of the event.
                    </p>
                </div>
            </section>
        </Layout>
    );
}
