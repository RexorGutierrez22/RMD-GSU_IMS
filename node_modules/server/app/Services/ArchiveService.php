<?php

namespace App\Services;

use App\Models\Student;
use App\Models\Employee;
use App\Models\StudentArchive;
use App\Models\EmployeeArchive;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ArchiveService
{
    /**
     * Archive a student record before deletion
     *
     * @param Student $student
     * @param string|null $reason
     * @return bool
     */
    public function archiveStudent(Student $student, ?string $reason = null): bool
    {
        try {
            DB::beginTransaction();

            // Create archive record
            StudentArchive::create([
                'original_id' => $student->id,
                'student_number' => $student->student_number,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'middle_name' => $student->middle_name,
                'contact' => $student->contact,
                'email' => $student->email,
                'department' => $student->department,
                'year_level' => $student->year_level,
                'section' => $student->section,
                'delete_reason' => $reason,
                'deleted_by' => Auth::check() ? Auth::user()->id : null
            ]);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Failed to archive student record: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Archive an employee record before deletion
     *
     * @param Employee $employee
     * @param string|null $reason
     * @return bool
     */
    public function archiveEmployee(Employee $employee, ?string $reason = null): bool
    {
        try {
            DB::beginTransaction();

            // Create archive record
            EmployeeArchive::create([
                'original_id' => $employee->id,
                'employee_number' => $employee->employee_number,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'middle_name' => $employee->middle_name,
                'contact' => $employee->contact,
                'email' => $employee->email,
                'department' => $employee->department,
                'position' => $employee->position,
                'delete_reason' => $reason,
                'deleted_by' => Auth::check() ? Auth::user()->id : null
            ]);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Failed to archive employee record: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get all archived students
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getArchivedStudents()
    {
        return StudentArchive::orderBy('deleted_at', 'desc')->get();
    }

    /**
     * Get all archived employees
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getArchivedEmployees()
    {
        return EmployeeArchive::orderBy('deleted_at', 'desc')->get();
    }
}
