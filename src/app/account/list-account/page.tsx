// account-list/page.tsx
'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditItemDrawer from '@/components/edit/EditItem';
import  UniformDataGrid  from '@/components/UniformDataGrid';


interface FormData {
  name: string;
  groupName: string;
  openingBalance: number;
  state: string;
  bankName: string;
}

export default function List() {
  const [users, setUsers] = useState<FormData[]>([
    { name: 'John Doe', groupName: 'Premium', openingBalance: 5000, state: 'Maharashtra', bankName: 'HDFC Bank' },
    { name: 'Jane Smith', groupName: 'Standard', openingBalance: 1500, state: 'Gujarat', bankName: 'ICICI Bank' },
    { name: 'Raj Kumar', groupName: 'Gold', openingBalance: 8000, state: 'Delhi', bankName: 'Axis Bank' },
    { name: 'Pooja Sharma', groupName: 'Silver', openingBalance: 3000, state: 'Punjab', bankName: 'SBI Bank' },
    { name: 'Amit Patel', groupName: 'Platinum', openingBalance: 12000, state: 'Gujarat', bankName: 'Kotak Bank' },
    { name: 'Sara Ali', groupName: 'Premium', openingBalance: 4500, state: 'Karnataka', bankName: 'HDFC Bank' },
    { name: 'Mohit Verma', groupName: 'Standard', openingBalance: 2000, state: 'Rajasthan', bankName: 'Punjab National Bank' }
  ]);
  const [editingItem, setEditingItem] = useState<FormData | null>(null);

  const columns: { dataField: keyof FormData; caption: string; format?: string; width?: number }[] = [
    { dataField: 'name', caption: 'Name' },
    { dataField: 'groupName', caption: 'Group Name' },
    { dataField: 'openingBalance', caption: 'Opening Balance', format: 'currency' },
    { dataField: 'state', caption: 'State' },
    { dataField: 'bankName', caption: 'Bank Name' },
  ];

  const handleDelete = (item: FormData) => {
    setUsers(users.filter(user => user.name !== item.name));
  };

  return (
    <>
      <UniformDataGrid
        data={users}
        columns={columns}
        addButtonText="+ Add Account"
        onAdd={() => console.log('Add new account')}
        onEdit={(item) => setEditingItem(item)}
        onDelete={handleDelete}
        deleteTitle="Are you absolutely sure?"
        deleteDescription={(item) => `This will permanently delete the account for ${item.name}.`}
      />
      
      {editingItem && (
        <EditItemDrawer
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
          itemData={editingItem}
        />
      )}
    </>
  );
}