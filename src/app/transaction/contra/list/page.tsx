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

  // Convert columns to columnBuilder function
  const columnBuilder = (isFullscreen: boolean): ColumnConfig<Contra>[] => [
    { 
      dataField: 'voucherNo', 
      caption: 'Voucher No', 
      width: isFullscreen ? undefined : 120 
    },
    { 
      dataField: 'date', 
      caption: 'Date', 
      dataType: 'date', 
      format: 'yyyy-MM-dd',
      width: isFullscreen ? undefined : 120 
    },
    { 
      dataField: 'fromAccount', 
      caption: 'From Account', 
      width: isFullscreen ? undefined : 200 
    },
    { 
      dataField: 'toAccount', 
      caption: 'To Account', 
      width: isFullscreen ? undefined : 200 
    },
    { 
      dataField: 'amount', 
      caption: 'Amount', 
      dataType: 'number', 
      format: 'currency', 
      width: isFullscreen ? undefined : 120 
    },
    { 
      dataField: 'remarks', 
      caption: 'Remarks', 
      width: isFullscreen ? undefined : 200 
    },
  ];

  return (
    <UniformDataGrid<Contra>
      data={contras}
      columnBuilder={columnBuilder}  // Changed from columns to columnBuilder
      addButtonText="+ New Contra"
      onAdd={() => router.push('/transaction/contra')}
      onEdit={(contra) => router.push(`/transaction/contra/${contra.id}`)}
      onDelete={(contra) => console.log('Deleting contra:', contra.id)}
      deleteTitle="Delete Contra Voucher?"
      deleteDescription={(contra) => `This will permanently delete contra voucher ${contra.voucherNo}.`}
    />
  );
}