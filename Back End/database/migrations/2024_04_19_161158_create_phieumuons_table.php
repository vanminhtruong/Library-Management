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
        Schema::create('phieumuons', function (Blueprint $table) {
            $table->string('maphieumuon')->primary();
            $table->date('ngaymuon')->nullable();
            $table->date('ngaytra')->nullable();
            $table->string('soluong')->nullable();
            $table->string('tinhtrangsach')->nullable();
            $table->string('masach')->nullable();
            $table->string('masv')->nullable();
            $table->foreign('masach')->references('masach')->on('sachs')->onDelete('cascade'); // Khóa ngoại cho masach
            $table->foreign('masv')->references('masv')->on('sinhviens')->onDelete('cascade'); // Khóa ngoại cho masv
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
        Schema::dropIfExists('phieumuons');
    }
};
