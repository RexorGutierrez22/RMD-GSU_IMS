<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate request data
            $validated = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'email' => 'required|email|unique:employees,email',
                'empId' => 'required|string|unique:employees,emp_id',
                'position' => 'required|string|max:255',
                'department' => 'required|string|max:255',
                'contact' => 'required|string|max:20'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        // Create employee record
        $employee = Employee::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'middle_name' => $validated['middleName'] ?? null,
            'email' => $validated['email'],
            'emp_id' => $validated['empId'],
            'position' => $validated['position'],
            'department' => $validated['department'],
            'contact' => $validated['contact']
        ]);

        // Generate QR code with employee data
        $qrData = [
            'type' => 'employee',
            'id' => $employee->id,
            'emp_id' => $employee->emp_id,
            'name' => $employee->first_name . ' ' . $employee->last_name,
            'email' => $employee->email,
            'department' => $employee->department
        ];

        // Create QR code as SVG
        $qrCodeSvg = QrCode::format('svg')
            ->size(200)
            ->generate(json_encode($qrData));

        // Save QR code to public directory with organized folder structure
        $qrFileName = 'Employee_' . $employee->emp_id . '_' . $employee->first_name . '_' . $employee->last_name . '.svg';
        $qrPath = 'qr_codes/employees/' . $qrFileName;

        // Ensure qr_codes/employees directory exists
        if (!file_exists(public_path('qr_codes/employees'))) {
            mkdir(public_path('qr_codes/employees'), 0755, true);
        }

        file_put_contents(public_path($qrPath), $qrCodeSvg);

        // Update employee record with QR code path
        $employee->update(['qr_code_path' => $qrPath]);

        return response()->json([
            'message' => 'Employee registered successfully!',
            'employee' => $employee,
            'qr_url' => url("api/download-qr/employees/{$qrFileName}")
        ], 201);
    }

    public function checkUniqueness(Request $request)
    {
        $empIdExists = false;
        $emailExists = false;

        if ($request->has('empId') && $request->empId) {
            $empIdExists = Employee::where('emp_id', $request->empId)->exists();
        }

        if ($request->has('email') && $request->email) {
            $emailExists = Employee::where('email', $request->email)->exists();
        }

        return response()->json([
            'empIdExists' => $empIdExists,
            'emailExists' => $emailExists
        ]);
    }
}
