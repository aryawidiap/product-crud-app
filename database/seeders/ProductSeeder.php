<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'title' => 'Acan Dry Cat Food 500 g Tuna Flavor',
            'description' => 'Tasty kibbles with complete nutrients for your cat.',
            'price' => 50000,
        ]);
        Product::create([
            'title' => 'Acan Dry Cat Food 500 g Chicken Flavor',
            'description' => 'Tasty kibbles with complete nutrients for your cat.',
            'price' => 50000,
        ]);
        Product::create([
            'title' => 'Dunal Dry Dog Food 500 g Beef Flavor',
            'description' => 'Tasty kibbles with complete nutrients for your dog.',
            'price' => 60000,
        ]);
        Product::create([
            'title' => 'Dunal Dry Dog Food 1 kg Beef Flavor',
            'description' => 'Tasty kibbles with complete nutrients for your dog. Now in larger package, more economical!',
            'price' => 105000,
        ]);
        Product::create([
            'title' => 'Adung Cat Litter 10 L Lavender Scent',
            'description' => 'Clumps completely, less odor, less dust.',
            'price' => 120000,
        ]);
    }
}
