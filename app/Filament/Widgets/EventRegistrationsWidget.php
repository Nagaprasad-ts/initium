<?php
// app/Filament/Widgets/EventRegistrationsWidget.php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\Registration;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class EventRegistrationsWidget extends BaseWidget
{
    protected static ?string $heading = 'Registrations by Event';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        $isCoreteam = Auth::user()?->hasRole('core-team');

        return $table
            ->query(
                Event::query()
                    ->withCount([
                        'registrations as total_registrations',
                        'registrations as paid_registrations' => fn (Builder $q) =>
                            $q->where('payment_status', 'paid'),
                        'registrations as pending_registrations' => fn (Builder $q) =>
                            $q->where('payment_status', 'pending'),
                    ])
                    ->where('is_active', true)
                    ->orderByDesc('paid_registrations')
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Event')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->sortable(),

                TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                TextColumn::make('paid_registrations')
                    ->label('Paid')
                    ->badge()
                    ->color('success')
                    ->sortable(),

                ...($isCoreteam ? [] : [
                    TextColumn::make('pending_registrations')
                        ->label('Pending')
                        ->badge()
                        ->color('warning')
                        ->sortable(),

                    TextColumn::make('total_registrations')
                        ->label('Total')
                        ->badge()
                        ->color('primary')
                        ->sortable(),
                ]),

                TextColumn::make('revenue')
                    ->label('Revenue')
                    ->getStateUsing(fn ($record) =>
                        '₹' . number_format(
                            Registration::where('event_id', $record->id)
                                ->where('payment_status', 'paid')
                                ->sum('total_amount'),
                            0
                        )
                    )
                    ->sortable(),
            ])
            ->paginated(false);
    }
}