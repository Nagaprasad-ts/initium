<?php
// app/Filament/Widgets/CategoryRegistrationsWidget.php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Registration;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryRegistrationsWidget extends BaseWidget
{
    protected static ?string $heading = 'Registrations by Category';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';

    public static function canView(): bool
    {
        return Auth::user()?->hasAnyRole(['super_admin', 'core-team']);
    }

    public function table(Table $table): Table
    {
        $isCoreteam = Auth::user()?->hasRole('core-team');

        return $table
            ->query(
                Category::query()
                    ->withCount([
                        'events as total_registrations' => fn (Builder $q) =>
                            $q->join('registrations', 'registrations.event_id', '=', 'events.id')
                              ->select(DB::raw('count(registrations.id)')),

                        'events as paid_registrations' => fn (Builder $q) =>
                            $q->join('registrations', 'registrations.event_id', '=', 'events.id')
                              ->where('registrations.payment_status', 'paid')
                              ->select(DB::raw('count(registrations.id)')),

                        'events as pending_registrations' => fn (Builder $q) =>
                            $q->join('registrations', 'registrations.event_id', '=', 'events.id')
                              ->where('registrations.payment_status', 'pending')
                              ->select(DB::raw('count(registrations.id)')),
                    ])
                    ->addSelect([
                        'revenue' => Registration::selectRaw('COALESCE(SUM(total_amount), 0)')
                            ->whereHas('event', fn ($q) => $q->whereColumn('events.category_id', 'categories.id'))
                            ->where('payment_status', 'paid'),
                    ])
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Category')
                    ->badge()
                    ->sortable(),

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
                    ->label('Revenue Collected')
                    ->formatStateUsing(fn ($state) => '₹' . number_format($state, 0))
                    ->sortable(),
            ])
            ->paginated(false);
    }
}