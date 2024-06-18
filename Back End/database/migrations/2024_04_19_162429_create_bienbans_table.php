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
        Schema::create('bienbans', function (Blueprint $table) {
            $table->string('mabienban')->primary();
            $table->string('masv');
            $table->string('masach');
            $table->string('loivipham');
            $table->string('bienphapxuly');
            $table->string('ngay');
            $table->foreign('masv')->references('masv')->on('sinhviens')->onDelete('cascade');
            $table->foreign('masach')->references('masach')->on('sachs')->onDelete('cascade');
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
        Schema::dropIfExists('bienbans');
    }
};
