'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TransactionForm from '@/components/AccountingEntry'; // Same form as payment
import { AccountingFormData } from '@/app/types/accounting';

export default function JournalEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<AccountingFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/journals/${id}`);
        if (!response.ok) throw new Error('Failed to fetch journal entry');
        const journal = await response.json();
        setFormData(journal);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSave = async (values: Record<string, any>) => {
    try {
      const response = await fetch(`/api/journals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedData = await response.json();
      console.log('Journal updated:', updatedData);
      router.push('/journals'); // Redirect after update
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    router.push('/journals');
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!formData) return <div className="p-4">Journal entry not found</div>;

  return (
    <div className="p-4 space-y-6 pb-20">
      <TransactionForm
        moduleType="journal"
        onSave={handleSave}
        onCancel={handleCancel}
        defaultValues={formData}
      />
    </div>
  );
}
