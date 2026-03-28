<?php

namespace App\Filament\Resources\Participants\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema as FilamentSchema;

class ParticipantForm
{
    public static function configure(FilamentSchema $schema): FilamentSchema
    {
        return $schema
            ->components([
                Select::make('registration_id')
                    ->relationship('registration', 'id')
                    ->required()
                    ->searchable(),

                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->email()
                    ->maxLength(255),

                TextInput::make('phone')
                    ->tel()
                    ->maxLength(20),

                TextInput::make('student_id')
                    ->label('Student ID / USN')
                    ->maxLength(255),

                TextInput::make('uid')
                    ->disabled()
                    ->dehydrated()
                    ->maxLength(255),

                TextEntry::make('event_name')
                    ->label('Event')
                    ->state(fn ($record) => $record?->registration?->event?->name ?? '—'),

                TextEntry::make('team_name')
                    ->label('Team Name')
                    ->state(fn ($record) => $record?->registration?->team_name ?? '—'),
            ]);
    }
}