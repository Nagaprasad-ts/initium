<?php
// app/Exports/ParticipantsExport.php

namespace App\Exports;

use App\Models\Participant;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ParticipantsExport implements FromCollection, WithHeadings, WithStyles, WithColumnWidths, WithTitle
{
    protected bool $paidOnly;

    public function __construct(bool $paidOnly = false)
    {
        $this->paidOnly = $paidOnly;
    }

    public function title(): string
    {
        return 'Participants';
    }

    public function headings(): array
    {
        return [
            'UID',
            'Name',
            'Email',
            'Phone',
            'Student ID / USN',
            'Reg ID',
            'Event',
            'Category',
            'Registration Type',
            'Team Name',
            'College',
            'Payment Status',
            'Registered At',
        ];
    }

    public function collection(): Collection
    {
        return Participant::with(['registration.event.category'])
            ->when($this->paidOnly, fn ($q) => $q->whereHas('registration', fn ($r) => $r->where('payment_status', 'paid')))
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($p) {
                $reg = $p->registration;
                return [
                    $p->uid ?? '—',
                    $p->name,
                    $p->email ?? '—',
                    $p->phone ?? '—',
                    $p->student_id ?? '—',
                    '#INTM-' . $reg?->id,
                    $reg?->event?->name ?? '—',
                    $reg?->event?->category?->name ?? '—',
                    ucfirst($reg?->registration_type ?? '—'),
                    $reg?->team_name ?? '—',
                    $reg?->college_name ?? '—',
                    strtoupper($reg?->payment_status ?? '—'),
                    $reg?->created_at?->format('d-m-Y H:i') ?? '—',
                ];
            });
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
                'fill' => [
                    'fillType'   => Fill::FILL_SOLID,
                    'startColor' => ['argb' => 'FFFF0080'],
                ],
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 18,  // UID
            'B' => 28,  // Name
            'C' => 30,  // Email
            'D' => 14,  // Phone
            'E' => 18,  // Student ID
            'F' => 12,  // Reg ID
            'G' => 28,  // Event
            'H' => 16,  // Category
            'I' => 16,  // Type
            'J' => 20,  // Team Name
            'K' => 30,  // College
            'L' => 16,  // Payment Status
            'M' => 18,  // Registered At
        ];
    }
}