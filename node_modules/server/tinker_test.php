use App\Models\Admin;

echo "=== Testing Admin Authentication ===" . PHP_EOL;

$admin = Admin::where('username', 'RMD_Staff')->first();

if ($admin) {
    echo "✅ Found user: " . $admin->username . PHP_EOL;
    echo "📧 Email: " . $admin->email . PHP_EOL;
    echo "🔑 Password starts with: " . substr($admin->password, 0, 20) . "..." . PHP_EOL;

    $testPassword = 'rmd@admin';
    $isValid = Hash::check($testPassword, $admin->password);

    echo "🔍 Testing password 'rmd@admin': " . ($isValid ? "✅ VALID" : "❌ INVALID") . PHP_EOL;
} else {
    echo "❌ Admin user not found!" . PHP_EOL;
}
