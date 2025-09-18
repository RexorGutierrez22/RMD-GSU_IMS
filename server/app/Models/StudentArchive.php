<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentArchive extends Model
{
    use HasFactory;

    protected $table = 'students_archive';

    protected $fillable = [
        'original_id',
        'student_number',
        'first_name',
        'last_name',
        'middle_name',
        'contact',
        'email',
        'department',
        'year_level',
        'section',
        'deleted_at',
        'delete_reason',
        'deleted_by'
    ];
}
