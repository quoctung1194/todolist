<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitDatabase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->string('project');
            $table->integer('priority');
            $table->dateTime('deadline');
            $table->integer('status');
            $table->dateTime('started_date');
            $table->dateTime('completed_date');
            $table->timestamps();
            $table->primary('id');
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('number');
        });

        Schema::create('histories', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('sync_time');
            $table->string('content');
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
        Schema::drop('tasks');
        Schema::drop('settings');
        Schema::drop('histories');
    }
}
