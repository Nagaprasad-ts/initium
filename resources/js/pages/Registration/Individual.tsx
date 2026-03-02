import Layout from '@/components/Layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import axios from 'axios';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface Event {
    id: number;
    name: string;
    slug: string;
    price: string;
    type: string;
}

interface IndividualProps {
    event: Event;
}

export default function Individual({ event }: IndividualProps) {
    const { data, setData, post, processing, errors } = useForm({
        event_id: event.id,
        registration_type: 'individual',
        name: '',
        contact_email: '',
        contact_phone: '',
        college_name: '',
        student_id: '',
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const rzpScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (rzpScript) {
                document.body.removeChild(rzpScript);
            }
        };
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/registration/submit', data);
            
            if (response.data.mock_payment) {
                if (response.data.debug_error) {
                    alert(`Razorpay Error: ${response.data.debug_error}\n\nFalling back to mock payment for development.`);
                } else {
                    alert('Mock payment successful for development.');
                }
                router.visit(`/registration/success/${response.data.registration_id}`);
                return;
            }

            const options = {
                key: response.data.razorpay_key,
                amount: response.data.amount * 100,
                currency: 'INR',
                name: 'Initium 2026',
                description: `Register for ${response.data.event_name}`,
                order_id: response.data.razorpay_order_id,
                handler: function (paymentResponse: any) {
                    router.visit(`/registration/success/${response.data.registration_id}`);
                },
                prefill: {
                    name: response.data.contact_name,
                    email: response.data.contact_email,
                    contact: response.data.contact_phone,
                },
                theme: {
                    color: '#2563eb',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                if (error.response.data.errors) {
                    setError(error.response.data.errors);
                }
                alert('Please check the form for errors.');
            } else if (error.response && error.response.data.error) {
                alert(error.response.data.error);
                if (error.response.data.registration_id && error.response.data.mock_payment) {
                    router.visit(`/registration/success/${error.response.data.registration_id}`);
                }
            } else {
                console.error('Registration failed:', error);
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <Layout>
            <Head title={`Register for ${event.name} | Initium 2026`} />

            <section className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <Link 
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Event
                        </Link>
                    </div>

                    <div className="mb-10 text-center">
                        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-black uppercase tracking-widest mb-4">
                            Individual Registration
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">
                            {event.name}
                        </h1>
                        {event.type === 'both' && (
                            <p className="mt-4 text-sm font-medium text-gray-500">
                                Need to register as a group? {' '}
                                <Link href={`/registration/group/${event.slug}`} className="text-blue-600 font-bold hover:underline">
                                    Switch to Group Registration
                                </Link>
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-600/5 border border-gray-100">
                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                                        placeholder="john@example.com"
                                        value={data.contact_email}
                                        onChange={e => setData('contact_email', e.target.value)}
                                        required
                                    />
                                    {errors.contact_email && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{errors.contact_email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                                        placeholder="+91 98765 43210"
                                        value={data.contact_phone}
                                        onChange={e => setData('contact_phone', e.target.value)}
                                        required
                                    />
                                    {errors.contact_phone && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{errors.contact_phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Student ID / USN</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                                        placeholder="1BM22CS001"
                                        value={data.student_id}
                                        onChange={e => setData('student_id', e.target.value)}
                                        required
                                    />
                                    {errors.student_id && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{errors.student_id}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest">College Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                                    placeholder="Your College Name"
                                    value={data.college_name}
                                    onChange={e => setData('college_name', e.target.value)}
                                    required
                                />
                                {errors.college_name && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{errors.college_name}</p>}
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Payable Amount</p>
                                    <div className="text-3xl font-black text-gray-900">₹{parseFloat(event.price).toLocaleString()}</div>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20"
                                >
                                    {processing ? 'PROCESSING...' : 'PROCEED TO PAY'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
