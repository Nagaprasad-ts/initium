<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { background: #0b0b0f; color: #fff; font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
        .header { text-align: center; margin-bottom: 32px; }
        .title { font-size: 36px; letter-spacing: 4px; color: #FFD700; margin: 0; }
        .subtitle { font-size: 13px; letter-spacing: 3px; color: rgba(255,255,255,0.5); margin-top: 6px; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,215,0,0.2); border-radius: 12px; padding: 28px; margin-bottom: 24px; }
        .label { font-size: 11px; letter-spacing: 3px; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 4px; }
        .value { font-size: 18px; color: #fff; margin-bottom: 16px; }
        .event-name { font-size: 22px; color: #FF0080; letter-spacing: 2px; }
        .prize { font-size: 28px; color: #FFD700; }
        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0; }
        .footer { text-align: center; font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 32px; }
        .member { font-size: 15px; color: rgba(255,255,255,0.75); margin-bottom: 6px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p class="title">INITIUM 2026</p>
            <p class="subtitle">LAS VEGAS EDITION — REGISTRATION CONFIRMED</p>
        </div>

        <div class="card">
            <p class="label">Registered For</p>
            <p class="event-name">{{ $registration->event->name }}</p>

            <hr class="divider">

            @if($registration->registration_type === 'individual')
                <p class="label">Name</p>
                <p class="value">{{ $registration->participants->first()->name }}</p>

                <p class="label">Student ID</p>
                <p class="value">{{ $registration->participants->first()->student_id }}</p>
            @else
                <p class="label">Team Name</p>
                <p class="value">{{ $registration->team_name }}</p>

                <p class="label">Members</p>
                @foreach($registration->participants as $member)
                    <p class="member">{{ $member->name }} — {{ $member->student_id }}</p>
                @endforeach
            @endif

            <hr class="divider">

            <p class="label">College</p>
            <p class="value">{{ $registration->college_name }}</p>

            <p class="label">Contact Email</p>
            <p class="value">{{ $registration->contact_email }}</p>

            <p class="label">Contact Phone</p>
            <p class="value">{{ $registration->contact_phone }}</p>

            <hr class="divider">

            <p class="label">Event Type</p>
            <p class="value">{{ ucfirst($registration->event->type) }}</p>

            <p class="label">Entry Fee Paid</p>
            <p class="value">₹{{ number_format($registration->event->price, 0) }}</p>

            <p class="label">1st Prize</p>
            <p class="prize">₹{{ number_format($registration->event->first_price, 0) }}</p>
        </div>

        <div class="card">
            <p class="label">Venue</p>
            <p class="value">New Horizon College of Engineering<br>Outer Ring Road, Bengaluru — 560103</p>

            <p class="label">Date</p>
            <p class="value">May 20, 2026</p>
        </div>

        <div class="footer">
            <p>Questions? Contact us at websupport@newhorizonindia.edu</p>
            <p style="margin-top: 8px;">© 2026 Initium — New Horizon College of Engineering</p>
        </div>
    </div>
</body>
</html>