<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'department' => 'required|string',
            // Add any other fields you need
        ]);

        $employee = Employee::create($validated);

        // Generate QR Code with Employee ID
        $qrContent = 'EMP-' . $employee->id . '-' . Str::uuid();
        $qrFileName = 'qr_' . $employee->id . '.png';

        $qrPath = 'qr_codes/' . $qrFileName;

        // Store QR in public/qr_codes/
        QrCode::format('png')->size(300)->generate($qrContent, public_path($qrPath));

        // Save path in DB
        $employee->qr_code_path = $qrPath;
        $employee->save();

        return response()->json([
            'message' => 'Employee registered successfully!',
            'employee' => $employee,
            'qr_url' => asset($qrPath)
        ]);
    }
}
