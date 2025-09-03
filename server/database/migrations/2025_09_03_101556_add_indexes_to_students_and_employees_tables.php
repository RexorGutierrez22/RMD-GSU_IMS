<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->index('student_id', 'students_student_id_index');
            $table->index('email', 'students_email_index');
        });

        Schema::table('employees', function (Blueprint $table) {
            $table->index('emp_id', 'employees_emp_id_index');
            $table->index('email', 'employees_email_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropIndex('students_student_id_index');
            $table->dropIndex('students_email_index');
        });

        Schema::table('employees', function (Blueprint $table) {
            $table->dropIndex('employees_emp_id_index');
            $table->dropIndex('employees_email_index');
        });
    }
};
