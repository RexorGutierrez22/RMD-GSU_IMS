<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

echo "=== TESTING ADMIN LOGIN API ===\n\n";

// Create a mock request
$request = Illuminate\Http\Request::create(
    '/api/admin/login',
    'POST',
    [
        'username' => 'RMD_Staff',
        'password' => 'rmd@admin'
    ],
    [],
    [],
    [
        'CONTENT_TYPE' => 'application/json',
        'HTTP_ACCEPT' => 'application/json',
    ]
);

try {
    $response = $kernel->handle($request);

    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Response Headers:\n";
    foreach ($response->headers->all() as $name => $values) {
        echo "  {$name}: " . implode(', ', $values) . "\n";
    }
    echo "\nResponse Body:\n";
    echo $response->getContent() . "\n";

    if ($response->getStatusCode() === 200) {
        echo "\n✅ API LOGIN SUCCESS!\n";
    } else {
        echo "\n❌ API LOGIN FAILED!\n";
    }

} catch (Exception $e) {
    echo "❌ API ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
