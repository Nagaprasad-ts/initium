<?php

namespace App\Filament\Resources\Events\Pages;

use App\Filament\Resources\Events\EventResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditEvent extends EditRecord
{
    protected static string $resource = EventResource::class;
    
    protected function getFormAttributes(): array
    {
        return [
            'enctype' => 'multipart/form-data',
        ];
    }


    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (request()->hasFile('banner_image_events_page')) {
            $data['banner_image_events_page'] =
                request()->file('banner_image_events_page')->store('events', 'public');
        }

        return $data;
    }
}
