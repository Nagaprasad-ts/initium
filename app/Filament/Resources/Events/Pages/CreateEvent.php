<?php

namespace App\Filament\Resources\Events\Pages;

use App\Filament\Resources\Events\EventResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Log;

class CreateEvent extends CreateRecord
{
    protected static string $resource = EventResource::class;

    protected function getFormAttributes(): array
    {
        return [
            'enctype' => 'multipart/form-data',
        ];
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (request()->hasFile('banner_image_events_page')) {
            $path = request()->file('banner_image_events_page')->store('events', 'public');

            Log::info('Saved path:', ['path' => $path]);

            $data['banner_image_events_page'] = $path;
        }

        Log::info('Final data:', $data);

        return $data;
    }
}
