'use client';

import { DataGrid, Column, Paging, Pager, HeaderFilter, Toolbar, Item } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { Button } from '@/components/ui/button';
import { Expand, Maximize2, Minimize2, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditFirmDrawer from '@/components/edit/EditFirm'; // You'll need to create this component
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Firm {
  id: number;
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

export default function FirmList() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState<Firm | null>(null);
  const [firms, setFirms] = useState<Firm[]>([
    {
      id: 1,
      companyName: 'ABC Enterprises',
      printName: 'ABC Ent.',
      ownerName: 'Rajesh Kumar',
      address: '123 Business Park, Mumbai',
      financialYearFrom: new Date(),
      financialYearTo: new Date(),
      itPanNo: 'ABCDE1234F',
      gstinNo: '27ABCDE1234F1Z5',
      mobileNo: '9876543210',
      isActive: true
    },
    {
      id: 2,
      companyName: 'ABC Enterprises',
      printName: 'ABC Ent.',
      ownerName: 'Rajesh Kumar',
      address: '123 Business Park, Mumbai',
      financialYearFrom: new Date(),
      financialYearTo: new Date(),
      itPanNo: 'ABCDE1234F',
      gstinNo: '27ABCDE1234F1Z5',
      mobileNo: '9876543210',
      isActive: true
    },
    {
      id: 3,
      companyName: 'ABC Enterprises',
      printName: 'ABC Ent.',
      ownerName: 'Rajesh Kumar',
      address: '123 Business Park, Mumbai',
      financialYearFrom: new Date(),
      financialYearTo: new Date(),
      itPanNo: 'ABCDE1234F',
      gstinNo: '27ABCDE1234F1Z5',
      mobileNo: '9876543210',
      isActive: true
    },
    {
      id: 3,
      companyName: 'ABC Enterprises',
      printName: 'ABC Ent.',
      ownerName: 'Rajesh Kumar',
      address: '123 Business Park, Mumbai',
      financialYearFrom: new Date(),
      financialYearTo: new Date(),
      itPanNo: 'ABCDE1234F',
      gstinNo: '27ABCDE1234F1Z5',
      mobileNo: '9876543210',
      isActive: false
    },
  ]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [firmToDelete, setFirmToDelete] = useState<Firm | null>(null);

  const handleDeleteClick = (firm: Firm) => {
    setFirmToDelete(firm);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (firmToDelete) {
      setFirms(firms.filter(f => f.id !== firmToDelete.id));
      setDeleteDialogOpen(false);
      setFirmToDelete(null);
    }
  };

  const statusCellRender = ({ data }: { data: Firm }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      data.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {data.isActive ? 'Active' : 'Inactive'}
    </span>
  );

  const mobileNoCellRender = ({ data }: { data: Firm }) => (
    <a href={`tel:${data.mobileNo}`} className="text-blue-600 hover:underline">
      {data.mobileNo}
    </a>
  );

  return (
    <div className={`min-h-screen w-full font-inter text-[15px] transition-all duration-400 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto' : 'p-4'}`}>
      <div className="rounded-2xl border p-2 w-full border-gray-200 shadow-md bg-gray-50 relative overflow-hidden">
        <DataGrid
          dataSource={firms}
          keyExpr="id"
          showBorders={false}
          rowAlternationEnabled={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          columnAutoWidth={true}
          showColumnHeaders={true}
          showRowLines={true}
          hoverStateEnabled={true}
          wordWrapEnabled={true}
          height="100%"
          width="100%"
          className="rounded-2xl p-2 font-medium text-gray-700"
        >
          <HeaderFilter visible={true} />
          
          <Toolbar>
            <Item
              location="after"
              render={() => (
                <Button variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)} className="text-gray-600 hover:text-black">
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                </Button>
              )}
            />
            <Item
              location="after"
              render={() => (
                <Button variant="default" className="px-2 py-1 m-1 rounded-md text-sm font-semibold shadow-sm">
                  + Add Firm
                </Button>
              )}
            />
          </Toolbar>

          <Column 
            dataField="companyName" 
            caption="Company Name" 
            width={180}
          />
          <Column 
            dataField="ownerName" 
            caption="Owner" 
            width={150}
          />
          <Column 
            dataField="mobileNo" 
            caption="Mobile No" 
            cellRender={mobileNoCellRender}
            width={180}
          />
          <Column 
            dataField="financialYearFrom" 
            caption="FY Start" 
            width={180}
          />
          <Column 
            dataField="financialYearTo" 
            caption="FY End" 
            width={180}
          />
          <Column 
            dataField="isActive" 
            caption="Status" 
            cellRender={statusCellRender}
            width={100}
            alignment="center"
          />

          <Column
            caption="Actions"
            alignment="center"
            width={130}
            cellRender={({ data }) => (
              <div className="flex justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingFirm(data);
                    setIsEditOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(data)}
                  className="text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />

          <Paging defaultPageSize={10} />
          <Pager 
            showPageSizeSelector 
            allowedPageSizes={[5, 10, 20]} 
            showInfo 
            infoText="Page {0} of {1} ({2} items)"
          />
        </DataGrid>

        {editingFirm && (
            <EditFirmDrawer
              open={isEditOpen}
              onClose={() => {
                setIsEditOpen(false);
                setEditingFirm(null);
              }}
              firmData={editingFirm}
            />
          )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the firm <b>{firmToDelete?.companyName}</b> and all its associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Firm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}