'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { TextBox } from 'devextreme-react/text-box';
import { DateBox } from 'devextreme-react/date-box';
import { Switch } from 'devextreme-react/switch';
import { Button as DxButton } from 'devextreme-react/button';
import { ChevronRight } from 'lucide-react';

interface FirmData {
  companyName: string;
  printName: string;
  ownerName: string;
  address: string;
  financialYearFrom: Date;
  financialYearTo: Date;
  itPanNo: string;
  gstinNo: string;
  mobileNo: string;
  isActive: boolean;
}

interface EditFirmSliderProps {
  open: boolean;
  onClose: () => void;
  firmData?: FirmData | null ;
}

const EditFirmSlider: React.FC<EditFirmSliderProps> = ({ open, onClose, firmData }) => {
  const [formData, setFormData] = useState<FirmData>({
    companyName: firmData?.companyName || '',
    printName: firmData?.printName || '',
    ownerName: firmData?.ownerName || '',
    address: firmData?.address || '',
    financialYearFrom: firmData?.financialYearFrom || new Date(),
    financialYearTo: firmData?.financialYearTo || new Date(),
    itPanNo: firmData?.itPanNo || '',
    gstinNo: firmData?.gstinNo || '',
    mobileNo: firmData?.mobileNo || '',
    isActive: firmData?.isActive !== undefined ? firmData.isActive : true,
  });

  const handleChange = (field: keyof FirmData) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Firm data submitted:', formData);
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
                <h2 className="text-xl font-semibold">Edit Firm</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 space-y-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Firm Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Company Name</label>
                    <TextBox value={formData.companyName} onValueChanged={handleChange('companyName')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Print Name</label>
                    <TextBox value={formData.printName} onValueChanged={handleChange('printName')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Owner Name</label>
                    <TextBox value={formData.ownerName} onValueChanged={handleChange('ownerName')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Mobile Number</label>
                    <TextBox value={formData.mobileNo} onValueChanged={handleChange('mobileNo')} />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-medium text-gray-600 mb-1">Address</label>
                    <TextBox value={formData.address} onValueChanged={handleChange('address')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Financial Year From</label>
                    <DateBox value={formData.financialYearFrom} onValueChanged={handleChange('financialYearFrom')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Financial Year To</label>
                    <DateBox value={formData.financialYearTo} onValueChanged={handleChange('financialYearTo')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">IT PAN Number</label>
                    <TextBox value={formData.itPanNo} onValueChanged={handleChange('itPanNo')} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">GSTIN Number</label>
                    <TextBox value={formData.gstinNo} onValueChanged={handleChange('gstinNo')} />
                  </div>
                  <div className="flex items-center gap-4 col-span-2 pt-1">
                    <label className="text-xs font-medium text-gray-600">Firm Status</label>
                    <Switch
                      value={formData.isActive}
                      onValueChanged={handleChange('isActive')}
                      switchedOnText="Yes"
                      switchedOffText="No"
                      width={60}
                      height={24}
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

export default EditFirmSlider;
