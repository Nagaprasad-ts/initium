<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use App\Models\ContactMessage;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),

                TextColumn::make('subject')
                    ->limit(40)
                    ->placeholder('—'),

                TextColumn::make('message')
                    ->limit(60)
                    ->wrap(),

                BadgeColumn::make('status')
                    ->colors([
                        'danger'  => 'unread',
                        'warning' => 'read',
                        'success' => 'replied',
                    ])
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('d M Y, h:i A')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'unread'  => 'Unread',
                        'read'    => 'Read',
                        'replied' => 'Replied',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),

                Action::make('mark_read')
                    ->label('Mark Read')
                    ->icon('heroicon-o-eye')
                    ->color('warning')
                    ->visible(fn ($record) => $record->status === 'unread')
                    ->action(fn ($record) => $record->markAsRead()),

                Action::make('mark_replied')
                    ->label('Mark Replied')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn ($record) => $record->status !== 'replied')
                    ->action(fn ($record) => $record->markAsReplied()),

                Action::make('reply')
                    ->label('Reply')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('primary')
                    ->url(fn ($record) => 'mailto:' . $record->email . '?subject=Re: ' . urlencode($record->subject ?? 'Your message to Initium 2026'))
                    ->openUrlInNewTab(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}