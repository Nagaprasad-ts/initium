<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // individual | group | both
            $table->string('venue');
            $table->date('event_start_date');
            $table->date('event_end_date')->nullable();
            $table->time('start_time');
            $table->time('end_time');
            $table->decimal('price', 10, 2);
            $table->integer('min')->nullable();
            $table->integer('max')->nullable();
            $table->integer('max_participants')->nullable();
            $table->string('banner_image')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
