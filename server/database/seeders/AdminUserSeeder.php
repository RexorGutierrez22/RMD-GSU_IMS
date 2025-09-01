<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create default admin user with username 'admin'
        User::firstOrCreate(
            ['email' => 'admin'],
            [
                'name' => 'Administrator',
                'email' => 'admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create default admin user
        User::firstOrCreate(
            ['email' => 'admin@rmd.usep.edu.ph'],
            [
                'name' => 'RMD Administrator',
                'email' => 'admin@rmd.usep.edu.ph',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Alternative admin account
        User::firstOrCreate(
            ['email' => 'admin@usep.edu.ph'],
            [
                'name' => 'Admin User',
                'email' => 'admin@usep.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
