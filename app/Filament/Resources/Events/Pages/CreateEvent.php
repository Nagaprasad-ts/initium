<?php

namespace App\Filament\Resources\Events\Pages;

use App\Filament\Resources\Events\EventResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Request;

class CreateEvent extends CreateRecord
{
    protected static string $resource = EventResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (request()->hasFile('banner_image_events_page')) {
            $data['banner_image_events_page'] =
                request()->file('banner_image_events_page')->store('events', 'public');
        }

        return $data;
    }
}
