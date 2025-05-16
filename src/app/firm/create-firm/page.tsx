'use client';
import React, { useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { TextBox } from 'devextreme-react/text-box';
import { DateBox } from 'devextreme-react/date-box';
import { Button } from 'devextreme-react/button';
import { Switch } from 'devextreme-react/switch';
import { NumberBox } from 'devextreme-react/number-box';

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

const CreateFirmPage = () => {
  const [formData, setFormData] = useState<FirmData>({
    companyName: '',
    printName: '',
    ownerName: '',
    address: '',
    financialYearFrom: new Date(),
    financialYearTo: new Date(),
    itPanNo: '',
    gstinNo: '',
    mobileNo: '',
    isActive: true
  });

  const handleValueChange = (field: keyof FirmData) => (e: any) => {
    const value = e.value !== undefined ? e.value : e;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="max-w-6xl mx-auto p-2 rounded-2xl  border border-gray-100">
      

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Combined Company & Financial Details Section */}
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Company Details Column */}
            <div className="space-y-3">
              <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Company Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">Company Name</label>
                  <TextBox
                    value={formData.companyName}
                    onValueChanged={handleValueChange('companyName')}
                    placeholder="Company name"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">Print Name</label>
                  <TextBox
                    value={formData.printName}
                    onValueChanged={handleValueChange('printName')}
                    placeholder="Print name"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-xs font-medium text-gray-600 mb-1">Owner Name</label>
                  <TextBox
                    value={formData.ownerName}
                    onValueChanged={handleValueChange('ownerName')}
                    placeholder="Owner name"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-xs font-medium text-gray-600 mb-1">Address</label>
                  <TextBox
                    value={formData.address}
                    onValueChanged={handleValueChange('address')}
                    placeholder="Company address"
                    elementAttr={{ class: "rounded-md h-16 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                    
                  />
                </div>
              </div>
            </div>

            {/* Financial Details Column */}
            <div className="space-y-3">
              <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Financial Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">From Date</label>
                  <DateBox
                    value={formData.financialYearFrom}
                    onValueChanged={handleValueChange('financialYearFrom')}
                    placeholder="Start date"
                    type="date"
                    displayFormat="dd/MM/yyyy"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">To Date</label>
                  <DateBox
                    value={formData.financialYearTo}
                    onValueChanged={handleValueChange('financialYearTo')}
                    placeholder="End date"
                    type="date"
                    displayFormat="dd/MM/yyyy"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">IT PAN No</label>
                  <TextBox
                    value={formData.itPanNo}
                    onValueChanged={handleValueChange('itPanNo')}
                    placeholder="PAN number"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">GSTIN No</label>
                  <TextBox
                    value={formData.gstinNo}
                    onValueChanged={handleValueChange('gstinNo')}
                    placeholder="GSTIN number"
                    elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Contact Details</h3>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">Mobile No</label>
              <NumberBox
                value={formData.mobileNo}
                onValueChanged={handleValueChange('mobileNo')}
                placeholder="Mobile number"
                elementAttr={{ class: "rounded-md h-8 text-sm border-gray-300 hover:border-blue-400 focus:border-blue-500" }}
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <label className="text-xs font-medium text-gray-600">Active Status</label>
              <Switch
                value={formData.isActive}
                onValueChanged={handleValueChange('isActive')}
                width={36}
                height={18}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            text="Cancel"
            type="normal"
            stylingMode="outlined"
            className="h-8 px-4 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
          />
          <Button
            text="Create Firm"
            type="default"
            stylingMode="contained"
            useSubmitBehavior={true}
            className="h-8 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFirmPage;