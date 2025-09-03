<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/admin/verify', [AuthController::class, 'verify'])->middleware('auth:sanctum');

// Dashboard routes
Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'getStats']);
    Route::get('activity', [DashboardController::class, 'getRecentActivity']);
});

// Registration routes
Route::post('/employees', [EmployeeController::class, 'store']);
Route::post('/students', [StudentController::class, 'store']);

// Uniqueness checking routes
Route::post('/check-student-uniqueness', [StudentController::class, 'checkUniqueness']);
Route::post('/check-employee-uniqueness', [EmployeeController::class, 'checkUniqueness']);

// QR Code download route
Route::get('/download-qr/{type}/{filename}', function ($type, $filename) {
    $path = public_path("qr_codes/{$type}/{$filename}");

    if (!file_exists($path)) {
        return response()->json(['error' => 'QR code not found'], 404);
    }

    $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
    $mimeType = $fileExtension === 'svg' ? 'image/svg+xml' : 'image/png';

    return response()->file($path, [
        'Content-Type' => $mimeType,
        'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET',
        'Access-Control-Allow-Headers' => '*'
    ]);
})->where(['type' => 'students|employees', 'filename' => '.*']);
