'use client';

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { SelectBox } from 'devextreme-react/select-box';
import { TextBox } from 'devextreme-react/text-box';
import { NumberBox } from 'devextreme-react/number-box';
import { Switch } from 'devextreme-react/switch';
import { Button as DxButton } from 'devextreme-react/button';
import { TabPanel, Item as TabItem } from 'devextreme-react/tab-panel';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FormData {
  groupName: string;
  name: string;
  printName: string;
  openingBalance: number;
  balanceType: 'Cr' | 'Dr';
  isActive: boolean;
  address1: string;
  address2: string;
  state: string;
  pin: string;
  bankName: string;
  branch: string;
  accountNo: string;
  ifsc: string;
  gstNo: string;
  panNo: string;
}

interface EditItemDrawerProps {
  open: boolean;
  onClose: () => void;
  itemData?: Partial<FormData>;
}

const EditItemDrawer: React.FC<EditItemDrawerProps> = ({ open, onClose, itemData }) => {
  const [formData, setFormData] = useState<FormData>({
    groupName: itemData?.groupName || '',
    name: itemData?.name || '',
    printName: itemData?.printName || '',
    openingBalance: itemData?.openingBalance || 0,
    balanceType: itemData?.balanceType || 'Cr',
    isActive: itemData?.isActive !== undefined ? itemData.isActive : true,
    address1: itemData?.address1 || '',
    address2: itemData?.address2 || '',
    state: itemData?.state || '',
    pin: itemData?.pin || '',
    bankName: itemData?.bankName || '',
    branch: itemData?.branch || '',
    accountNo: itemData?.accountNo || '',
    ifsc: itemData?.ifsc || '',
    gstNo: itemData?.gstNo || '',
    panNo: itemData?.panNo || '',
  });

  const [showTabs, setShowTabs] = useState(false);

  const groupOptions = ['Sales Party', 'Purchase Party', 'Other'];
  const balanceTypeOptions = ['Cr', 'Dr'];

  const handleValueChange = (field: keyof FormData) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'groupName') {
      setShowTabs(['Sales Party', 'Purchase Party'].includes(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
  className="fixed inset-0 z-50 bg-black backdrop-blur-sm"  // Changed z-40 to z-50
  onClick={onClose}
/>
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ duration: 0.3 }}
  className="fixed top-0 right-0 z-[60] w-full max-w-xl h-full bg-white shadow-xl overflow-y-auto"  // Changed z-50 to z-[60]
>
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div className="flex gap-2">
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                  <ChevronRight className="w-6 h-6 font-semibold" />
                </button>
                <h2 className="text-xl font-semibold">Edit Account</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 space-y-6">
              {/* Basic Information Section */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Group Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Group Name</label>
                    <SelectBox
                      dataSource={groupOptions}
                      value={formData.groupName}
                      onValueChanged={handleValueChange('groupName')}
                      placeholder="Select Group"
                      elementAttr={{
                        class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                      }}
                    />
                  </div>

                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Name</label>
                    <TextBox
                      value={formData.name}
                      onValueChanged={handleValueChange('name')}
                      elementAttr={{
                        class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                      }}
                    />
                  </div>

                  {/* Print Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Print Name</label>
                    <TextBox
                      value={formData.printName}
                      onValueChanged={handleValueChange('printName')}
                      elementAttr={{
                        class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                      }}
                    />
                  </div>

                  {/* Opening Balance and Type */}
                  <div className="flex flex-col md:flex-row gap-3 col-span-2">
                    <div className="flex flex flex-col">
                      <label className="text-xs font-medium text-gray-600 mb-1">Opening Balance</label>
                      <NumberBox
                        value={formData.openingBalance}
                        onValueChanged={handleValueChange('openingBalance')}
                        format="$ #,##0.##"
                        showClearButton={true}
                        elementAttr={{
                          class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                        }}
                      />
                    </div>
                    <div className="w-24 flex flex-col">
                      <label className="text-xs font-medium text-gray-600 mb-1">Type</label>
                      <SelectBox
                        dataSource={balanceTypeOptions}
                        value={formData.balanceType}
                        onValueChanged={handleValueChange('balanceType')}
                        elementAttr={{
                          class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                        }}
                      />
                    </div>
                  </div>

                  {/* Is Active */}
                  <div className="flex items-center gap-4 col-span-2 pt-1">
                    <label className="text-xs font-medium text-gray-600">Account Status</label>
                    <Switch
                      value={formData.isActive}
                      onValueChanged={handleValueChange('isActive')}
                      switchedOnText="Yes"
                      switchedOffText="No"
                      width={60}
                      height={24}
                      elementAttr={{
                        class: "rounded-full [&_.dx-switch-container]:!bg-gray-200 [&_.dx-switch-handle]:!bg-white"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              {showTabs && (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Additional Details</h3>
                  <TabPanel>
                    <TabItem title="Address Details" icon="home">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">Address Line 1</label>
                          <TextBox
                            value={formData.address1}
                            onValueChanged={handleValueChange('address1')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">Address Line 2</label>
                          <TextBox
                            value={formData.address2}
                            onValueChanged={handleValueChange('address2')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">State</label>
                          <TextBox
                            value={formData.state}
                            onValueChanged={handleValueChange('state')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">PIN Code</label>
                          <TextBox
                            value={formData.pin}
                            onValueChanged={handleValueChange('pin')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                      </div>
                    </TabItem>
                    <TabItem title="Bank Details" icon="money">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">Bank Name</label>
                          <TextBox
                            value={formData.bankName}
                            onValueChanged={handleValueChange('bankName')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">Branch</label>
                          <TextBox
                            value={formData.branch}
                            onValueChanged={handleValueChange('branch')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">Account Number</label>
                          <TextBox
                            value={formData.accountNo}
                            onValueChanged={handleValueChange('accountNo')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">IFSC Code</label>
                          <TextBox
                            value={formData.ifsc}
                            onValueChanged={handleValueChange('ifsc')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                      </div>
                    </TabItem>
                    <TabItem title="GST Info" icon="card">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">GST Number</label>
                          <TextBox
                            value={formData.gstNo}
                            onValueChanged={handleValueChange('gstNo')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-medium text-gray-600 mb-1">PAN Number</label>
                          <TextBox
                            value={formData.panNo}
                            onValueChanged={handleValueChange('panNo')}
                            elementAttr={{
                              class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            }}
                          />
                        </div>
                      </div>
                    </TabItem>
                  </TabPanel>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 sticky bottom-0 bg-gray-50 p-3">
                <DxButton
                  text="Cancel"
                  type="normal"
                  stylingMode="outlined"
                  onClick={onClose}
                  elementAttr={{
                    class: "h-8 px-4 text-xs border-gray-300 text-gray-700 hover:bg-gray-100"
                  }}
                />
                <DxButton
                  text="Save"
                  type="default"
                  useSubmitBehavior={true}
                  stylingMode="contained"
                  elementAttr={{
                    class: "h-8 px-4 text-xs !bg-black !text-white hover:!bg-gray-800"
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

export default EditItemDrawer;