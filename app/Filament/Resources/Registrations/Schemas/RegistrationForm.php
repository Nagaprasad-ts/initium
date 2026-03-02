<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema as FilamentSchema;


class RegistrationForm
{
    public static function configure(FilamentSchema $schema): FilamentSchema
    {
        return $schema
            ->components([
                Section::make('Registration Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('event_id')
                                    ->label('Event Name')
                                    ->relationship('event', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                Select::make('registration_type')
                                    ->options([
                                        'individual' => 'Individual',
                                        'group' => 'Group',
                                    ])
                                    ->required(),
                            ]),
                        TextInput::make('team_name')
                            ->nullable()
                            ->maxLength(255),
                        TextInput::make('college_name')
                            ->required()
                            ->maxLength(255),
                    ]),
                Section::make('Contact Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('contact_email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('contact_phone')
                                    ->tel()
                                    ->required()
                                    ->maxLength(20),
                            ]),
                    ]),
                Section::make('Payment Information')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextInput::make('total_amount')
                                    ->numeric()
                                    ->prefix('₹')
                                    ->required(),
                                TextInput::make('payment_id')
                                    ->nullable()
                                    ->maxLength(255),
                                Select::make('payment_status')
                                    ->options([
                                        'pending' => 'Pending',
                                        'paid' => 'Paid',
                                        'failed' => 'Failed',
                                    ])
                                    ->required()
                                    ->default('pending'),
                            ]),
                        TextInput::make('razorpay_order_id')
                            ->disabled()
                            ->dehydrated()
                            ->maxLength(255),
                    ]),
            ]);
    }
}
