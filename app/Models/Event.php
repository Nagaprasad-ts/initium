<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the registrations for the event.
     */
    public function registrations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Determine if individual registration is supported.
     */
    public function isIndividualSupported(): bool
    {
        return in_array($this->type, ['individual', 'both']);
    }

    /**
     * Determine if group registration is supported.
     */
    public function isGroupSupported(): bool
    {
        return in_array($this->type, ['group', 'both']);
    }

    /**
     * Determine if both registration types are supported.
     */
    public function supportsBoth(): bool
    {
        return $this->type === 'both';
    }

    /**
     * Check if the event has capacity for more participants.
     */
    public function hasCapacity(): bool
    {
        if (is_null($this->max_participants)) {
            return true;
        }

        $paidParticipantsCount = Participant::whereHas('registration', function ($query) {
            $query->where('event_id', $this->id)
                  ->where('payment_status', 'paid');
        })->count();

        return $paidParticipantsCount < $this->max_participants;
    }

    public function getBannerImageUrlAttribute()
    {
        return $this->banner_image
            ? asset('storage/' . $this->banner_image)
            : null;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'event_start_date' => 'date',
            'event_end_date' => 'date',
            'start_time' => 'datetime:H:i',
            'end_time' => 'datetime:H:i',
            'is_active' => 'boolean',
        ];
    }
}
