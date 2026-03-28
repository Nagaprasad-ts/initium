<?php

namespace App\Filament\Resources\Participants\Tables;

use App\Exports\ParticipantsExport;
use Filament\Actions\Action;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;

class ParticipantsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('registration.id')
                    ->label('Reg ID')
                    ->sortable(),
                TextColumn::make('uid')
                    ->label('Participant ID')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('phone'),
                TextColumn::make('student_id')
                    ->label('USN')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                // EditAction::make(),
            ])
            ->headerActions([
                Action::make('export_paid')
                    ->label('Export Paid')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->action(fn () => Excel::download(
                        new ParticipantsExport(true),
                        'participants-paid-' . now()->format('d-m-Y') . '.xlsx'
                    )),

                Action::make('export_all')
                    ->label('Export All')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('primary')
                    ->visible(fn () => Auth::user()?->hasRole('super_admin'))
                    ->action(fn () => Excel::download(
                        new ParticipantsExport(false),
                        'participants-all-' . now()->format('d-m-Y') . '.xlsx'
                    )),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
