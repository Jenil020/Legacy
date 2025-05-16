'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { TextBox, SelectBox } from 'devextreme-react';
import { DateBox } from 'devextreme-react/date-box';
import { Button as DxButton } from 'devextreme-react/button';
import { ChevronRight } from 'lucide-react';
import { NumberBox } from 'devextreme-react/number-box';

interface PaymentData {
  voucherNo: string;
  date: Date;
  type: string;
  fromAccount: string;
  toAccount: string;
  checkNo: string;
  amount: number;
}

interface EditPaymentDrawerProps {
  open: boolean;
  onClose: () => void;
  paymentData?: PaymentData | null;
}

const paymentTypes = [
  { value: 'Payment', text: 'Payment' },
  { value: 'Receipt', text: 'Receipt' },
  { value: 'Journal', text: 'Journal' },
  { value: 'Contra', text: 'Contra' },
];

const accountOptions = [
  { value: 'Cash', text: 'Cash' },
  { value: 'Bank', text: 'Bank' },
  { value: 'Accounts Receivable', text: 'Accounts Receivable' },
  { value: 'Accounts Payable', text: 'Accounts Payable' },
];

const EditPaymentDrawer: React.FC<EditPaymentDrawerProps> = ({ open, onClose, paymentData }) => {
  const [formData, setFormData] = useState<PaymentData>({
    voucherNo: paymentData?.voucherNo || '',
    date: paymentData?.date || new Date(),
    type: paymentData?.type || 'Payment',
    fromAccount: paymentData?.fromAccount || '',
    toAccount: paymentData?.toAccount || '',
    checkNo: paymentData?.checkNo || '',
    amount: paymentData?.amount || 0,
  });

  const handleChange = (field: keyof PaymentData) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'amount' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment data submitted:', formData);
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
                <h2 className="text-xl font-semibold">Edit Transaction</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Voucher No */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Voucher No.</label>
                  <TextBox 
                    value={formData.voucherNo}
                    onValueChanged={handleChange('voucherNo')}
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Date</label>
                  <DateBox 
                    value={formData.date}
                    onValueChanged={handleChange('date')}
                  />
                </div>

                {/* Type */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Type</label>
                  <SelectBox
                    dataSource={paymentTypes}
                    value={formData.type}
                    onValueChanged={handleChange('type')}
                    displayExpr="text"
                    valueExpr="value"
                  />
                </div>

                {/* Check No */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Check No.</label>
                  <TextBox 
                    value={formData.checkNo}
                    onValueChanged={handleChange('checkNo')}
                  />
                </div>

                {/* From Account */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">From Account</label>
                  <SelectBox
                    dataSource={accountOptions}
                    value={formData.fromAccount}
                    onValueChanged={handleChange('fromAccount')}
                    displayExpr="text"
                    valueExpr="value"
                  />
                </div>

                {/* To Account */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">To Account</label>
                  <SelectBox
                    dataSource={accountOptions}
                    value={formData.toAccount}
                    onValueChanged={handleChange('toAccount')}
                    displayExpr="text"
                    valueExpr="value"
                  />
                </div>

                {/* Amount */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Amount</label>
                  <NumberBox 
                    value={formData.amount}
                    onValueChanged={handleChange('amount')}
                    format="₹ #,##0.##"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white p-4 border-t">
                <DxButton
                  text="Cancel"
                  type="normal"
                  stylingMode="outlined"
                  onClick={onClose}
                  elementAttr={{
                    class: 'h-10 px-4 text-sm border-gray-300 text-gray-700 hover:bg-gray-100',
                  }}
                />
                <DxButton
                  text="Save"
                  type="default"
                  useSubmitBehavior={true}
                  stylingMode="contained"
                  elementAttr={{
                    class: 'h-10 px-4 text-sm !bg-black !text-white hover:!bg-gray-800',
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

export default EditPaymentDrawer;