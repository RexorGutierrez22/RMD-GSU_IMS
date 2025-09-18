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
        Schema::create('students_archive', function (Blueprint $table) {
            $table->id();
            $table->string('original_id')->comment('ID from the original students table');
            $table->string('student_number')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('contact')->nullable();
            $table->string('email')->nullable();
            $table->string('department')->nullable();
            $table->string('year_level')->nullable();
            $table->string('section')->nullable();
            $table->timestamp('deleted_at')->useCurrent();
            $table->text('delete_reason')->nullable();
            $table->string('deleted_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students_archive');
    }
};
