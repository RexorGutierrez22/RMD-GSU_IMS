<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeArchive extends Model
{
    use HasFactory;

    protected $table = 'employees_archive';

    protected $fillable = [
        'original_id',
        'employee_number',
        'first_name',
        'last_name',
        'middle_name',
        'contact',
        'email',
        'department',
        'position',
        'deleted_at',
        'delete_reason',
        'deleted_by'
    ];
}
