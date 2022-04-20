import { tableReducer, tableStateInitialValue } from 'hooks';
import { PageObj, TableColumn, tableContextInitialValues, TableContextProps, TablePaginationTypes, TableRow } from 'models';
import React, { createContext, ReactElement, useEffect, useReducer } from 'react';
import { TableContent } from './components';
import { TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectChange?: (selectedRows: TableRow[]) => void;
    paginated?: TablePaginationTypes;
    tableWidth?: number;
    title?: string;
}

export const TableContext = createContext<TableContextProps>(tableContextInitialValues);

export const Table = (props: Props): ReactElement => {
    const [tableState, tableDispatch] = useReducer(tableReducer, tableStateInitialValue)

    useEffect(() => {
        if (!tableState.firstRender && props.onSelectChange) props.onSelectChange(tableState.selectedRows.map(row => row.row));
    }, [tableState.selectedRows])

    useEffect(() => {
        tableDispatch({ type: 'first-render'})
    }, [])

    return <TableStyled>
        <TableContext.Provider value={{
            columns: props.columns,
            rows: props.rows,
            numRowsSelected: tableState.numRowsSelected,
            selectedRows: tableState.selectedRows,
            isLoading: props.isLoading || tableState.loading,
            hasActions: props.hasActions,
            hasSearch: props.hasSearch,
            hasSelect: props.hasSelect,
            onPaginationChange: props.onPaginationChange,
            onSelectAll: () => tableDispatch({ type: 'select-all'}),
            onSelectRow: (payload) => tableDispatch({ type: 'select-row', payload}),
            paginated: props.paginated,
            tableDispatch,
            tableWidth: props.tableWidth,
            title: props.title,
        }}>
            <TableContent
                tableWidth={props.tableWidth}
            />
        </TableContext.Provider>
    </TableStyled>;
};
