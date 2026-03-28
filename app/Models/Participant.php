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
        static::creating(function (Participant $participant) {
            do {
                $uid = 'NHI-' . str_pad(random_int(0, 99999999), 8, '0', STR_PAD_LEFT);
            } while (static::where('uid', $uid)->exists()); // ensure uniqueness

            $participant->uid = $uid;
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
