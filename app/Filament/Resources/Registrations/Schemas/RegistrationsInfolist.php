<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class RegistrationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Registration Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('event.name')
                                    ->label('Event'),
                                TextEntry::make('registration_type')
                                    ->label('Type')
                                    ->formatStateUsing(fn ($state) => ucfirst($state))
                                    ->badge(),
                            ]),
                        TextEntry::make('team_name')
                            ->label('Team Name')
                            ->placeholder('—'),
                        TextEntry::make('college_name')
                            ->label('College'),
                    ]),

                Section::make('Payment Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('total_amount')
                                    ->label('Amount')
                                    ->formatStateUsing(fn ($state) => '₹' . number_format($state, 0)),
                                TextEntry::make('created_at')
                                    ->label('Registered At')
                                    ->dateTime('d M Y, h:i A'),
                            ]),
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('razorpay_order_id')
                                    ->label('Razorpay Order ID')
                                    ->placeholder('—')
                                    ->copyable(),
                                TextEntry::make('payment_id')
                                    ->label('Payment ID')
                                    ->placeholder('—')
                                    ->copyable(),
                                // TextEntry::make('checked_in_at')
                                //     ->label('Checked In At')
                                //     ->dateTime('d M Y, h:i A')
                                //     ->placeholder('Not checked in'),
                            ]),
                        Grid::make(1)
                            ->schema([
                                TextEntry::make('payment_status')
                                    ->label('Status')
                                    ->badge()
                                    ->color(fn ($state) => match($state) {
                                        'paid'    => 'success',
                                        'pending' => 'warning',
                                        'failed'  => 'danger',
                                        default   => 'gray',
                                    }),
                            ]),
                    ]),

                Section::make('Contact Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('contact_email')
                                    ->label('Email')
                                    ->copyable(),
                                TextEntry::make('contact_phone')
                                    ->label('Phone')
                                    ->copyable(),
                            ]),
                    ]),
            ]);
    }
}