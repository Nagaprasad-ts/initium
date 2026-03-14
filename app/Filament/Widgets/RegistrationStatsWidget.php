<?php
// app/Filament/Widgets/RegistrationStatsWidget.php

namespace App\Filament\Widgets;

use App\Models\Registration;
use App\Models\Category;
use App\Models\Event;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class RegistrationStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isCoreteam = Auth::user()?->hasRole('core-team');

        $baseQuery = Registration::query();
        if ($isCoreteam) {
            $baseQuery->where('payment_status', 'paid');
        }

        $total        = (clone $baseQuery)->count();
        $paid         = (clone $baseQuery)->where('payment_status', 'paid')->count();
        $pending      = $isCoreteam ? 0 : Registration::where('payment_status', 'pending')->count();
        $totalRevenue = (clone $baseQuery)->where('payment_status', 'paid')->sum('total_amount');

        $stats = [
            Stat::make('Total Registrations', $total)
                ->description('All registrations')
                ->color('primary')
                ->icon('heroicon-o-users'),

            Stat::make('Paid Registrations', $paid)
                ->description('Payment confirmed')
                ->color('success')
                ->icon('heroicon-o-check-circle'),

            Stat::make('Total Revenue', '₹' . number_format($totalRevenue, 0))
                ->description('From paid registrations')
                ->color('warning')
                ->icon('heroicon-o-currency-rupee'),
        ];

        if (! $isCoreteam) {
            $stats[] = Stat::make('Pending Payments', $pending)
                ->description('Awaiting payment')
                ->color('danger')
                ->icon('heroicon-o-clock');
        }

        return $stats;
    }
}