export type AccountingEntryType = 'payment' | 'contra' | 'journal' | 'expense';

export interface AccountingFormData {
  entryType: AccountingEntryType;
  voucherNo: string;
  entryDate: Date; // Required
  chequeDate?: Date | null; // Make optional
  referenceNo: string;
  amount: number;
  notes: string;
  
  // Common optional fields
  account?: string; // Used in payment, expense
  category?: string; // Used in expense

  // Payment specific fields
  mode?: 'Cheque' | 'Cash' | 'Online'; // Payment mode
  paidFrom?: string; // Source bank account
  chequeNo?: string; // Cheque number
  // Cheque date
  bankName?: string; // Bank name for cheque
  receivedBy?: string; // Recipient name

  // Contra specific fields
  fromAccount?: string; // Source account
  toAccount?: string; // Destination account

  // Journal specific fields
  debitAccount?: string; // Journal debit account
  creditAccount?: string; // Journal credit account
}

export interface AccountingEntryProps {
  entryType: AccountingEntryType;
  defaultValues?: Partial<AccountingFormData>;
  accounts: { value: string; label: string }[];
  banks?: { value: string; label: string }[];
  onSubmit: (values: AccountingFormData) => void;
  onCancel?: () => void;
}