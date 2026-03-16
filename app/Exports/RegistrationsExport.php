<?php
// app/Exports/RegistrationsExport.php

namespace App\Exports;

use App\Models\Registration;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;

class RegistrationsExport implements FromCollection, WithHeadings, WithStyles, WithColumnWidths, WithTitle
{
    protected bool $paidOnly;

    public function __construct(bool $paidOnly = false)
    {
        $this->paidOnly = $paidOnly;
    }

    public function title(): string
    {
        return 'Registrations';
    }

    public function headings(): array
    {
        return [
            'Reg ID',
            'Event',
            'Category',
            'Type',
            'Team Name',
            'College',
            'Contact Email',
            'Contact Phone',
            'Amount',
            'Payment Status',
            'Registered At',
            // Participant columns
            'P1 Name',
            'P1 Student ID',
            'P1 Email',
            'P1 Phone',
            'P2 Name',
            'P2 Student ID',
            'P2 Email',
            'P2 Phone',
            'P3 Name',
            'P3 Student ID',
            'P3 Email',
            'P3 Phone',
            'P4 Name',
            'P4 Student ID',
            'P4 Email',
            'P4 Phone',
            'P5 Name',
            'P5 Student ID',
            'P5 Email',
            'P5 Phone',
        ];
    }

    public function collection(): Collection
    {
        $registrations = Registration::with(['event.category', 'participants'])
            ->when($this->paidOnly, fn ($q) => $q->where('payment_status', 'paid'))
            ->orderBy('created_at', 'desc')
            ->get();

        return $registrations->map(function ($reg) {
            $row = [
                '#INTM-' . $reg->id,
                $reg->event->name ?? '—',
                $reg->event->category->name ?? '—',
                ucfirst($reg->registration_type),
                $reg->team_name ?? '—',
                $reg->college_name,
                $reg->contact_email,
                $reg->contact_phone,
                '₹' . number_format($reg->total_amount, 0),
                strtoupper($reg->payment_status),
                $reg->created_at->format('d-m-Y H:i'),
            ];

            // Add up to 5 participants
            $participants = $reg->participants;
            for ($i = 0; $i < 5; $i++) {
                $p = $participants->get($i);
                $row[] = $p?->name ?? '';
                $row[] = $p?->student_id ?? '';
                $row[] = $p?->email ?? '';
                $row[] = $p?->phone ?? '';
            }

            return $row;
        });
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            // Header row
            1 => [
                'font' => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
                'fill' => [
                    'fillType'   => Fill::FILL_SOLID,
                    'startColor' => ['argb' => 'FF7C3AED'],
                ],
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 12,  // Reg ID
            'B' => 28,  // Event
            'C' => 16,  // Category
            'D' => 12,  // Type
            'E' => 20,  // Team Name
            'F' => 30,  // College
            'G' => 30,  // Contact Email
            'H' => 14,  // Contact Phone
            'I' => 12,  // Amount
            'J' => 16,  // Payment Status
            'K' => 18,  // Registered At
            'L' => 22, 'M' => 16, 'N' => 26, 'O' => 14, // P1
            'P' => 22, 'Q' => 16, 'R' => 26, 'S' => 14, // P2
            'T' => 22, 'U' => 16, 'V' => 26, 'W' => 14, // P3
            'X' => 22, 'Y' => 16, 'Z' => 26, 'AA' => 14, // P4
            'AB' => 22, 'AC' => 16, 'AD' => 26, 'AE' => 14, // P5
        ];
    }
}