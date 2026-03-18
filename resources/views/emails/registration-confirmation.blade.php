<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmed — Initium 2026</title>
</head>
<body style="margin:0;padding:0;background:#0b0b0f;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0f;">
<tr><td align="center" style="padding:32px 16px;">

    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        {{-- ── HEADER ── --}}
        <tr>
            <td style="background:linear-gradient(135deg,#1a0a2e 0%,#0d0d1a 50%,#0a1a1a 100%);border-radius:20px 20px 0 0;overflow:hidden;">
                <div style="height:3px;background:linear-gradient(90deg,#FF0080,#7C3AED,#00F5FF,#FFD700,#FF0080);"></div>

                <div style="padding:40px 40px 20px;text-align:center;">
                    <p style="margin:0;font-size:52px;letter-spacing:10px;color:#FFD700;font-weight:900;text-transform:uppercase;line-height:1;">INITIUM</p>
                    <p style="margin:6px 0 0;font-size:12px;letter-spacing:6px;color:rgba(255,255,255,0.4);text-transform:uppercase;">2026 &nbsp;·&nbsp; LAS VEGAS EDITION</p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                        <tr>
                            <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,215,0,0.5),transparent);"></td>
                        </tr>
                    </table>

                    <div style="display:inline-block;background:rgba(0,245,255,0.08);border:1px solid rgba(0,245,255,0.35);border-radius:50px;padding:12px 32px;">
                        <p style="margin:0;font-size:11px;letter-spacing:5px;color:#00F5FF;text-transform:uppercase;">✦ &nbsp; Registration Confirmed &nbsp; ✦</p>
                    </div>
                </div>

                {{-- Event Banner --}}
                @if($registration->event->banner_image_events_page)
                <div style="padding:0 40px;">
                    <div style="border-radius:14px;overflow:hidden;border:1px solid rgba(255,0,128,0.25);">
                        <img src="{{ asset('storage/' . $registration->event->banner_image_events_page) }}"
                             alt="{{ $registration->event->name }}"
                             width="100%"
                             style="width:100%;height:200px;object-fit:cover;display:block;">
                    </div>
                </div>
                @endif

                {{-- Event Title --}}
                <div style="padding:24px 40px 36px;text-align:center;">
                    <p style="margin:0;font-size:11px;letter-spacing:5px;color:#FF0080;text-transform:uppercase;">{{ strtoupper($registration->event->category->name ?? 'Event') }}</p>
                    <p style="margin:8px 0 0;font-size:30px;letter-spacing:3px;color:#fff;font-weight:900;text-transform:uppercase;line-height:1.2;">{{ $registration->event->name }}</p>
                </div>
            </td>
        </tr>

        {{-- ── PARTICIPANT DETAILS ── --}}
        <tr>
            <td style="background:#0f0f18;padding:20px 24px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,0,128,0.2);border-radius:16px;overflow:hidden;">
                    <tr>
                        <td>
                            <div style="background:rgba(255,0,128,0.07);border-bottom:1px solid rgba(255,0,128,0.2);padding:14px 28px;">
                                <p style="margin:0;font-size:10px;letter-spacing:4px;color:#FF0080;text-transform:uppercase;">👤 &nbsp;Participant Details</p>
                            </div>
                            <div style="padding:24px 28px;">

                                @if($registration->registration_type === 'individual')
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td width="100%" style="padding-bottom:16px;vertical-align:top;">
                                                <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Name</p>
                                                <p style="margin:0;font-size:17px;color:#fff;font-weight:700;">{{ $registration->participants->first()->name }}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="100%" style="padding-bottom:16px;vertical-align:top;">
                                                <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Student ID</p>
                                                <p style="margin:0;font-size:17px;color:#fff;font-weight:700;">{{ $registration->participants->first()->student_id }}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="100%" style="vertical-align:top;">
                                                <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Email</p>
                                                <p style="margin:0;font-size:14px;color:#00F5FF;">{{ $registration->participants->first()->email }}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="100%" style="vertical-align:top;">
                                                <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Phone</p>
                                                <p style="margin:0;font-size:15px;color:#fff;font-weight:600;">{{ $registration->participants->first()->phone }}</p>
                                            </td>
                                        </tr>
                                    </table>

                                @else
                                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Team Name</p>
                                    <p style="margin:0 0 20px;font-size:22px;color:#FF0080;font-weight:800;letter-spacing:1px;">{{ $registration->team_name }}</p>

                                    <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Team Members</p>

                                    @foreach($registration->participants as $i => $member)
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;overflow:hidden;">
                                        <tr>
                                            <td width="44" style="padding:14px 0 14px 14px;vertical-align:top;">
                                                <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,0,128,0.15);border:1px solid rgba(255,0,128,0.4);text-align:center;line-height:28px;font-size:12px;color:#FF0080;font-weight:700;">{{ $i+1 }}</div>
                                            </td>
                                            <td style="padding:14px 14px 14px 8px;vertical-align:top;">
                                                <p style="margin:0 0 2px;font-size:16px;color:#fff;font-weight:700;">{{ $member->name }}</p>
                                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">
                                                    <tr>
                                                        <td width="100%" style="vertical-align:top;">
                                                            <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Student ID</p>
                                                            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);">{{ $member->student_id }}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" style="vertical-align:top;">
                                                            <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Phone</p>
                                                            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);">{{ $member->phone }}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="padding-top:6px;vertical-align:top;">
                                                            <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Email</p>
                                                            <p style="margin:0;font-size:13px;color:#00F5FF;">{{ $member->email }}</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    @endforeach
                                @endif

                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        {{-- ── REGISTRATION INFO ── --}}
        <tr>
            <td style="background:#0f0f18;padding:16px 24px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(124,58,237,0.2);border-radius:16px;overflow:hidden;">
                    <tr>
                        <td>
                            <div style="background:rgba(124,58,237,0.07);border-bottom:1px solid rgba(124,58,237,0.2);padding:14px 28px;">
                                <p style="margin:0;font-size:10px;letter-spacing:4px;color:#7C3AED;text-transform:uppercase;">🎓 &nbsp;Registration Info</p>
                            </div>
                            <div style="padding:24px 28px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="100%" style="padding-bottom:16px;vertical-align:top;">
                                            <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">College</p>
                                            <p style="margin:0;font-size:15px;color:#fff;font-weight:600;">{{ $registration->college_name }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" style="padding-bottom:16px;vertical-align:top;">
                                            <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Registration Type</p>
                                            <p style="margin:0;font-size:15px;color:#fff;font-weight:600;">{{ ucfirst($registration->registration_type) }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" style="vertical-align:top;">
                                            <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Contact Email</p>
                                            <p style="margin:0;font-size:14px;color:#00F5FF;">{{ $registration->contact_email }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" style="vertical-align:top;">
                                            <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Contact Phone</p>
                                            <p style="margin:0;font-size:15px;color:#fff;font-weight:600;">{{ $registration->contact_phone }}</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        {{-- ── PAYMENT ── --}}
        <tr>
            <td style="background:#0f0f18;padding:16px 24px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background:rgba(0,245,255,0.05);border:1px solid rgba(0,245,255,0.25);border-radius:16px;padding:24px;text-align:center;vertical-align:middle;">
                            <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Entry Fee Paid</p>
                            <p style="margin:0;font-size:40px;color:#00F5FF;font-weight:900;">₹{{ number_format($registration->event->price, 0) }}</p>
                            <p style="margin:8px 0 0;font-size:10px;letter-spacing:3px;color:rgba(0,245,255,0.55);text-transform:uppercase;">✓ &nbsp; Payment Confirmed</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        {{-- ── VENUE ── --}}
        <tr>
            <td style="background:#0f0f18;padding:16px 24px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,rgba(255,0,128,0.06),rgba(124,58,237,0.06));border:1px solid rgba(255,255,255,0.07);border-radius:16px;">
                    <tr>
                        <td style="padding:28px;text-align:center;">
                            <p style="margin:0 0 10px;font-size:10px;letter-spacing:4px;color:rgba(255,255,255,0.3);text-transform:uppercase;">📍 Venue &amp; Date</p>
                            <p style="margin:0 0 4px;font-size:18px;color:#fff;font-weight:700;">{{ $registration->event->venue }}</p>
                            <p style="margin:0 0 16px;font-size:13px;color:rgba(255,255,255,0.45);">New Horizon College of Engineering, Bengaluru — 560103</p>
                            <div style="display:inline-block;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.3);border-radius:50px;padding:10px 28px;">
                                <p style="margin:0;font-size:14px;color:#FFD700;font-weight:700;letter-spacing:3px;">
                                    {{ \Carbon\Carbon::parse($registration->event->event_start_date)->format('d-m-y') }}
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        {{-- ── WHATSAPP ── --}}
        @if($registration->event->whatsapp_link)
        <tr>
            <td style="background:#0f0f18;padding:16px 24px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.25);border-radius:16px;overflow:hidden;">
                    <tr>
                        <td style="padding:24px 28px;text-align:center;">
                            <p style="margin:0 0 6px;font-size:10px;letter-spacing:4px;color:rgba(37,211,102,0.8);text-transform:uppercase;">💬 &nbsp; Join the WhatsApp Group</p>
                            <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.55);">Stay updated with event announcements and important info</p>
                            <a href="{{ $registration->event->whatsapp_link }}"
                               style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:50px;">
                                JOIN GROUP →
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        @endif

        {{-- ── FOOTER ── --}}
        <tr>
            <td style="background:linear-gradient(135deg,#1a0a2e 0%,#0d0d1a 100%);border-radius:0 0 20px 20px;overflow:hidden;padding-top:24px;">
                <div style="height:2px;background:linear-gradient(90deg,#FF0080,#7C3AED,#00F5FF,#FFD700,#FF0080);"></div>
                <div style="padding:28px 40px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.35);">Questions? Reach us at</p>
                    <p style="margin:0 0 16px;font-size:13px;color:#00F5FF;">initium@newhorizonindia.edu</p>
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.18);letter-spacing:2px;text-transform:uppercase;">© 2026 Initium · New Horizon College of Engineering</p>
                </div>
            </td>
        </tr>

    </table>
</td></tr>
</table>

</body>
</html>