<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Politics', 'description' => 'Political news and analysis across Africa'],
            ['name' => 'Economy', 'description' => 'Economic developments and business news'],
            ['name' => 'Culture', 'description' => 'Arts, music, and cultural stories'],
            ['name' => 'Features', 'description' => 'In-depth feature articles and long reads'],
            ['name' => 'Investigations', 'description' => 'Investigative journalism and exposés'],
            ['name' => 'Health', 'description' => 'Healthcare and public health news'],
            ['name' => 'Technology', 'description' => 'Tech innovation and digital transformation'],
            ['name' => 'World', 'description' => 'International news affecting Africa'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
