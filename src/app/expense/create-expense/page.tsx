'use client';

import TransactionForm from "@/components/AccountingEntry";

export default function ExpensePage() {
  const handleSave = (data: Record<string, any>) => {
    console.log("Saving transaction:", data);
    // submit to API here
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // reset form or navigate
  };

  return (
    <div className="w-full">
      <TransactionForm moduleType="expense" onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}