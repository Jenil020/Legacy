'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { TextBox, SelectBox } from 'devextreme-react';
import { DateBox } from 'devextreme-react/date-box';
import { Button as DxButton } from 'devextreme-react/button';
import { ChevronRight } from 'lucide-react';
import { NumberBox } from 'devextreme-react/number-box';

interface JournalEntry {
  jvno: string;
  jvdate: Date;
  referenceNo: string;
  notes: string;
  entries: {
    account: string;
    debit: number;
    credit: number;
  }[];
}

interface EditJournalDrawerProps {
  open: boolean;
  onClose: () => void;
  journalData?: JournalEntry | null;
}

const EditJournalDrawer: React.FC<EditJournalDrawerProps> = ({ open, onClose, journalData }) => {
  const [formData, setFormData] = useState<JournalEntry>({
    jvno: journalData?.jvno || 'JV0001',
    jvdate: journalData?.jvdate || new Date(),
    referenceNo: journalData?.referenceNo || '',
    notes: journalData?.notes || '',
    entries: journalData?.entries || [
      { account: '', debit: 0, credit: 0 },
      { account: '', debit: 0, credit: 0 }
    ]
  });

  const handleChange = (field: keyof JournalEntry) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEntryChange = (index: number, field: keyof JournalEntry['entries'][0]) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => {
      const newEntries = [...prev.entries];
      newEntries[index] = { 
        ...newEntries[index], 
        [field]: field === 'debit' || field === 'credit' ? Number(value) : value 
      };
      return { ...prev, entries: newEntries };
    });
  };

  const addNewEntry = () => {
    setFormData(prev => ({
      ...prev,
      entries: [...prev.entries, { account: '', debit: 0, credit: 0 }]
    }));
  };

  const removeEntry = (index: number) => {
    if (formData.entries.length <= 2) return; // Keep at least 2 entries
    setFormData(prev => ({
      ...prev,
      entries: prev.entries.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Journal data submitted:', formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-[60] w-full max-w-xl h-full bg-white shadow-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div className="flex gap-2">
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                  <ChevronRight className="w-6 h-6 font-semibold" />
                </button>
                <h2 className="text-xl font-semibold">Edit Journal Entry</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 space-y-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Journal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Journal Voucher No.</label>
                    <TextBox 
                      value={formData.jvno}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Date</label>
                    <DateBox 
                      value={formData.jvdate}
                      onValueChanged={handleChange('jvdate')}
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1">Reference No.</label>
                    <TextBox 
                      value={formData.referenceNo}
                      onValueChanged={handleChange('referenceNo')}
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1">Notes</label>
                    <TextBox 
                      value={formData.notes}
                      onValueChanged={handleChange('notes')}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Journal Entries</h3>
                <div className="space-y-4">
                  {formData.entries.map((entry, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-white rounded border border-gray-200">
                      <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Account</label>
                        <TextBox 
                          value={entry.account}
                          onValueChanged={handleEntryChange(index, 'account')}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Debit</label>
                        <NumberBox 
                          value={entry.debit}
                          onValueChanged={handleEntryChange(index, 'debit')}
                          format="#,##0.##"
                          showSpinButtons={true}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Credit</label>
                        <NumberBox 
                          value={entry.credit}
                          onValueChanged={handleEntryChange(index, 'credit')}
                          format="#,##0.##"
                          showSpinButtons={true}
                        />
                      </div>
                      {index > 1 && (
                        <div className="col-span-3 flex justify-end">
                          <DxButton
                            text="Remove Entry"
                            type="normal"
                            stylingMode="text"
                            onClick={() => removeEntry(index)}
                            elementAttr={{
                              class: 'h-6 px-2 text-xs text-red-500 hover:bg-red-50',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <DxButton
                    text="Add New Entry"
                    type="normal"
                    stylingMode="text"
                    onClick={addNewEntry}
                    elementAttr={{
                      class: 'h-8 px-3 text-xs text-blue-500 hover:bg-blue-50',
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-gray-50 p-3">
                <DxButton
                  text="Cancel"
                  type="normal"
                  stylingMode="outlined"
                  onClick={onClose}
                  elementAttr={{
                    class: 'h-8 px-4 text-xs border-gray-300 text-gray-700 hover:bg-gray-100',
                  }}
                />
                <DxButton
                  text="Save"
                  type="default"
                  useSubmitBehavior={true}
                  stylingMode="contained"
                  elementAttr={{
                    class: 'h-8 px-4 text-xs !bg-black !text-white hover:!bg-gray-800',
                  }}
                />
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditJournalDrawer;