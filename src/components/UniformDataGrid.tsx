'use client';

import {
  DataGrid,
  Column,
  Paging,
  HeaderFilter,
  GroupPanel,
  Grouping,
  Toolbar,
  Item,
  Pager,
  Export,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { Button } from '@/components/ui/button';
import { Expand, Maximize, Pencil, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { jsPDF as JsPdf } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export interface ColumnConfig<T> {
  dataField: keyof T;
  caption: string;
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  format?: string;
  width?: number;
}

interface UniformDataGridProps<T> {
  data: T[];
  columnBuilder: (isFullscreen: boolean) => ColumnConfig<T>[];
  addButtonText: string;
  editComponent?: React.ReactNode;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  deleteTitle?: string;
  deleteDescription?: (item: T) => string;
}

export default function UniformDataGrid<T>({
  data,
  columnBuilder,
  addButtonText,
  editComponent,
  onAdd,
  onEdit,
  onDelete,
  deleteTitle = 'Are you absolutely sure?',
  deleteDescription = (item: T) => `This will permanently delete this record.`,
}: UniformDataGridProps<T>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const gridRef = useRef<any>(null);

  const handleDeleteClick = (data: T) => {
    setItemToDelete(data);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const instance = gridRef.current?.instance;
      if (instance?.beginUpdate && instance?.endUpdate) {
        instance.beginUpdate();
        instance.endUpdate();
        window.dispatchEvent(new Event('resize'));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [isFullscreen]);

  const onExporting = (e: any) => {
    if (e.format === 'pdf') {
      const doc = new JsPdf();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('DataGrid.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Sheet');

      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
      });

      e.cancel = true;
    }
  };

  return (
    <div
      className={`w-full font-inter top-0 text-[15px] transition-all duration-400 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto'
          : 'pt-1 pr-3 pb-0 pl-3 relative'
      }`}
    >
      <div
        className={`rounded-2xl border border-gray-200 shadow-md bg-white p-1 flex flex-col ${
          isFullscreen ? 'h-full' : 'h-[90vh]'
        }`}
      >
        <div className="rounded-xl flex-1 overflow-auto w-full">
          <DataGrid
            ref={gridRef}
            dataSource={data}
            showBorders={false}
            rowAlternationEnabled
            allowColumnResizing
            allowColumnReordering
            columnAutoWidth
            showColumnHeaders
            showRowLines
            hoverStateEnabled
            wordWrapEnabled
            height="100%"
            className="rounded-2xl font-medium text-gray-700"
            onExporting={onExporting}
          >
            <HeaderFilter visible />
            <GroupPanel visible={false} />
            <Grouping autoExpandAll />
            <Export enabled={true} allowExportSelectedData={true} formats={['xlsx', 'pdf']} />

            <Toolbar>
              <Item
                location="after"
                render={() => (
                  <Button
                    variant="ghost"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-gray-600 hover:text-black"
                  >
                    {isFullscreen ? <Maximize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
                  </Button>
                )}
              />
              <Item
                location="after"
                render={() => (
                  <Button
                    variant="default"
                    className="px-3 m-1 rounded-md text-sm font-semibold shadow-sm"
                    onClick={onAdd}
                  >
                    {addButtonText}
                  </Button>
                )}
              />
               <Item name="exportButton" />
            </Toolbar>

            {columnBuilder(isFullscreen).map((column) => (
              <Column
                key={column.dataField as string}
                dataField={column.dataField as string}
                caption={column.caption}
                format={column.format}
                width={isFullscreen ? undefined : column.width}
              />
            ))}

            {(onEdit || onDelete) && (
              <Column
                caption="Actions"
                alignment="center"
                width={130}
                cellRender={({ data }) => (
                  <div className="flex justify-center gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingItem(data);
                          onEdit?.(data);
                        }}
                        className="text-blue-600 hover:bg-blue-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(data)}
                        className="text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              />
            )}

            <Paging defaultPageSize={20} />
            <Pager
              visible
              showPageSizeSelector
              allowedPageSizes={[10, 20, 30]}
              showInfo={false}
              showNavigationButtons
              displayMode="full"
            />
          </DataGrid>
        </div>

        {editingItem && editComponent}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{deleteTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {itemToDelete && deleteDescription(itemToDelete)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
