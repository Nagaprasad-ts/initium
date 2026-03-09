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
        .footer { text-align: center; font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 32px; }
        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0; }
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
            <p class="event-name">{{ $participant->event->name }}</p>

            <hr class="divider">

            <p class="label">Name</p>
            <p class="value">{{ $participant->name }}</p>

            <p class="label">Email</p>
            <p class="value">{{ $participant->email }}</p>

            <p class="label">Team Type</p>
            <p class="value">{{ ucfirst($participant->event->type) }}</p>

            <hr class="divider">

            <p class="label">Entry Fee Paid</p>
            <p class="value">₹{{ number_format($participant->event->price, 0) }}</p>

            <p class="label">1st Prize</p>
            <p class="prize">₹{{ number_format($participant->event->first_price, 0) }}</p>
        </div>

        <div class="card">
            <p class="label">Venue</p>
            <p class="value">New Horizon College of Engineering<br>Outer Ring Road, Bengaluru — 560103</p>

            <p class="label">Date</p>
            <p class="value">May 20, 2026</p>
        </div>

        <div class="footer">
            <p>Questions? Reply to this email or contact us at websupport@newhorizonindia.edu</p>
            <p style="margin-top: 8px;">© 2026 Initium — New Horizon College of Engineering</p>
        </div>
    </div>
</body>
</html>