<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Employee;
use App\Services\ArchiveService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArchiveController extends Controller
{
    protected $archiveService;

    public function __construct(ArchiveService $archiveService)
    {
        $this->archiveService = $archiveService;
    }

    /**
     * Get all archived students
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArchivedStudents()
    {
        $archivedStudents = $this->archiveService->getArchivedStudents();
        return response()->json($archivedStudents);
    }

    /**
     * Get all archived employees
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArchivedEmployees()
    {
        $archivedEmployees = $this->archiveService->getArchivedEmployees();
        return response()->json($archivedEmployees);
    }

    /**
     * Delete a student record after archiving it
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAndArchiveStudent(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $student = Student::findOrFail($id);

            // Archive first
            $archived = $this->archiveService->archiveStudent($student, $request->reason);

            if (!$archived) {
                return response()->json(['message' => 'Failed to archive student record'], 500);
            }

            // Then delete
            $student->delete();

            DB::commit();
            return response()->json(['message' => 'Student record archived and deleted successfully']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error processing request: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Delete an employee record after archiving it
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAndArchiveEmployee(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $employee = Employee::findOrFail($id);

            // Archive first
            $archived = $this->archiveService->archiveEmployee($employee, $request->reason);

            if (!$archived) {
                return response()->json(['message' => 'Failed to archive employee record'], 500);
            }

            // Then delete
            $employee->delete();

            DB::commit();
            return response()->json(['message' => 'Employee record archived and deleted successfully']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error processing request: ' . $e->getMessage()], 500);
        }
    }
}
