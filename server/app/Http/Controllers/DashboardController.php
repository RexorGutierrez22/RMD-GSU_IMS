<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            $totalStudents = Student::count();
            $totalEmployees = Employee::count();

            // For now, using mock data for inventory items and pending requests
            // These can be updated when inventory and borrowing models are created
            $totalItems = 320; // This would come from Inventory model
            $pendingRequests = 12; // This would come from BorrowRequest model with pending status

            return response()->json([
                'totalStudents' => $totalStudents,
                'totalEmployees' => $totalEmployees,
                'totalItems' => $totalItems,
                'pendingRequests' => $pendingRequests,
                'recentRegistrations' => [
                    'students' => Student::latest()->take(5)->get(['first_name', 'last_name', 'created_at']),
                    'employees' => Employee::latest()->take(5)->get(['first_name', 'last_name', 'created_at'])
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch dashboard statistics',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getRecentActivity()
    {
        try {
            $activities = [];

            // Get recent student registrations
            $recentStudents = Student::latest()->take(3)->get();
            foreach ($recentStudents as $student) {
                $activities[] = [
                    'type' => 'student_registration',
                    'message' => "New student registered: {$student->first_name} {$student->last_name}",
                    'timestamp' => $student->created_at,
                    'icon' => 'user'
                ];
            }

            // Get recent employee registrations
            $recentEmployees = Employee::latest()->take(3)->get();
            foreach ($recentEmployees as $employee) {
                $activities[] = [
                    'type' => 'employee_registration',
                    'message' => "New employee registered: {$employee->first_name} {$employee->last_name}",
                    'timestamp' => $employee->created_at,
                    'icon' => 'users'
                ];
            }

            // Sort activities by timestamp
            usort($activities, function($a, $b) {
                return $b['timestamp'] <=> $a['timestamp'];
            });

            return response()->json([
                'activities' => array_slice($activities, 0, 10) // Return latest 10 activities
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch recent activity',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getStudentsCount()
    {
        try {
            $count = Student::count();
            return response()->json([
                'count' => $count,
                'total' => $count
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch students count',
                'message' => $e->getMessage(),
                'count' => 0
            ], 500);
        }
    }

    public function getEmployeesCount()
    {
        try {
            $count = Employee::count();
            return response()->json([
                'count' => $count,
                'total' => $count
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch employees count',
                'message' => $e->getMessage(),
                'count' => 0
            ], 500);
        }
    }

    public function getInventoryStats()
    {
        try {
            // Mock data for now - replace with actual inventory model when implemented
            return response()->json([
                'total_items' => 320,
                'borrowed_items' => 25,
                'low_stock_items' => 8,
                'available_items' => 295
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch inventory stats',
                'message' => $e->getMessage(),
                'total_items' => 0,
                'borrowed_items' => 0,
                'low_stock_items' => 0,
                'available_items' => 0
            ], 500);
        }
    }
}
