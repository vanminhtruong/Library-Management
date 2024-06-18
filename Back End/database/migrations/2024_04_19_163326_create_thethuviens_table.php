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
        Schema::create('thethuviens', function (Blueprint $table) {
            $table->string('mathe')->primary();
            $table->string('thoigiancap');
            $table->string('hsd');
            $table->string('masv');
            $table->foreign('masv')->references('masv')->on('sinhviens')->onDelete('cascade');
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
        Schema::dropIfExists('thethuviens');
    }
};
