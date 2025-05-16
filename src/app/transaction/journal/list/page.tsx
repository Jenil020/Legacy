'use client';

import UniformDataGrid, { ColumnConfig } from '@/components/UniformDataGrid';
import { useRouter } from 'next/navigation';

interface Journal {
  id: string;
  voucherNo: string;
  date: Date;
  fromAccount: string;
  toAccount: string;
  amount: number;
  remarks: string;
}

export default function JournalList() {
  const router = useRouter();

  const journals: Journal[] = [
    {
      id: '1',
      voucherNo: 'JV-001',
      date: new Date('2023-05-17'),
      fromAccount: 'Sales Account',
      toAccount: 'Debtors Account',
      amount: 75000,
      remarks: 'Sales entry',
    },
  ];

  const columns: ColumnConfig<Journal>[] = [
    { dataField: 'voucherNo', caption: 'Voucher No', width: 150 },
    { dataField: 'date', caption: 'Date', dataType: 'date', format: 'yyyy-MM-dd' , width:150},
    { dataField: 'fromAccount', caption: 'From (Dr)', width: 170 },
    { dataField: 'toAccount', caption: 'To (Cr)', width: 170 },
    { dataField: 'amount', caption: 'Amount', dataType: 'number', format: 'currency', width: 160 },
    { dataField: 'remarks', caption: 'Remarks', width: 210 },
  ];

  return (
    <UniformDataGrid<Journal>
      data={journals}
      columns={columns}
      addButtonText="+ New Journal"
      onAdd={() => router.push('/transaction/journal')}
      onEdit={(journal) => router.push(`/transaction/journal/${journal.id}`)}
      onDelete={(journal) => console.log('Deleting journal:', journal.id)}
      deleteTitle="Delete Journal Voucher?"
      deleteDescription={(journal) => `This will permanently delete journal voucher ${journal.voucherNo}.`}
    />
  );
}
