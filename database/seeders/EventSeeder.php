<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Event;
use App\Models\Category;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // ── Resolve categories by name (seeded by CategorySeeder) ─────
        $categories = Category::whereIn('name', [
            'LITCLUB', 'ARTCLUB', 'MUSICCLUB', 'MEDIACLUB', 'FASHIONCLUB', 'DANCECLUB',
        ])->pluck('id', 'name');

        // ── Event data ────────────────────────────────────────────────
        $events = [

            // ── LIT CLUB ─────────────────────────────────────────────
            [
                'name'             => 'Viva La Voice',
                'description'      => '<p>A solo declamation event where you recreate powerful speeches by famous historical figures, including athletes, politicians, and actors, celebrating impactful moments from history through oration.</p>',
                'category'         => 'LITCLUB',
                'type'             => 'individual',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '12:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 50,
            ],
            [
                'name'             => 'IPL Auction',
                'description'      => '<p>Experience the excitement of an IPL Mega Auction where teams strategize, bid, and compete to build the ultimate cricket squad in a thrilling group challenge.</p>',
                'category'         => 'LITCLUB',
                'type'             => 'group',
                'venue'            => 'Seminar Hall, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '10:00:00',
                'end_time'         => '13:00:00',
                'price'            => 1000.00,
                'first_price'      => 7000.00,
                'min'              => 5,
                'max'              => 5,
                'max_participants' => 100,
            ],
            [
                'name'             => 'Skyfall',
                'description'      => '<p>You\'re on a plane that\'s going down with one parachute left — and the only way to get it is to convince everyone in the room that you deserve to live more than they do.</p>',
                'category'         => 'LITCLUB',
                'type'             => 'individual',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '13:00:00',
                'end_time'         => '16:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 50,
            ],
            [
                'name'             => 'The Late Night Special',
                'description'      => '<p>Walk up, grab the mic, and do whatever it takes to make the room feel something — sing, speak, perform, or anything in between.</p>',
                'category'         => 'LITCLUB',
                'type'             => 'individual',
                'venue'            => 'Open Stage, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '16:00:00',
                'end_time'         => '19:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 60,
            ],

            // ── ART CLUB ─────────────────────────────────────────────
            [
                'name'             => 'Stack Your Luck',
                'description'      => '<p>Experience the Vegas spirit with Stack Your Luck, a thrilling paper tower challenge where teams build the tallest free-standing structure, showcasing creativity, balance, and teamwork.</p>',
                'category'         => 'ARTCLUB',
                'type'             => 'duo',
                'venue'            => 'Arts Block, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '12:00:00',
                'price'            => 400.00,
                'first_price'      => 4000.00,
                'min'              => 2,
                'max'              => 2,
                'max_participants' => 40,
            ],

            // ── MUSIC CLUB ────────────────────────────────────────────
            [
                'name'             => 'Group Groove',
                'description'      => '<p>Step into Vegas lights with Group Groove, where powerful group vocals dazzle like the Strip. From soulful ballads to chartbusters, harmonies ignite the stage in true casino-glam style.</p>',
                'category'         => 'MUSICCLUB',
                'type'             => 'group',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '13:00:00',
                'price'            => 1000.00,
                'first_price'      => 10000.00,
                'min'              => 4,
                'max'              => 10,
                'max_participants' => 100,
            ],
            [
                'name'             => 'The Silver Spotlight',
                'description'      => '<p>Under Vegas spotlight, a solo instrumentalist takes center stage. Every note shines like casino gold, blending elegance, drama, and showbiz flair into a Strip-style performance filled with glamour and magic.</p>',
                'category'         => 'MUSICCLUB',
                'type'             => 'individual',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '14:00:00',
                'end_time'         => '17:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 40,
            ],

            // ── MEDIA CLUB ────────────────────────────────────────────
            [
                'name'             => 'Clash of Kings',
                'description'      => '<p>Enter the Clash Royale arena and compete solo using strategy, skill, and smart deck choices to defeat opponents in fast-paced, thrilling battles.</p>',
                'category'         => 'MEDIACLUB',
                'type'             => 'individual',
                'venue'            => 'Computer Lab, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '13:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 64,
            ],
            [
                'name'             => 'BGMI',
                'description'      => '<p>Enter the ultimate BGMI battleground where teams compete using strategy, teamwork, and survival skills to outplay opponents and claim victory in an intense esports clash.</p>',
                'category'         => 'MEDIACLUB',
                'type'             => 'group',
                'venue'            => 'Computer Lab, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '10:00:00',
                'end_time'         => '17:00:00',
                'price'            => 1000.00,
                'first_price'      => 7000.00,
                'min'              => 4,
                'max'              => 4,
                'max_participants' => 80,
            ],
            [
                'name'             => 'The Reel Deal',
                'description'      => '<p>Create a stylish Instagram Reel with subtle Vegas vibes, showcasing creativity, storytelling, and editing skills to captivate audiences and shine under the digital spotlight.</p>',
                'category'         => 'MEDIACLUB',
                'type'             => 'individual',
                'venue'            => 'Media Lab, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '14:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 50,
            ],

            // ── FASHION CLUB ──────────────────────────────────────────
            [
                'name'             => 'Sin City Silhouettes',
                'description'      => '<p>Dark Glam blends mystery with brilliance on a high-shine runway. Dramatic tones, shimmering details, and bold silhouettes create a striking spectacle inspired by lavish nightlife, celebrating fearless elegance and unapologetic glamour in every confident step.</p>',
                'category'         => 'FASHIONCLUB',
                'type'             => 'individual',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '14:00:00',
                'end_time'         => '17:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 40,
            ],

            // ── DANCE CLUB ────────────────────────────────────────────
            [
                'name'             => 'Two of a Kind',
                'description'      => '<p>Vegas Edition brings high-stakes energy under neon lights. Sync your moves, own the rhythm, and command the spotlight. In this city of spectacle and shine, only the sharpest duo wins the jackpot.</p>',
                'category'         => 'DANCECLUB',
                'type'             => 'duo',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '09:00:00',
                'end_time'         => '13:00:00',
                'price'            => 400.00,
                'first_price'      => 6000.00,
                'min'              => 2,
                'max'              => 2,
                'max_participants' => 40,
            ],
            [
                'name'             => 'All-in Showdown',
                'description'      => '<p>Under neon lights, two dancers face off in a high-stakes 1v1 battle of skill and style. Every move is a risk, every beat a challenge — only one dominates the spotlight and claims the ultimate victory.</p>',
                'category'         => 'DANCECLUB',
                'type'             => 'individual',
                'venue'            => 'Main Auditorium, NHCE',
                'event_start_date' => '2026-05-20',
                'event_end_date'   => null,
                'start_time'       => '14:00:00',
                'end_time'         => '17:00:00',
                'price'            => 200.00,
                'first_price'      => 4000.00,
                'min'              => null,
                'max'              => null,
                'max_participants' => 50,
            ],
        ];

        // ── Insert / update events ────────────────────────────────────
        foreach ($events as $data) {
            $categoryKey = $data['category'];
            unset($data['category']);

            Event::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                array_merge($data, [
                    'slug'         => Str::slug($data['name']),
                    'category_id'  => $categories[$categoryKey],
                    'banner_image' => null,
                    'is_active'    => true,
                ])
            );
        }

        $this->command->info('✅ Seeded 13 events across 6 categories.');
    }
}