<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
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

// Admin Authentication Routes
Route::post('/admin/login', [AdminController::class, 'login']);

// Admin Protected Routes
Route::middleware('auth:admin')->group(function () {
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    Route::get('/admin/me', [AdminController::class, 'me']);
    Route::get('/admin/verify', [AdminController::class, 'verify']);

    // Admin Management Routes (for super admins)
    Route::get('/admins', [AdminController::class, 'index']);
    Route::post('/admins', [AdminController::class, 'store']);
    Route::put('/admins/{id}', [AdminController::class, 'update']);
    Route::delete('/admins/{id}', [AdminController::class, 'destroy']);
});
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/admin/verify', [AuthController::class, 'verify'])->middleware('auth:sanctum');

// Dashboard routes
Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'getStats']);
    Route::get('students-count', [DashboardController::class, 'getStudentsCount']);
    Route::get('employees-count', [DashboardController::class, 'getEmployeesCount']);
    Route::get('inventory-stats', [DashboardController::class, 'getInventoryStats']);
    Route::get('activity', [DashboardController::class, 'getRecentActivity']);
});

// Temporary unprotected dashboard routes for testing
Route::prefix('test-dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'getStats']);
    Route::get('activity', [DashboardController::class, 'getRecentActivity']);
});

// Public dashboard routes (for when not authenticated)
Route::prefix('dashboard')->group(function () {
    Route::get('students-count', [DashboardController::class, 'getStudentsCount']);
    Route::get('employees-count', [DashboardController::class, 'getEmployeesCount']);
    Route::get('inventory-stats', [DashboardController::class, 'getInventoryStats']);
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
