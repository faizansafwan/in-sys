<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->insert([
            ['name' => 'Candy', 'description' => 'Sweet and chewy treat perfect for kids and adults alike.', 'price' => 1200, 'quantity' => 5, 'category_id' => 2, 'status' => 'Active', 'created_at' => now()],
            ['name' => 'Juice', 'description' => 'Refreshing fruit beverage packed with natural flavors.', 'price' => 20, 'quantity' => 10, 'category_id' => 3, 'status' => 'Active', 'created_at' => now()],
            ['name' => 'Bread', 'description' => 'Soft, freshly baked loaf ideal for sandwiches or toast.', 'price' => 15, 'quantity' => 8, 'category_id' => 1, 'status' => 'Inactive', 'created_at' => now()],
            ['name' => 'tea', 'description' => 'Aromatic tea leaves for a calming and energizing drink.', 'price' => 50, 'quantity' => 6, 'category_id' => 3, 'status' => 'Active', 'created_at' => now()],
            ['name' => 'rolls', 'description' => 'Fluffy bread rolls, perfect as a side or quick snack.', 'price' => 40, 'quantity' => 7, 'category_id' => 1, 'status' => 'Active', 'created_at' => now()],
        ]);
        
    }
}
