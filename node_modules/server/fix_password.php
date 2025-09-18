<?php
// Simple script to update admin password
require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

echo "Updating admin password...\n";

$password = 'rmd@admin';
$hashedPassword = Hash::make($password);

echo "New hash: $hashedPassword\n";

// Update the admin user
$admin = Admin::where('username', 'RMD_Staff')->first();
if ($admin) {
    $admin->password = $hashedPassword;
    $admin->save();

    echo "✅ Password updated for user: " . $admin->username . "\n";

    // Test the password
    $testResult = Hash::check($password, $admin->password);
    echo "🔍 Password test: " . ($testResult ? "✅ VALID" : "❌ INVALID") . "\n";
} else {
    echo "❌ User RMD_Staff not found!\n";
}
