<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ContactMessageInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Name'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('subject')
                    ->label('Subject')
                    ->placeholder('—'),

                TextEntry::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn ($state) => match($state) {
                        'unread'  => 'danger',
                        'read'    => 'warning',
                        'replied' => 'success',
                        default   => 'gray',
                    }),

                TextEntry::make('created_at')
                    ->label('Received At')
                    ->dateTime('d M Y, h:i A'),

                TextEntry::make('message')
                    ->label('Message')
                    ->columnSpanFull(),
            ]);
    }
}