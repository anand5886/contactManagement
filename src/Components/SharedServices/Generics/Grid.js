import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export const Grid = ({
    columnDefs,
    rowData,
    pagination,
    paginationPageSize,
    enableBrowserTooltips,
    height = '430px',
    width = '100%',
    filterText,
    id
}) => {
    return (
        <React.Fragment>
            <div className="ag-theme-alpine" style={{ width: width }}>
                <AgGridReact
                    id="Aggridmain"
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    enableBrowserTooltips={enableBrowserTooltips}
                    onFirstDataRendered={(param) => { param.api.sizeColumnsToFit(); }}
                    setQuickFilter={true}
                    quickFilterText={filterText}
                    domLayout='autoHeight'                   
                >
                </AgGridReact>
            </div>
        </React.Fragment>
    );
}