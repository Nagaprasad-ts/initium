<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    /** @use HasFactory<\Database\Factories\ParticipantFactory> */
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the registration that owns the participant.
     */
    public function registration(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
