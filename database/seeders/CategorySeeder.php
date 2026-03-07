<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'LITCLUB',
            'ARTCLUB',
            'MUSICCLUB',
            'MEDIACLUB',
            'FASHIONCLUB',
            'DANCECLUB',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
            ]);
        }
    }
}