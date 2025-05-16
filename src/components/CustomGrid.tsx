'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
import { Pencil } from "lucide-react";

type ColumnDef = {
  key: string;
  label: string;
  editable?: boolean;
  width?: string;
};

type RowData = {
  id: number;
  [key: string]: any;
};

interface EditableGridProps {
  columns: ColumnDef[];
  initialRows?: RowData[];
}

const EditableGrid: React.FC<EditableGridProps> = ({ columns, initialRows = [] }) => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map(c => c.key));
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  const handleChange = (index: number, key: string, value: string) => {
    const updated = [...rows];
    updated[index][key] = value;

    if (updated[index].qty !== undefined && updated[index].rate !== undefined) {
      const qty = parseFloat(updated[index].qty) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = qty * rate;
    }

    setRows(updated);
  };

  const addRow = () => {
    const newRow: RowData = { id: Date.now() };
    columns.forEach(col => (newRow[col.key] = ''));
    newRow.amount = 0;
    setRows([...rows, newRow]);
  };

  const deleteRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const toggleColumn = (key: string) => {
    setVisibleColumns(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const subtotal = useMemo(() => {
    return rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0).toFixed(2);
  }, [rows]);

  const itemOptions = [
    { label: "Create New Item", value: "__new__" },
    { label: "Laptop", value: "laptop" },
    { label: "Consulting Service", value: "consulting" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [iseditSidebarOpen, setIseditSidebarOpen] = useState(false);

  return (
    <div className="border rounded-md overflow-x-auto text-sm relative">
      {/* Column Chooser Button */}
      <div className="absolute right-2 top-1 z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <SlidersHorizontal className="w-4 h-4 mb-3 mr-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-80">
            <DialogHeader>
              <DialogTitle>Select Columns</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {columns.map(col => (
                <div key={col.key} className="flex items-center gap-2">
                  <Checkbox
                    checked={visibleColumns.includes(col.key)}
                    onCheckedChange={() => toggleColumn(col.key)}
                    id={`col-${col.key}`}
                  />
                  <label htmlFor={`col-${col.key}`} className="text-sm">
                    {col.label}
                  </label>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-left">
          <tr>
            {columns
              .filter(col => visibleColumns.includes(col.key))
              .map(col => (
                <th key={col.key} className={`px-2 py-2 ${col.width ?? 'w-auto'}`}>{col.label}</th>
              ))}
            <th className="w-10 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {columns
                .filter(col => visibleColumns.includes(col.key))
                .map(col => (
                  <td key={col.key} className="px-1 py-1">
                    {col.editable !== false ? (
                      col.key === 'goods' ? (
                        <div className="flex items-center gap-1">
                        <Select
                          value={row[col.key] ?? ''}
                          onValueChange={(selected) => {
                            if (selected === "__new__") {
                              setIsSidebarOpen(true);
                              return;
                            }
                            handleChange(rowIndex, col.key, selected);
                          }}
                        >
                          <SelectTrigger className="h-8 w-130">
                            <SelectValue placeholder="Select item or service from list" />
                          </SelectTrigger>
                          <SelectContent>
                            {itemOptions.map(opt => (
                              <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className={opt.value === '__new__' ? 'text-blue-700 items-center bg-blue-50 font-semibold' : ''}
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      
                        {/* Edit icon next to Select box */}
                        <button
                              type="button"
                              className="text-gray-500 mr-3 hover:text-blue-600"
                              onClick={() => setIseditSidebarOpen(true)}
                            >
                              <Pencil size={16} />
                            </button>
                      </div>
                      

                      ) : (
                        <Input
                          value={row[col.key] ?? ''}
                          onChange={e => handleChange(rowIndex, col.key, e.target.value)}
                          className={`h-8`}
                        />
                      )
                      
                    ) : (
                      <div className="h-8 flex items-center">{row[col.key]}</div>
                    )}
                  </td>
                ))}
              <td className="px-2 py-1 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setConfirmDeleteIndex(rowIndex)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      {/* Add Row Button */}
      <div className="flex justify-start gap-200 p-2">
        <Button variant="outline" size="sm" onClick={addRow} className="gap-1">
          <Plus size={16} /> Add Row
        </Button>
        
        <div className="bg-gray font-semibold">
            {columns
              .filter(col => visibleColumns.includes(col.key))
              .map(col => (
                <div key={col.key} className="px-2 py-0">
                  {col.key === 'amount' ? `₹${subtotal}` : ''}
                </div>
              ))}
          </div>
       </div>
      
        <AlertDialog open={confirmDeleteIndex !== null} onOpenChange={() => setConfirmDeleteIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning: Remove Row</AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            Are you sure you want to remove {confirmDeleteIndex !== null ? `${confirmDeleteIndex + 1}ᵗʰ` : ''} row?
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmDeleteIndex !== null) {
                  deleteRow(confirmDeleteIndex);
                  setConfirmDeleteIndex(null);
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export {EditableGrid};
