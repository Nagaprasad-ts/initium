/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, useForm, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';

interface Event {
    id: number;
    name: string;
    slug: string;
    price: string;
    type: string;
    min: number;
    max: number;
}

interface GroupProps {
    event: Event;
}

export default function Group({ event }: GroupProps) {
    const minParticipants = event.min;
    const maxParticipants = event.max;

    const { data, setData, post, processing, errors, setError } = useForm({
        event_id: event.id,
        registration_type: 'group',
        team_name: '',
        college_name: '',
        contact_email: '',
        contact_phone: '',
        participants: Array.from({ length: minParticipants }, () => ({
            name: '',
            email: '',
            phone: '',
            student_id: '',
        })),
    });

    // ── Razorpay SDK load (unchanged) ─────────────────────────
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const rzpScript = document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
            );
            if (rzpScript) {
                document.body.removeChild(rzpScript);
            }
        };
    }, []);

    // ── Participant helpers (unchanged) ───────────────────────
    const addParticipant = () => {
        if (maxParticipants && data.participants.length >= maxParticipants) {
            alert(`Maximum ${maxParticipants} participants allowed.`);
            return;
        }
        setData('participants', [
            ...data.participants,
            { name: '', email: '', phone: '', student_id: '' },
        ]);
    };

    const removeParticipant = (index: number) => {
        const min = event.min;
        if (data.participants.length > min) {
            const newParticipants = [...data.participants];
            newParticipants.splice(index, 1);
            setData('participants', newParticipants);
        } else {
            alert(`Minimum ${min} participants required.`);
        }
    };

    const updateParticipant = (index: number, field: string, value: string) => {
        const newParticipants = [...data.participants];
        newParticipants[index] = { ...newParticipants[index], [field]: value };
        setData('participants', newParticipants);
    };

    // ── Submit handler (unchanged) ────────────────────────────
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/registration/submit', data);

            if (response.data.mock_payment) {
                if (response.data.debug_error) {
                    console.log(response.data.debug_error, response.data.mock_payment);
                    alert(
                        `Razorpay Error: ${response.data.debug_error}\n\nFalling back to mock payment for development.`,
                    );
                } else {
                    alert('Mock payment successful for development.');
                }
                router.visit(
                    `/registration/success/${response.data.registration_id}`,
                );
                return;
            }

            const options = {
                key: response.data.razorpay_key,
                amount: response.data.amount * 100,
                currency: 'INR',
                name: 'Initium 2026',
                description: `Group Registration for ${response.data.event_name}`,
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
                    color: '#7c3aed',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                if (error.response.data.errors) {
                    setError(error.response.data.errors);
                    // console.log(error.response.data.errors, error.response.status);
                }
                alert('Please check the form for errors.');
            } else if (error.response && error.response.data.error) {
                alert(error.response.data.error);
                if (
                    error.response.data.registration_id &&
                    error.response.data.mock_payment
                ) {
                    router.visit(
                        `/registration/success/${error.response.data.registration_id}`,
                    );
                }
            } else {
                console.error('Registration failed:', error);
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <Layout>
            <Head title={`Group Registration for ${event.name} | Initium 2026`} />

            <section className="min-h-screen px-5 py-14">
                <div className="mx-auto max-w-3xl">

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
                            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#7C3AED' }}
                        >
                            Group Registration
                        </span>
                        <h1
                            className="font-bebas mt-3 leading-none tracking-widest text-white"
                            style={{ fontSize: 'clamp(32px,7vw,56px)' }}
                        >
                            {event.name}
                        </h1>
                        {event.type === 'both' && (
                            <p className="mt-3 text-sm text-white/40">
                                Need to register individually?{' '}
                                <Link
                                    href={`/registration/individual/${event.slug}`}
                                    className="font-bold transition-colors hover:text-white/70"
                                    style={{ color: '#FF0080' }}
                                >
                                    Switch to Individual Registration
                                </Link>
                            </p>
                        )}
                    </div>

                    {/* ── Form card ────────────────────────── */}
                    <div
                        className="neon-card rounded-2xl p-8 md:p-10"
                        style={{ borderColor: 'rgba(124,58,237,0.25)' }}
                    >
                        {/* Top accent line */}
                        <div
                            className="mb-8 h-px w-full"
                            style={{ background: 'linear-gradient(to right, #7C3AED, transparent)' }}
                        />

                        <form onSubmit={submit} className="space-y-10">

                            {/* ── Team Basic Info ───────────── */}
                            <div>
                                <p className="font-orbitron mb-5 text-[9px] uppercase tracking-[4px]" style={{ color: '#7C3AED' }}>
                                    Team Details
                                </p>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                    {/* Team Name */}
                                    <div className="space-y-2">
                                        <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                            Team Name
                                        </label>
                                        <input
                                            type="text"
                                            className="neon-input"
                                            placeholder="Enter your team name"
                                            value={data.team_name}
                                            onChange={(e) => setData('team_name', e.target.value)}
                                            required
                                        />
                                        {errors.team_name && (
                                            <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                {errors.team_name}
                                            </p>
                                        )}
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
                                            onChange={(e) => setData('college_name', e.target.value)}
                                            required
                                        />
                                        {errors.college_name && (
                                            <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                {errors.college_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Contact Email */}
                                    <div className="space-y-2">
                                        <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            className="neon-input"
                                            placeholder="Enter your email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            required
                                        />
                                        {errors.contact_email && (
                                            <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                {errors.contact_email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Contact Phone */}
                                    <div className="space-y-2">
                                        <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/50">
                                            Contact Phone
                                        </label>
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            pattern="[0-9]{10}"
                                            title="Phone number must be exactly 10 digits"
                                            className="neon-input"
                                            placeholder="Enter your phone number"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            required
                                        />
                                        {errors.contact_phone && (
                                            <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                {errors.contact_phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ── Participant List ──────────── */}
                            <div className="border-t pt-8" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="font-orbitron text-[9px] uppercase tracking-[4px]" style={{ color: '#7C3AED' }}>
                                        Team Members ({data.participants.length}/{maxParticipants || '∞'})
                                    </p>
                                    <button
                                        type="button"
                                        onClick={addParticipant}
                                        disabled={!!(event.max && data.participants.length >= event.max)}
                                        className="btn-neon btn-neon-purple disabled:cursor-not-allowed disabled:opacity-40"
                                        style={{ padding: '6px 14px', fontSize: 10 }}
                                    >
                                        + ADD MEMBER
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    {data.participants.map((participant, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-xl p-5"
                                            style={{
                                                background: 'rgba(124,58,237,0.05)',
                                                border: '1px solid rgba(124,58,237,0.15)',
                                            }}
                                        >
                                            <p
                                                className="font-orbitron mb-4 text-[9px] uppercase tracking-widest"
                                                style={{ color: '#7C3AED' }}
                                            >
                                                Member {index + 1}
                                            </p>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                                {/* Name */}
                                                <div className="space-y-2">
                                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/40">Name</label>
                                                    <input
                                                        type="text"
                                                        className="neon-input"
                                                        placeholder="Full Name"
                                                        value={participant.name}
                                                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                                                        required
                                                    />
                                                    {(errors as any)[`participants.${index}.name`] && (
                                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                            {(errors as any)[`participants.${index}.name`]}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* ID/USN */}
                                                <div className="space-y-2">
                                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/40">ID / USN</label>
                                                    <input
                                                        type="text"
                                                        className="neon-input"
                                                        placeholder="1BM22CS001"
                                                        value={participant.student_id}
                                                        onChange={(e) => updateParticipant(index, 'student_id', e.target.value)}
                                                        required
                                                    />
                                                    {(errors as any)[`participants.${index}.student_id`] && (
                                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                            {(errors as any)[`participants.${index}.student_id`]}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="space-y-2">
                                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/40">Email</label>
                                                    <input
                                                        type="email"
                                                        className="neon-input"
                                                        placeholder="member@example.com"
                                                        value={participant.email}
                                                        onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                                                        required
                                                    />
                                                    {(errors as any)[`participants.${index}.email`] && (
                                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                            {(errors as any)[`participants.${index}.email`]}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Phone */}
                                                <div className="space-y-2">
                                                    <label className="font-orbitron block text-[9px] uppercase tracking-widest text-white/40">Phone</label>
                                                    <input
                                                        type="tel"
                                                        inputMode="numeric"
                                                        pattern="[0-9]{10}"
                                                        title="Phone number must be exactly 10 digits"
                                                        className="neon-input"
                                                        placeholder="9876543210"
                                                        value={participant.phone}
                                                        onChange={(e) => updateParticipant(index, 'phone', e.target.value)}
                                                        required
                                                    />
                                                    {(errors as any)[`participants.${index}.phone`] && (
                                                        <p className="font-orbitron text-[9px] uppercase tracking-wider" style={{ color: '#ff6b6b' }}>
                                                            {(errors as any)[`participants.${index}.phone`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Remove button */}
                                            {data.participants.length > event.min && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeParticipant(index)}
                                                    className="absolute -right-2.5 -top-2.5 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:cursor-pointer"
                                                    style={{
                                                        background: '#0B0B0F',
                                                        borderColor: 'rgba(255,0,0,0.3)',
                                                        color: '#ff6b6b',
                                                    }}
                                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,0,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B0B0F'; (e.currentTarget as HTMLElement).style.color = '#ff6b6b'; }}
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Pay row ──────────────────────── */}
                            <div
                                className="flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row"
                                style={{ borderColor: 'rgba(124,58,237,0.15)' }}
                            >
                                <div>
                                    <p className="font-orbitron mb-1 text-[9px] uppercase tracking-widest text-white/35">
                                        Payable Amount
                                    </p>
                                    <div
                                        className="font-bebas text-4xl"
                                        style={{ color: '#7C3AED', textShadow: '0 0 15px #7C3AED' }}
                                    >
                                        ₹{parseFloat(event.price).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-neon btn-neon-purple w-full md:w-auto"
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