<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    /** @use HasFactory<\Database\Factories\ParticipantFactory> */
    use HasFactory;

    protected $guarded = [];

    protected static function booted(): void
    {
        static::created(function (Participant $participant) {

            if ($participant->registration?->event?->category?->name === 'STANDUP COMEDY') {

                $participant->updateQuietly([
                    'uid' => 'NHI-' . str_pad($participant->id, 8, '0', STR_PAD_LEFT)
                ]);
            }
        });
    }

    /**
     * Get the registration that owns the participant.
     */
    public function registration(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
