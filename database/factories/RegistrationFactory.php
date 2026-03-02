<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Event;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'registration_type' => $this->faker->randomElement(['individual', 'group']),
            'team_name' => $this->faker->words(3, true),
            'college_name' => $this->faker->company() . ' College',
            'contact_email' => $this->faker->safeEmail(),
            'contact_phone' => $this->faker->phoneNumber(),
            'total_amount' => $this->faker->randomFloat(2, 50, 500),
            'payment_id' => 'pay_' . $this->faker->bothify('??????????????'),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
        ];
    }
}
