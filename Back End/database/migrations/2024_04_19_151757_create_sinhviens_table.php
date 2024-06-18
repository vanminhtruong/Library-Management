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
        Schema::create('sinhviens', function (Blueprint $table) {
            $table->string('masv')->primary();
            $table->string('hoten');
            $table->string('gioitinh');
            $table->string('lop');
            $table->date('ngaysinh');
            $table->string('diachi')->nullable();
            $table->string('khoa');
            $table->string('manv');
            $table->foreign('manv')->references('manv')->on('nhanviens');
            $table->string('image')->nullable();
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
        Schema::dropIfExists('sinhviens');
    }
};
