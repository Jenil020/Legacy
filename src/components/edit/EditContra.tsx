'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { TextBox, SelectBox } from 'devextreme-react';
import { DateBox } from 'devextreme-react/date-box';
import { Button as DxButton } from 'devextreme-react/button';
import { ChevronRight } from 'lucide-react';
import { NumberBox } from 'devextreme-react/number-box';

interface ContraEntry {
  contrano: string;
  contradate: Date;
  referenceNo: string;
  notes: string;
  mode: "cash" | "upi" | "check";
  fromAccount: string;
  toAccount: string;
  amount: number;
}

interface EditContraDrawerProps {
  open: boolean;
  onClose: () => void;
  contraData?: ContraEntry | null;
}

const paymentModes = [
  { value: 'cash', text: 'Cash' },
  { value: 'upi', text: 'UPI' },
  { value: 'check', text: 'Cheque' },
];

const EditContraDrawer: React.FC<EditContraDrawerProps> = ({ open, onClose, contraData }) => {
  const [formData, setFormData] = useState<ContraEntry>({
    contrano: contraData?.contrano || 'CONTRA-001',
    contradate: contraData?.contradate || new Date(),
    referenceNo: contraData?.referenceNo || '',
    notes: contraData?.notes || '',
    mode: contraData?.mode || 'cash',
    fromAccount: contraData?.fromAccount || '',
    toAccount: contraData?.toAccount || '',
    amount: contraData?.amount || 0,
  });

  const handleChange = (field: keyof ContraEntry) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'amount' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contra data submitted:', formData);
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
                <h2 className="text-xl font-semibold">Edit Contra Entry</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 space-y-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Contra Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Contra No.</label>
                    <TextBox 
                      value={formData.contrano}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Date</label>
                    <DateBox 
                      value={formData.contradate}
                      onValueChanged={handleChange('contradate')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Transfer Mode</label>
                    <SelectBox
                      dataSource={paymentModes}
                      value={formData.mode}
                      onValueChanged={handleChange('mode')}
                      displayExpr="text"
                      valueExpr="value"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Reference No.</label>
                    <TextBox 
                      value={formData.referenceNo}
                      onValueChanged={handleChange('referenceNo')}
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1">From Account</label>
                    <TextBox 
                      value={formData.fromAccount}
                      onValueChanged={handleChange('fromAccount')}
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1">To Account</label>
                    <TextBox 
                      value={formData.toAccount}
                      onValueChanged={handleChange('toAccount')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Amount</label>
                    <NumberBox 
                      value={formData.amount}
                      onValueChanged={handleChange('amount')}
                      format="#,##0.##"
                      showSpinButtons={true}
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

export default EditContraDrawer;