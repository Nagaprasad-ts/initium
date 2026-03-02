<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->sentence(3);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['individual', 'group', 'both']),
            'venue' => $this->faker->company(),
            'event_start_date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'event_end_date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
            'price' => $this->faker->randomFloat(2, 10, 100),
            'min' => 1,
            'max' => $this->faker->numberBetween(2, 5),
            'max_participants' => $this->faker->numberBetween(10, 100),
            'banner_image' => 'https://via.placeholder.com/1200x600',
            'is_active' => true,
        ];
    }
}
