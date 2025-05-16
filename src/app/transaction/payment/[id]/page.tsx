'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TransactionForm from '@/components/AccountingEntry';
import { AccountingFormData } from '@/app/types/accounting';

export default function PaymentEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<AccountingFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/payments/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const payment = await response.json();
        setFormData(payment);
      } catch (error) {
        console.error("Failed to fetch payment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSave = async (values: Record<string, any>) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) throw new Error('Update failed');
      
      const updatedData = await response.json();
      console.log('Payment updated:', updatedData);
      router.push('/payments'); // Redirect after successful update
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    router.push('/payments');
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!formData) return <div className="p-4">Payment not found</div>;

  return (
    <div className="p-4 space-y-6 pb-20">
      <TransactionForm
        moduleType="payment"
        onSave={handleSave}
        onCancel={handleCancel}
        defaultValues={formData}
      />
    </div>
  );
}