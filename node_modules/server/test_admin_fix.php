<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

echo "=== TESTING ADMIN AUTHENTICATION ===\n\n";

// Test if admin table exists and has data
try {
    $admins = Admin::all();
    echo "✅ Admin table exists with " . $admins->count() . " records\n\n";

    foreach ($admins as $admin) {
        echo "ID: {$admin->id}\n";
        echo "Username: {$admin->username}\n";
        echo "Email: {$admin->email}\n";
        echo "Full Name: {$admin->full_name}\n";

        // Test password verification
        $passwordTest = Hash::check('rmd@admin', $admin->password);
        echo "Password 'rmd@admin': " . ($passwordTest ? "✅ VALID" : "❌ INVALID") . "\n";
        echo "---\n";
    }

    // Test finding admin by username
    $testAdmin = Admin::where('username', 'RMD_Staff')->first();
    if ($testAdmin) {
        echo "\n✅ Found RMD_Staff admin\n";
        echo "Email: {$testAdmin->email}\n";
        echo "Password hash: {$testAdmin->password}\n";

        $passwordCheck = Hash::check('rmd@admin', $testAdmin->password);
        echo "Password verification: " . ($passwordCheck ? "✅ SUCCESS" : "❌ FAILED") . "\n";
    } else {
        echo "\n❌ RMD_Staff admin not found\n";
    }

} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";

    // Try to create the table and seed it
    echo "\nTrying to fix the issue...\n";

    try {
        // Run migration
        echo "Running migrations...\n";
        Artisan::call('migrate', ['--force' => true]);
        echo "Migration result: " . Artisan::output() . "\n";

        // Run seeder
        echo "Running AdminSeeder...\n";
        Artisan::call('db:seed', ['--class' => 'AdminSeeder', '--force' => true]);
        echo "Seeder result: " . Artisan::output() . "\n";

        echo "✅ Fixed! Try the authentication again.\n";

    } catch (Exception $fixError) {
        echo "❌ Fix failed: " . $fixError->getMessage() . "\n";
    }
}
