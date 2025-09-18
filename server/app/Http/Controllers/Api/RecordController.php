<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Employee;
use App\Services\ArchiveService;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    protected $archiveService;

    public function __construct(ArchiveService $archiveService)
    {
        $this->archiveService = $archiveService;
    }

    /**
     * Delete a student with archiving
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteStudent(Request $request, $id)
    {
        try {
            $student = Student::findOrFail($id);

            // Archive before deleting
            $archived = $this->archiveService->archiveStudent($student, $request->reason);

            if (!$archived) {
                return response()->json(['message' => 'Failed to archive student record'], 500);
            }

            // Delete the student
            $student->delete();

            return response()->json(['message' => 'Student record has been archived and deleted successfully']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Delete an employee with archiving
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteEmployee(Request $request, $id)
    {
        try {
            $employee = Employee::findOrFail($id);

            // Archive before deleting
            $archived = $this->archiveService->archiveEmployee($employee, $request->reason);

            if (!$archived) {
                return response()->json(['message' => 'Failed to archive employee record'], 500);
            }

            // Delete the employee
            $employee->delete();

            return response()->json(['message' => 'Employee record has been archived and deleted successfully']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
