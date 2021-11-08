<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DeveloperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $gender = $this->faker->randomElement(['male', 'female']);

        $genders = [
            "male" => "M",
            "female" => "F",
        ];

        return [
            'name' => $this->faker->name($gender),
            'gender' => $genders[$gender],
            'age' => $this->faker->randomNumber(2),
            'hobby' => $this->faker->words(3, true),
            'birth_date' => $this->faker->date(),
            'created_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
