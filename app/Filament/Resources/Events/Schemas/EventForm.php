<?php

namespace App\Filament\Resources\Events\Schemas;

use App\Models\Event;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
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
                        Grid::make(3)
                            ->schema([
                                Select::make('category_id')
                                    ->label('Category')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                Select::make('type')
                                    ->options([
                                        'individual' => 'Individual',
                                        'duo' => 'Duo',
                                        'group' => 'Group',
                                    ])
                                    ->reactive()
                                    ->required()
                                    ->afterStateUpdated(function ($state, callable $set) {
                                        if ($state === 'duo') {
                                            $set('min', 2);
                                            $set('max', 2);
                                        }

                                        if ($state === 'individual') {
                                            $set('min', null);
                                            $set('max', null);
                                        }
                                    }),
                                TextInput::make('venue')
                                    ->required()
                                    ->maxLength(255),
                                Grid::make(2)
                                    ->schema([
                                        DatePicker::make('event_start_date')
                                            ->required(),
                                        DatePicker::make('event_end_date'),
                                    ])
                                    ->columnSpanFull(),
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
                Section::make('Pricing, Capacity & Links')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('price')
                                    ->label('Registation Fee')
                                    ->numeric()
                                    ->prefix('₹')
                                    ->required(),
                                
                                TextInput::make('first_price')
                                    ->numeric()
                                    ->prefix('₹')
                                    ->required(),

                                TextInput::make('min')
                                    ->numeric()
                                    ->nullable()
                                    ->required(fn ($get) => $get('type') === 'group')
                                    ->disabled(fn ($get) => in_array($get('type'), ['duo', 'individual'])),

                                TextInput::make('max')
                                    ->numeric()
                                    ->nullable()
                                    ->gte('min')
                                    ->required(fn ($get) => $get('type') === 'group')
                                    ->disabled(fn ($get) => in_array($get('type'), ['duo', 'individual'])),

                                TextInput::make('whatsapp_link')
                                    ->nullable()
                                    ->url()
                                    ->required(),

                                TextInput::make('max_participants')
                                    ->numeric()
                                    ->nullable(),
                            ]),

                        Grid::make(2)
                            ->schema([
                                

                                Toggle::make('is_active')
                                    ->label('Is Active')
                                    ->default(false),
                            ]),
                    ])
                    ->columnSpan(1),
                Section::make('Media')
                    ->schema([
                        FileUpload::make('banner_image_events_page')
                            ->image()
                            ->label('Image (Events Page)')
                            ->directory('events')
                            ->disk('public')
                            ->afterStateUpdated(function ($state) {
                                \Illuminate\Support\Facades\Log::info('Upload attempted', [
                                    'state' => $state,
                                    'disk'  => 'public',
                                    'dir'   => 'events',
                                ]);
                            }),
                        FileUpload::make('banner_image_desktop')
                            ->image()
                            ->label('Event Image (Desktop)')
                            ->directory('events')
                            ->disk('public'),
                        FileUpload::make('banner_image_mobile')
                            ->image()
                            ->label('Event Image (Mobile)')
                            ->directory('events')
                            ->disk('public'),
                    ])
                    ->columnSpan(1),
            ]);
    }
}
