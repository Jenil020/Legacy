'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Form, SimpleItem, GroupItem } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/ui/text_box';
import 'devextreme/ui/date_box';
import 'devextreme/ui/select_box';
import 'devextreme/ui/text_area';
import 'devextreme/ui/number_box';

type EditorType = 'dxTextBox' | 'dxDateBox' | 'dxSelectBox' | 'dxTextArea' | 'dxNumberBox';
interface FieldConfig {
  dataField: string;
  label: string;
  colSpan?: number;
  editorType?: EditorType;
  editorOptions?: any;
}

interface ModuleConfig {
  title: string;
  fields: FieldConfig[];
}

interface TransactionFormProps {
  moduleType: keyof typeof fieldConfigs;
  onCancel: () => void;
  onSave: (data: Record<string, any>) => void;
  defaultValues?: Record<string, any>;
}

// Sample data for dropdowns
const ledgerOptions = ['Cash Account', 'Bank Account', 'Accounts Receivable', 'Accounts Payable'];
const receivedByOptions = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];

const fieldConfigs: Record<string, ModuleConfig> = {
  payment: {
    title: 'Payment Entry',
    fields: [
      { 
        dataField: 'voucherNo', 
        label: 'Voucher No', 
        editorType: 'dxTextBox',
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'date', 
        label: 'Date', 
        editorType: 'dxDateBox', 
        colSpan: 1,
        editorOptions: {
          displayFormat: 'dd/MM/yyyy',
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'ledgerName', 
        label: 'Ledger Name', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ledgerOptions,
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'receivedBy', 
        label: 'Received By', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: receivedByOptions,
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'checkBankName', 
        label: 'Bank Name', 
        editorType: 'dxTextBox',
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'checkNo', 
        label: 'Check No',
        editorType: 'dxTextBox', 
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'checkDate', 
        label: 'Check Date', 
        editorType: 'dxDateBox', 
        colSpan: 1,
        editorOptions: {
          displayFormat: 'dd/MM/yyyy',
          elementAttr: { class: 'custom-editor' }
        }
      }
    ]
  },
  journal: {
    title: 'Journal Entry',
    fields: [
      { 
        dataField: 'voucherNo', 
        label: 'Voucher No', 
        editorType: 'dxTextBox',
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'date', 
        label: 'Date', 
        editorType: 'dxDateBox', 
        colSpan: 1,
        editorOptions: {
          displayFormat: 'dd/MM/yyyy',
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'fromDr', 
        label: 'From (Dr)', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ledgerOptions,
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'toCr', 
        label: 'To (Cr)', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ledgerOptions,
          elementAttr: { class: 'custom-editor' }
        }
      }
    ]
  },
  contra: {
    title: 'Contra Entry',
    fields: [
      { 
        dataField: 'voucherNo', 
        label: 'Voucher No', 
        editorType: 'dxTextBox',
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'date', 
        label: 'Date', 
        editorType: 'dxDateBox', 
        colSpan: 1,
        editorOptions: {
          displayFormat: 'dd/MM/yyyy',
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'fromAccount', 
        label: 'From Account', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ledgerOptions,
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'toAccount', 
        label: 'To Account', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ledgerOptions,
          elementAttr: { class: 'custom-editor' }
        }
      }
    ]
  },
  expense: {
    title: 'Expense Entry',
    fields: [
      { 
        dataField: 'voucherNo', 
        label: 'Voucher No', 
        colSpan: 1,
        editorOptions: {
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'date', 
        label: 'Date', 
        editorType: 'dxDateBox', 
        colSpan: 1,
        editorOptions: {
          displayFormat: 'dd/MM/yyyy',
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'expenseHead', 
        label: 'Expense Head', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: ['Office Supplies', 'Travel', 'Utilities', 'Rent'],
          elementAttr: { class: 'custom-editor' }
        }
      },
      { 
        dataField: 'paidTo', 
        label: 'Paid To', 
        colSpan: 2,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: receivedByOptions,
          elementAttr: { class: 'custom-editor' }
        }
      }
    ]
  }
};

const TransactionForm: React.FC<TransactionFormProps> = ({ moduleType, onCancel, onSave ,defaultValues = {} }) => {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues || {});
  const formRef = useRef<any>(null);
  const config = fieldConfigs[moduleType];

  useEffect(() => {
    return () => {
      formRef.current?.instance?.dispose?.();
    };
  }, []);

  const handleSubmit = () => {
    try {
      if (onSave) onSave(formData);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleFieldChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.dataField]: e.value
    }));
  };

  const renderFields = () => {
    const fields = [];
    fields.push(
      <GroupItem key="voucherGroup" colCount={4} colSpan={2}>
        {['voucherNo', 'date'].map((fieldKey) => {
          const field = config.fields.find((f) => f.dataField === fieldKey);
          return (
            <SimpleItem
              key={field?.dataField}
              dataField={field?.dataField}
              label={{ text: field?.label }}
              editorType={field?.editorType || 'dxTextBox'}
              editorOptions={{
                elementAttr: { class: 'custom-editor' },
                ...(field?.editorOptions || {})
              }}
              colSpan={field?.colSpan || 2}
            />
          );
        })}
      </GroupItem>
    );
    
    
    // Regular fields (excluding voucherNo and date since we've already added them)
    for (const field of config.fields) {
      if (field.dataField === 'voucherNo' || field.dataField === 'date') continue;
      
      if (moduleType === 'payment' && 
          (field.dataField === 'checkBankName' || field.dataField === 'checkNo' || field.dataField === 'checkDate')) {
        continue;
      }
      
      fields.push(
        <SimpleItem
          key={field.dataField}
          dataField={field.dataField}
          label={{ text: field.label }}
          editorType={field.editorType || 'dxTextBox'}
          editorOptions={{
            elementAttr: { class: 'custom-editor' },
            ...(field.editorOptions || {})
          }}
          colSpan={field.colSpan || 1}
        />
      );
    }

    // For payment module, group bank name, check no, and check date
    if (moduleType === 'payment') {
      fields.push(
        <GroupItem key="bankGroup" colSpan={2} colCount={3}>
          <SimpleItem
            dataField="checkBankName"
            label={{ text: 'Bank Name' }}
            editorType="dxTextBox"
            editorOptions={{
              elementAttr: { class: 'custom-editor' }
            }}
          />
          <SimpleItem
            dataField="checkNo"
            label={{ text: 'Check No' }}
            editorType="dxTextBox"
            editorOptions={{
              elementAttr: { class: 'custom-editor' }
            }}
          />
          <SimpleItem
            dataField="checkDate"
            label={{ text: 'Check Date' }}
            editorType="dxDateBox"
            editorOptions={{
              displayFormat: 'dd/MM/yyyy',
              elementAttr: { class: 'custom-editor' }
            }}
          />
        </GroupItem>
      );
    }

    // Amount field (full width)
    fields.push(
      <SimpleItem
        key="amount"
        dataField="amount"
        label={{ text: 'Amount' }}
        colSpan={2}
        editorOptions={{
          elementAttr: { class: 'custom-editor' },
          width: '32%'
        }}
      />
    );

    // Remarks field (full width with larger textarea)
    fields.push(
      <SimpleItem
        key="remarks"
        dataField="remarks"
        label={{ text: 'Remarks' }}
        editorType="dxTextArea"
        colSpan={2}
        editorOptions={{
          elementAttr: { class: 'custom-editor custom-textarea' },
          height: 80,
          width: '100%'
        }}
      />
    );

    return fields;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-5 rounded-xl border border-gray-200 bg-gray-50">
      <style>
        {`
          .custom-editor .dx-texteditor-input,
          .custom-editor .dx-texteditor-container,
          .custom-editor .dx-datebox {
            height: 30px;
            font-size: 13px;
            border: none;
            border-bottom: 1px solid #ddd;
            border-radius: 0;
            background-color: transparent;
          }
          
          .custom-textarea .dx-texteditor-input,
          .custom-textarea .dx-texteditor-container {
            min-height: 80px;
            height: auto;
          }
          
          .custom-editor .dx-texteditor.dx-state-hover,
          .custom-editor .dx-texteditor.dx-state-focused {
            border-bottom: 1px solid #3b82f6;
            box-shadow: none;
          }

          .dx-label {
            font-size: 12px !important;
            font-weight: bold !important;
            color: rgb(0, 0, 0) !important;
            margin-bottom: 4px !important;
          }
          
          .dx-form-group-caption {
            font-size: 14px !important;
            font-weight: 600 !important;
            color: #374151 !important;
            padding-bottom: 8px !important;
            border-bottom: 1px solid #e5e7eb !important;
            margin-bottom: 16px !important;
          }
          
          .dx-button.dx-button-normal {
            border-color: #d1d5db;
            color: #374151;
            height: 32px;
            padding: 0 16px;
            font-size: 13px;
          }
          
          .dx-button.dx-button-default {
            background-color: #000;
            color: #fff;
            height: 32px;
            padding: 0 16px;
            font-size: 13px;
          }
          
          .dx-button.dx-button-default.dx-state-hover {
            background-color: #1a1a1a;
          }
          
          /* Ensure form items take full width of their container */
          .dx-form-group-content {
            width: 100%;
          }
             .dx-list-item {
            transition: background-color 0.2s ease;
          }

          .dx-list-item:hover {
            background-color:rgb(232, 232, 233); /* light gray on hover */
            cursor: pointer;
          }
        `}
      </style>
      
      <Form
        ref={formRef}
        formData={formData}
        onFieldDataChanged={handleFieldChange}
        labelLocation="top"
        showColonAfterLabel={true}
        width="100%"
      >
        <GroupItem>
          {renderFields()}
        </GroupItem>
      </Form>

      <div className="flex justify-end gap-3 pt-2 mt-2 border-t border-gray-200">
        <Button 
          text="Cancel" 
          onClick={onCancel} 
          stylingMode="outlined" 
          type="normal" 
        />
        <Button 
          text="Save" 
          type="default" 
          stylingMode="contained" 
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default TransactionForm;