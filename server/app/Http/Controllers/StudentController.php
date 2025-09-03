<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    public function store(Request $request)
    {
<<<<<<< HEAD
        try {
            // Log the incoming request for debugging
            \Log::info('Student registration request received', [
                'data' => $request->all(),
                'headers' => $request->headers->all()
            ]);

            // Validate request data
            $validated = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'email' => 'required|email|unique:students,email',
                'studentId' => 'required|string|unique:students,student_id',
                'course' => 'required|string|max:255',
                'yearLevel' => 'required|string|max:255',
                'contact' => 'required|string|max:20'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
=======
        // Validate request data
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'email' => 'required|email|unique:students,email',
            'studentId' => 'required|string|unique:students,student_id',
            'course' => 'required|string|max:255',
            'yearLevel' => 'required|string|max:255',
            'contact' => 'required|string|max:20'
        ]);
>>>>>>> 48275face3fabc943866499a45a7293cef2ac622

        // Create student record
        $student = Student::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'middle_name' => $validated['middleName'] ?? null,
            'email' => $validated['email'],
            'student_id' => $validated['studentId'],
            'course' => $validated['course'],
            'year_level' => $validated['yearLevel'],
            'contact' => $validated['contact']
        ]);

        // Generate QR code with student data
        $qrData = [
            'type' => 'student',
            'id' => $student->id,
            'student_id' => $student->student_id,
            'name' => $student->first_name . ' ' . $student->last_name,
            'email' => $student->email,
            'course' => $student->course,
            'year_level' => $student->year_level
        ];

        // Create QR code as SVG
        $qrCodeSvg = QrCode::format('svg')
            ->size(200)
            ->generate(json_encode($qrData));

<<<<<<< HEAD
        // Save QR code to public directory with organized folder structure
        $qrFileName = 'Student_' . $student->student_id . '_' . $student->first_name . '_' . $student->last_name . '.svg';
        $qrPath = 'qr_codes/students/' . $qrFileName;

        // Ensure qr_codes/students directory exists
        if (!file_exists(public_path('qr_codes/students'))) {
            mkdir(public_path('qr_codes/students'), 0755, true);
=======
        // Save QR code to public directory
        $qrFileName = $student->student_id . '_' . $student->first_name . '_' . $student->last_name . '.svg';
        $qrPath = 'qr_codes/' . $qrFileName;

        // Ensure qr_codes directory exists
        if (!file_exists(public_path('qr_codes'))) {
            mkdir(public_path('qr_codes'), 0755, true);
>>>>>>> 48275face3fabc943866499a45a7293cef2ac622
        }

        file_put_contents(public_path($qrPath), $qrCodeSvg);

        // Update student record with QR code path
        $student->update(['qr_code_path' => $qrPath]);

        return response()->json([
            'message' => 'Student registered successfully!',
            'student' => $student,
            'qr_url' => url($qrPath)
        ], 201);
    }
<<<<<<< HEAD

    public function checkUniqueness(Request $request)
    {
        $studentIdExists = false;
        $emailExists = false;

        if ($request->has('studentId') && $request->studentId) {
            $studentIdExists = Student::where('student_id', $request->studentId)->exists();
        }

        if ($request->has('email') && $request->email) {
            $emailExists = Student::where('email', $request->email)->exists();
        }

        return response()->json([
            'studentIdExists' => $studentIdExists,
            'emailExists' => $emailExists
        ]);
    }
=======
>>>>>>> 48275face3fabc943866499a45a7293cef2ac622
}
