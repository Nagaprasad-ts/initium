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
                handler: function (paymentResponse: any) {
                    router.visit(
                        `/registration/success/${response.data.registration_id}`,
                    );
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
            <Head
                title={`Group Registration for ${event.name} | Initium 2026`}
            />

            <section className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="mb-8">
                        <Link
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-gray-500 uppercase transition-colors hover:text-purple-600"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                ></path>
                            </svg>
                            Back to Event
                        </Link>
                    </div>

                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-block rounded-lg bg-purple-100 px-4 py-2 text-xs font-black tracking-widest text-purple-700 uppercase">
                            Group Registration
                        </div>
                        <h1 className="mb-2 text-4xl font-black text-gray-900">
                            {event.name}
                        </h1>
                        {event.type === 'both' && (
                            <p className="mt-4 text-sm font-medium text-gray-500">
                                Need to register individually?{' '}
                                <Link
                                    href={`/registration/individual/${event.slug}`}
                                    className="font-bold text-purple-600 hover:underline"
                                >
                                    Switch to Individual Registration
                                </Link>
                            </p>
                        )}
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-purple-600/5 md:p-12">
                        <form onSubmit={submit} className="space-y-12">
                            {/* Team Basic Info */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-black tracking-widest text-gray-900 uppercase">
                                        Team Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 font-medium transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                                        placeholder="Enter your team name"
                                        value={data.team_name}
                                        onChange={(e) =>
                                            setData('team_name', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.team_name && (
                                        <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                            {errors.team_name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black tracking-widest text-gray-900 uppercase">
                                        College Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 font-medium transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                                        placeholder="Your College Name"
                                        value={data.college_name}
                                        onChange={(e) =>
                                            setData(
                                                'college_name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {errors.college_name && (
                                        <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                            {errors.college_name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black tracking-widest text-gray-900 uppercase">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 font-medium transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                                        placeholder="Enter your email"
                                        value={data.contact_email}
                                        onChange={(e) =>
                                            setData(
                                                'contact_email',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {errors.contact_email && (
                                        <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                            {errors.contact_email}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black tracking-widest text-gray-900 uppercase">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 font-medium transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                                        placeholder="Enter your phone number"
                                        value={data.contact_phone}
                                        onChange={(e) =>
                                            setData(
                                                'contact_phone',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {errors.contact_phone && (
                                        <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                            {errors.contact_phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Participant List */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-gray-900">
                                        Team Participants
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addParticipant}
                                        disabled={
                                            !!(
                                                event.max &&
                                                data.participants.length >=
                                                    event.max
                                            )
                                        }
                                        className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        + Add Member
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {data.participants.map(
                                        (participant, index) => (
                                            <div
                                                key={index}
                                                className="group/p relative rounded-2xl border border-gray-100 bg-gray-50 p-6"
                                            >
                                                <p className='font-bold text-gray-800 text-md pb-3'>Member {index + 1}</p>
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium border-2 border-gray-300 transition-all focus:ring-4 focus:ring-purple-500/10"
                                                            value={
                                                                participant.name
                                                            }
                                                            onChange={(e) =>
                                                                updateParticipant(
                                                                    index,
                                                                    'name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {(errors as any)[
                                                            `participants.${index}.name`
                                                        ] && (
                                                            <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                                                {
                                                                    (
                                                                        errors as any
                                                                    )[
                                                                        `participants.${index}.name`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                                            ID/USN
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium border-2 border-gray-300 transition-all focus:ring-4 focus:ring-purple-500/10"
                                                            value={
                                                                participant.student_id
                                                            }
                                                            onChange={(e) =>
                                                                updateParticipant(
                                                                    index,
                                                                    'student_id',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {(errors as any)[
                                                            `participants.${index}.student_id`
                                                        ] && (
                                                            <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                                                {
                                                                    (
                                                                        errors as any
                                                                    )[
                                                                        `participants.${index}.student_id`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium border-2 border-gray-300 transition-all focus:ring-4 focus:ring-purple-500/10"
                                                            value={
                                                                participant.email
                                                            }
                                                            onChange={(e) =>
                                                                updateParticipant(
                                                                    index,
                                                                    'email',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {(errors as any)[
                                                            `participants.${index}.email`
                                                        ] && (
                                                            <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                                                {
                                                                    (
                                                                        errors as any
                                                                    )[
                                                                        `participants.${index}.email`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                                            Phone
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            inputMode="numeric"
                                                            pattern="[0-9]{10}"
                                                            maxLength={10}
                                                            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium border-2 border-gray-300 transition-all focus:ring-4 focus:ring-purple-500/10"
                                                            value={
                                                                participant.phone
                                                            }
                                                            onChange={(e) =>
                                                                updateParticipant(
                                                                    index,
                                                                    'phone',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {(errors as any)[
                                                            `participants.${index}.phone`
                                                        ] && (
                                                            <p className="mt-1 text-xs font-bold tracking-wider text-red-500 uppercase">
                                                                {
                                                                    (
                                                                        errors as any
                                                                    )[
                                                                        `participants.${index}.phone`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {data.participants.length >
                                                    event.min && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeParticipant(
                                                                index,
                                                            )
                                                        }
                                                        className="absolute -top-2 -right-2 flex items-center justify-center rounded-full border-2 border-gray-200 bg-white p-3 text-red-500 shadow-lg transition-all duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-between gap-8 border-t border-gray-100 pt-8 md:flex-row">
                                <div>
                                    <p className="mb-1 text-sm font-black tracking-widest text-gray-400 uppercase">
                                        Payable Amount
                                    </p>
                                    <div className="text-3xl font-black text-gray-900">
                                        ₹
                                        {parseFloat(
                                            event.price,
                                        ).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-gray-900 px-12 py-5 font-black text-white shadow-xl shadow-black/10 transition-all hover:bg-black disabled:bg-gray-400 md:w-auto"
                                >
                                    {processing
                                        ? 'PROCESSING...'
                                        : 'PROCEED TO PAY'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
