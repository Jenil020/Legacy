'use client';

import React from "react";
import DataGrid, {
  Column,
  Paging,
  Sorting,
  Editing
} from "devextreme-react/data-grid";
import 'devextreme/dist/css/dx.light.css';

export interface DxDataGridProps {
  columns: { dataField: string; caption?: string }[];
  data: any[];
}

const DxDataGrid: React.FC<DxDataGridProps> = ({ columns, data }) => {
  return (
   
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
      >
        {columns.map((col) => (
          <Column
            key={col.dataField}
            dataField={col.dataField}
            caption={col.caption}
            allowEditing={true}
          />
        ))}

        <Editing
          mode="cell"
          allowUpdating={true}
        />

        <Paging enabled={false} />
        <Sorting mode="multiple" />
      </DataGrid>
    
  );
};

export default DxDataGrid;
