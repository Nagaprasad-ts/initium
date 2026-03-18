/* ═══════════════════════════════════════════════════════════════
   constants/index.ts
   Shared types, constants, and helpers for Initium 2026
   ═══════════════════════════════════════════════════════════════ */

/* ─── Types ─────────────────────────────────────────────────── */
export interface Category {
    id: number;
    name: string;
}

export interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    category_id: number;
    category: Category;
    type: 'individual' | 'group' | 'duo';
    venue: string;
    event_start_date: string;
    start_time: string;
    end_time: string;
    price: string;
    first_price: string;
    max_participants: number;
    min: number | null;
    max: number | null;
    banner_image_events_page: string | null;
}

/* ─── Category colors ────────────────────────────────────────── */
export const CATEGORY_COLORS: Record<string, string> = {
    LITCLUB:     '#FF0080',
    ARTCLUB:     '#FFD700',
    MUSICCLUB:   '#00F5FF',
    MEDIACLUB:   '#7C3AED',
    FASHIONCLUB: '#FF6B35',
    DANCECLUB:   '#00FF88',
};

export const DEFAULT_COLOR = '#FF0080';

/* Neon palette used for coordinator cards */
export const NEON_PALETTE: string[] = [
    '#FF0080',
    '#00F5FF',
    '#FFD700',
    '#7C3AED',
    '#00FF88',
    '#FF6B35',
];

/* ─── Display helpers ────────────────────────────────────────── */

/** "LITCLUB" → "Lit Club" */
export const CATEGORY_LABELS: Record<string, string> = {
    LITCLUB:     'Lit Club',
    ARTCLUB:     'Art Club',
    MUSICCLUB:   'Music Club',
    MEDIACLUB:   'Media Club',
    FASHIONCLUB: 'Fashion Club',
    DANCECLUB:   'Dance Club',
};

export const formatCategoryName = (name: string): string =>
    CATEGORY_LABELS[name] ?? name;

/** "2026-05-20" → "20.05.2026" */
export const formatDate = (date: string): string => {
    const d = new Date(date);
    return [
        String(d.getDate()).padStart(2, '0'),
        String(d.getMonth() + 1).padStart(2, '0'),
        d.getFullYear(),
    ].join('.');
};

/** "09:00:00" → "9:00 AM" */
export const formatTime = (t: string): string => {
    const [h, m] = t.split(':');
    const hour = parseInt(h, 10);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

/** "₹4000" with locale commas */
export const formatPrice = (value: string | number): string =>
    `₹${parseFloat(String(value)).toLocaleString('en-IN')}`;

export const TYPE_LABELS: Record<string, string> = {
    individual: 'Solo',
    duo:        'Duo',
    group:      'Group',
};

/* ─── Contact page data ──────────────────────────────────────── */
export const CORE_TEAM = [
    { name: 'Aditya P V',        phone: '+91 99024 14459' },
    { name: 'Arya Singh',         phone: '+91 81478 30510' },
    { name: 'Rushil S',           phone: '+91 97410 62736' },
    { name: 'Sudhindra D',        phone: '+91 91132 36142' },
    { name: 'Deekshitha Ganiga',  phone: '+91 84318 47458' },
    { name: 'Adithya Menon',      phone: '+91 96325 06561' },
    { name: 'Niveditha',          phone: '+91 94825 98101' },
    { name: 'Adrian Brine',       phone: '+91 82770 59223' },
    { name: 'Siddhant Paradkar',  phone: '+91 72596 93997' },
    { name: 'Ashvin Sam Suraj',   phone: '+91 96207 83504' },
    { name: 'Shreya R Varur',     phone: '+91 89044 08234' },
    { name: 'Darshan D M',        phone: '+91 78991 94234' },
    { name: 'Megha',              phone: '+91 96506 19969' },
    { name: 'Sharanya',           phone: '+91 90356 86087' },
];

export const EVENT_COORDINATORS = [
    { event: 'Viva La Voice',          coords: ['Sudhamshu D: +91 97316 90773', 'Naveen J: +91 78929 15699'] },
    { event: 'IPL Auction',            coords: ['Aadish Elijah R: +91 99026 12533', 'Shivani Handral: +91 93532 59007'] },
    { event: 'Skyfall',                coords: ['Sudhindra: +91 91132 36142', 'Malavika: +91 63646 76834'] },
    { event: 'The Late Night Special', coords: ['Monal: +91 77955 48439', 'Dhanya: +91 96861 25738'] },
    { event: 'Stack Your Luck',        coords: ['Pramod R: 9880970528', 'Vishwanath K: 9110649772'] },
    { event: 'Group Groove',           coords: ['Aakash V: +91 78998 82361', 'Aden Godly: +91 80736 67219'] },
    { event: 'The Silver Spotlight',   coords: ['Sachin Sharan: +91 79750 43982', 'Sreesha Sajesh: +91 62381 41538'] },
    { event: 'Clash of Kings',         coords: ['Jeetesh: 9886420994'] },
    { event: 'BGNS',                   coords: ['Vilasini: 9606644486'] },
    { event: 'The Reel Deal',          coords: ['Joshitha: 7619607360'] },
    { event: 'Two of a Kind',          coords: ['Sriharsha: 9845689877', 'Tejashwani: 8123580593'] },
    { event: 'All-in Showdown',        coords: ['Adithya: 9632506561', 'Sneha: 7204025137'] },
    { event: 'Sin City Silhouettes',   coords: ['Lalitha: 6364536488'] },
];

export const STALL_CONTACTS = [
    { name: 'Aditya P V',  phone: '+91 99024 14459' },
    { name: 'Arya Singh',  phone: '+91 81478 30510' },
    { name: 'Rushil S',    phone: '+91 97410 62736' },
    { name: 'Sudhindra D', phone: '+91 91132 36142' },
];

export const VENUE_INFO = [
    {
        icon: '📍',
        label: 'VENUE',
        value: 'New Horizon Knowledge Park, Outer Ring Road, Near Bellandur, Bengaluru 560103',
    },
    {
        icon: '📧',
        label: 'EMAIL',
        value: 'initium@newhorizonindia.edu',
    },
    {
        icon: '📞',
        label: 'PHONE',
        value: '+91 99024 14459 | +91 81478 30510',
    },
];

export const CATEGORY_IMAGES: Record<string, string> = {
    LITCLUB:     '/images/lit-club.png',
    ARTCLUB:     '/images/art-club.png',
    MUSICCLUB:   '/images/music-club.png',
    MEDIACLUB:   '/images/media-club.png',
    FASHIONCLUB: '/images/fashion-club.png',
    DANCECLUB:   '/images/dance-club.png',
};