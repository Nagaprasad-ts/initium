/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, useForm, Link, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';

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
    const { data, setData, post, processing, errors, setError } = useForm({
        event_id: event.id,
        registration_type: 'individual',
        name: '',
        contact_email: '',
        contact_phone: '',
        college_name: '',
        student_id: '',
    });

    // ── Razorpay SDK load (unchanged) ─────────────────────────
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

    // ── Submit handler (unchanged) ────────────────────────────
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
                handler: async function (paymentResponse: any) {
                    try {
                        await axios.post('/registration/verify', {
                            razorpay_order_id:   response.data.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature:  paymentResponse.razorpay_signature,
                            registration_id:     response.data.registration_id,
                        });

                        router.visit(`/registration/success/${response.data.registration_id}`);
                    } catch (err) {
                        alert('Payment verification failed. Please contact support with your payment ID: ' + paymentResponse.razorpay_payment_id);
                    }
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

            <section className="min-h-screen px-5 py-14">
                <div className="mx-auto max-w-2xl">

                    {/* ── Back link ─────────────────────────── */}
                    <Link
                        href={`/events/${event.slug}`}
                        className="font-orbitron mb-8 inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/35 transition-colors hover:text-white/70"
                    >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Event
                    </Link>

                    {/* ── Header ───────────────────────────── */}
                    <div className="mb-10 text-center">
                        <span
                            className="font-orbitron mb-4 inline-block rounded px-4 py-2 text-[9px] uppercase tracking-widest"
                            style={{ background: 'rgba(255,0,128,0.1)', border: '1px solid rgba(255,0,128,0.3)', color: '#FF0080' }}
                        >
                            Individual Registration
                        </span>
                        <h1
                            className="font-bebas mt-3 leading-none tracking-widest text-white"
                            style={{ fontSize: 'clamp(32px,7vw,56px)' }}
                        >
                            {event.name}
                        </h1>
                        {event.type === 'both' && (
                            <p className="mt-3 text-sm text-white/40">
                                Need to register as a group?{' '}
                                <Link
                                    href={`/registration/group/${event.slug}`}
                                    className="font-bold transition-colors hover:text-white/70"
                                    style={{ color: '#7C3AED' }}
                                >
                                    Switch to Group Registration
                                </Link>
                            </p>
                        )}
                    </div>

                    {/* ── Form card ────────────────────────── */}
                    <div
                        className="neon-card rounded-2xl p-8 md:p-10"
                        style={{ borderColor: 'rgba(255,0,128,0.25)' }}
                    >
                        {/* Top accent line */}
                        <div
                            className="mb-8 h-px w-full"
                            style={{ background: 'linear-gradient(to right, #FF0080, transparent)' }}
                        />

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="neon-input"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="neon-input"
                                        placeholder="john@example.com"
                                        value={data.contact_email}
                                        onChange={e => setData('contact_email', e.target.value)}
                                        required
                                    />
                                    {errors.contact_email && (
                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                            {errors.contact_email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="neon-input"
                                        placeholder="+91 98765 43210"
                                        value={data.contact_phone}
                                        onChange={e => setData('contact_phone', e.target.value)}
                                        required
                                    />
                                    {errors.contact_phone && (
                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                            {errors.contact_phone}
                                        </p>
                                    )}
                                </div>

                                {/* Student ID */}
                                <div className="space-y-2">
                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                        Student ID / USN
                                    </label>
                                    <input
                                        type="text"
                                        className="neon-input"
                                        placeholder="1BM22CS001"
                                        value={data.student_id}
                                        onChange={e => setData('student_id', e.target.value)}
                                        required
                                    />
                                    {errors.student_id && (
                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                            {errors.student_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* College Name */}
                            <div className="space-y-2">
                                <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                    College Name
                                </label>
                                <input
                                    type="text"
                                    className="neon-input"
                                    placeholder="Your College Name"
                                    value={data.college_name}
                                    onChange={e => setData('college_name', e.target.value)}
                                    required
                                />
                                {errors.college_name && (
                                    <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                        {errors.college_name}
                                    </p>
                                )}
                            </div>

                            {/* ── Pay row ──────────────────────── */}
                            <div
                                className="flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row"
                                style={{ borderColor: 'rgba(255,0,128,0.15)' }}
                            >
                                <div>
                                    <p className="font-orbitron mb-1 text-[9px] uppercase tracking-widest text-white/35">
                                        Payable Amount
                                    </p>
                                    <div
                                        className="font-bebas text-4xl"
                                        style={{ color: '#FF0080', textShadow: '0 0 15px #FF0080' }}
                                    >
                                        ₹{parseFloat(event.price).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-neon w-full md:w-auto"
                                    style={{
                                        padding: '14px 36px',
                                        fontSize: 13,
                                        opacity: processing ? 0.5 : 1,
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {processing ? 'PROCESSING...' : 'PROCEED TO PAY →'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}