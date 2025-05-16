'use client';

import UniformDataGrid, { ColumnConfig } from '@/components/UniformDataGrid';
import { useRouter } from 'next/navigation';

interface Contra {
  id: string;
  voucherNo: string;
  date: Date;
  fromAccount: string;
  toAccount: string;
  amount: number;
  remarks: string;
}

export default function ContraList() {
  const router = useRouter();

  const contras: Contra[] = [
    {
      id: '1',
      voucherNo: 'CV-001',
      date: new Date('2023-05-16'),
      fromAccount: 'Cash Account',
      toAccount: 'Bank Account',
      amount: 50000,
      remarks: 'Fund transfer',
    },
  ];

  const columns: ColumnConfig<Contra>[] = [
    { dataField: 'voucherNo', caption: 'Voucher No', width: 120 },
    { dataField: 'date', caption: 'Date', dataType: 'date', format: 'yyyy-MM-dd',width:120 },
    { dataField: 'fromAccount', caption: 'From Account', width: 200 },
    { dataField: 'toAccount', caption: 'To Account', width: 200 },
    { dataField: 'amount', caption: 'Amount', dataType: 'number', format: 'currency', width: 120 },
    { dataField: 'remarks', caption: 'Remarks', width: 200 },
  ];

  return (
    <UniformDataGrid<Contra>
      data={contras}
      columns={columns}
      addButtonText="+ New Contra"
      onAdd={() => router.push('/transaction/contra')}
      onEdit={(contra) => router.push(`/transaction/contra/${contra.id}`)}
      onDelete={(contra) => console.log('Deleting contra:', contra.id)}
      deleteTitle="Delete Contra Voucher?"
      deleteDescription={(contra) => `This will permanently delete contra voucher ${contra.voucherNo}.`}
    />
  );
}
