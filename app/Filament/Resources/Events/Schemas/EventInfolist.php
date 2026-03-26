<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema as FilamentSchema;

class EventInfolist
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
                                TextEntry::make('name')
                                    ->label('Event Name'),
                                TextEntry::make('slug')
                                    ->label('Slug')
                                    ->copyable(),
                            ]),
                        TextEntry::make('description')
                            ->label('Description')
                            ->html()
                            ->columnSpanFull(),
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('category.name')
                                    ->label('Category')
                                    ->badge(),
                                TextEntry::make('type')
                                    ->label('Type')
                                    ->formatStateUsing(fn ($state) => ucfirst($state))
                                    ->badge(),
                                TextEntry::make('venue')
                                    ->label('Venue'),
                            ]),
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('event_start_date')
                                    ->label('Start Date')
                                    ->date('d M Y'),
                                TextEntry::make('event_end_date')
                                    ->label('End Date')
                                    ->date('d M Y')
                                    ->placeholder('—'),
                            ]),
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('start_time')
                                    ->label('Start Time'),
                                TextEntry::make('end_time')
                                    ->label('End Time'),
                            ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Pricing, Capacity & Links')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('price')
                                    ->label('Registration Fee')
                                    ->formatStateUsing(fn ($state) => '₹' . number_format($state, 0)),
                                TextEntry::make('first_price')
                                    ->label('1st Prize')
                                    ->formatStateUsing(fn ($state) => '₹' . number_format($state, 0)),
                                TextEntry::make('min')
                                    ->label('Min Participants')
                                    ->placeholder('—'),
                                TextEntry::make('max')
                                    ->label('Max Participants per Team')
                                    ->placeholder('—'),
                                TextEntry::make('whatsapp_link')
                                    ->label('WhatsApp Link')
                                    ->placeholder('—')
                                    ->copyable(),
                                TextEntry::make('max_participants')
                                    ->label('Total Capacity')
                                    ->placeholder('—'),
                            ]),
                        Grid::make(2)
                            ->schema([
                                IconEntry::make('is_active')
                                    ->label('Is Active')
                                    ->boolean(),
                            ]),
                    ])
                    ->columnSpan(1),

                Section::make('Media')
                    ->schema([
                        ImageEntry::make('banner_image_events_page')
                            ->label('Image (Events Page)')
                            ->disk('public')
                            ->placeholder('—'),
                        ImageEntry::make('banner_image_desktop')
                            ->label('Event Image (Desktop)')
                            ->disk('public')
                            ->placeholder('—'),
                        ImageEntry::make('banner_image_mobile')
                            ->label('Event Image (Mobile)')
                            ->disk('public')
                            ->placeholder('—'),
                    ])
                    ->columnSpan(1),
            ]);
    }
}