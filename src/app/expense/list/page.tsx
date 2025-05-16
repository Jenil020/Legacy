'use client';

import UniformDataGrid, { ColumnConfig } from '@/components/UniformDataGrid';
import { useRouter } from 'next/navigation';

interface Expense {
  id: string;
  voucherNo: string;
  date: Date;
  expenseAccount: string;
  paidTo: string;
  amount: number;
  remarks: string;
}

export default function ExpenseList() {
  const router = useRouter();

  const expenses: Expense[] = [
    {
      id: '1',
      voucherNo: 'EV-001',
      date: new Date('2023-05-18'),
      expenseAccount: 'Office Expenses',
      paidTo: 'XYZ Supplies',
      amount: 12000,
      remarks: 'Office supplies',
    },
  ];

  // Convert columns to columnBuilder function
  const columnBuilder = (isFullscreen: boolean): ColumnConfig<Expense>[] => [
    { dataField: 'voucherNo', caption: 'Voucher No', width: isFullscreen ? undefined : 150 },
    { 
      dataField: 'date', 
      caption: 'Date', 
      dataType: 'date', 
      format: 'yyyy-MM-dd',
      width: isFullscreen ? undefined : 150 
    },
    { dataField: 'expenseAccount', caption: 'Expense Account', width: isFullscreen ? undefined : 200 },
    { dataField: 'paidTo', caption: 'Paid To', width: isFullscreen ? undefined : 150 },
    { 
      dataField: 'amount', 
      caption: 'Amount', 
      dataType: 'number', 
      format: 'currency', 
      width: isFullscreen ? undefined : 120 
    },
    { dataField: 'remarks', caption: 'Remarks', width: isFullscreen ? undefined : 200 },
  ];

  return (
    <UniformDataGrid<Expense>
      data={expenses}
      columnBuilder={columnBuilder}  // Changed from columns to columnBuilder
      addButtonText="+ New Expense"
      onAdd={() => router.push('/expense/create-expense')}
      onEdit={(expense) => router.push(`/expense/${expense.id}`)}
      onDelete={(expense) => console.log('Deleting expense:', expense.id)}
      deleteTitle="Delete Expense Voucher?"
      deleteDescription={(expense) => `This will permanently delete expense voucher ${expense.voucherNo} for ${expense.paidTo}.`}
    />
  );
}