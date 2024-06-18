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
        Schema::create('sachs', function (Blueprint $table) {
            $table->string('masach')->primary();
            $table->string('tensach');
            $table->string('sotrang');
            $table->string('gia');
            $table->string('namxb');
            $table->string('tinhtrangsach');
            $table->string('tentg');
            $table->string('tennxb');
            $table->string('soluong');
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
        Schema::dropIfExists('sachs');
    }
};
