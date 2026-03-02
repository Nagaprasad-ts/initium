<?php

namespace App\Filament\Resources\Events\Schemas;

use App\Models\Event;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema as FilamentSchema;
use Illuminate\Support\Str;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Utilities\Set;

class EventForm
{
    public static function configure(FilamentSchema $schema): FilamentSchema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('Event Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (Set $set, ?string $state) {
                                        $set('slug', Str::slug($state));
                                    }),
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated() // required in v5 if disabled
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),
                            ]),
                        RichEditor::make('description')
                            ->required()
                            ->columnSpanFull()
                            ->extraAttributes([
                                'style' => 'min-height: 300px;',
                            ]),
                        Grid::make(2)
                            ->schema([
                                Select::make('type')
                                    ->options([
                                        'individual' => 'Individual',
                                        'group' => 'Group',
                                        'both' => 'Both',
                                    ])
                                    ->required(),
                                TextInput::make('venue')
                                    ->required()
                                    ->maxLength(255),
                                DatePicker::make('event_start_date')
                                    ->required(),
                                DatePicker::make('event_end_date'),
                            ]),
                        Grid::make(2)
                            ->schema([
                                TimePicker::make('start_time')
                                    ->required(),
                                TimePicker::make('end_time')
                                    ->required(),
                            ]),
                    ])
                    ->columnSpanFull(),
                Section::make('Pricing & Capacity')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextInput::make('price')
                                    ->numeric()
                                    ->prefix('₹')
                                    ->required(),

                                TextInput::make('min')
                                    ->numeric()
                                    ->nullable(),

                                TextInput::make('max')
                                    ->numeric()
                                    ->nullable(),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('max_participants')
                                    ->numeric()
                                    ->nullable(),

                                Toggle::make('is_active')
                                    ->label('Is Active')
                                    ->default(false),
                            ]),
                    ])
                    ->columnSpan(1),
                Section::make('Media')
                    ->schema([
                        FileUpload::make('banner_image')
                            ->image()
                            ->directory('events')
                            ->disk('public'),
                    ])
                    ->columnSpan(1),
            ]);
    }
}
