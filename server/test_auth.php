<?php

require_once 'bootstrap/app.php';

use App\Models\Admin;

echo "=== Testing Admin Authentication ===\n";

// Find the admin user
$admin = Admin::where('username', 'RMD_Staff')->first();

if ($admin) {
    echo "✅ Found user: " . $admin->username . "\n";
    echo "📧 Email: " . $admin->email . "\n";
    echo "🔑 Password Hash: " . substr($admin->password, 0, 50) . "...\n";

    // Test password verification
    $testPassword = 'rmd@admin';
    $isValid = password_verify($testPassword, $admin->password);

    echo "🔍 Testing password '$testPassword': " . ($isValid ? "✅ VALID" : "❌ INVALID") . "\n";

    if (!$isValid) {
        echo "⚠️  Password hash might be incorrect. Regenerating...\n";
        $newHash = bcrypt($testPassword);
        echo "🔑 New hash would be: " . substr($newHash, 0, 50) . "...\n";
    }
} else {
    echo "❌ Admin user 'RMD_Staff' not found!\n";
    echo "📋 Available users:\n";
    $admins = Admin::all();
    foreach ($admins as $admin) {
        echo "   - " . $admin->username . " (" . $admin->email . ")\n";
    }
}

echo "\n=== Testing API Authentication ===\n";

// Test the actual login logic
$request_data = [
    'username' => 'RMD_Staff',
    'password' => 'rmd@admin'
];

echo "🔍 Testing with data: " . json_encode($request_data) . "\n";

// Simulate the controller logic
$admin = Admin::where('username', $request_data['username'])
             ->orWhere('email', $request_data['username'])
             ->first();

if ($admin) {
    echo "✅ User found in database\n";
    $passwordMatch = \Illuminate\Support\Facades\Hash::check($request_data['password'], $admin->password);
    echo "🔑 Password match: " . ($passwordMatch ? "✅ YES" : "❌ NO") . "\n";
} else {
    echo "❌ User not found with username/email: " . $request_data['username'] . "\n";
}
