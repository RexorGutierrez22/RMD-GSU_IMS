<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

echo "=== CHECKING ADMIN TABLE ===\n";

$admins = Admin::all();
echo "Total admins in database: " . $admins->count() . "\n\n";

foreach ($admins as $admin) {
    echo "ID: {$admin->id}\n";
    echo "Username: {$admin->username}\n";
    echo "Email: {$admin->email}\n";
    echo "Full Name: {$admin->full_name}\n";
    echo "Password Hash: {$admin->password}\n";
    echo "Created: {$admin->created_at}\n";
    echo "Updated: {$admin->updated_at}\n";
    echo "---\n";
}

echo "\n=== TESTING PASSWORD VERIFICATION ===\n";
$testUser = Admin::where('username', 'RMD_Staff')->first();
if ($testUser) {
    echo "Testing RMD_Staff password:\n";
    $isValid = Hash::check('rmd@admin', $testUser->password);
    echo "Password 'rmd@admin' is: " . ($isValid ? "✅ VALID" : "❌ INVALID") . "\n";

    // Test other common passwords
    $testPasswords = ['admin', 'rmdadmin', 'RMD@admin', 'rmd@Admin'];
    foreach ($testPasswords as $pwd) {
        $isValid = Hash::check($pwd, $testUser->password);
        echo "Password '$pwd' is: " . ($isValid ? "✅ VALID" : "❌ INVALID") . "\n";
    }
} else {
    echo "❌ RMD_Staff user not found!\n";
}
