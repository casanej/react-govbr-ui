import { tableReducer, tableStateInitialValue } from 'hooks';
import { PageObj, TableColumn, tableContextInitialValues, TableContextProps, TableOrdering, TablePaginationTypes, TableRow } from 'models';
import React, { createContext, ReactElement, useContext, useEffect, useReducer } from 'react';
import { TableContent } from './components';
import { TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    ordering?: TableOrdering;
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectChange?: (selectedRows: TableRow[], selectedRowId: string[]) => void;
    paginated?: TablePaginationTypes;
    selectedItems?: string[];
    tableWidth?: number;
    title?: string;
}

export const TableContext = createContext<TableContextProps>(tableContextInitialValues);

export const useTableContext = () => useContext(TableContext);

export const Table = (props: Props): ReactElement => {
    const [tableState, tableDispatch] = useReducer(tableReducer, tableStateInitialValue)

    useEffect(() => {
        if (!tableState.firstRender && props.onSelectChange) props.onSelectChange(tableState.selectedRawRows, tableState.selectedRowsId);
    }, [tableState.selectedRowsId.length])

    useEffect(() => {
        tableDispatch({ type: 'first-render', payload: {
            rows: props.rows,
            ordering: props.ordering,
            paginated: props.paginated,
            selectedItems: props.selectedItems,
        }})
    }, [])

    useEffect(()=> {
        if (props.selectedItems) tableDispatch({ type: 'set-selected-items', payload: {
            selectedItems: props.selectedItems,
        }})
    }, [props.selectedItems])

    useEffect(() => {
        tableDispatch({ type: 'new-rows', payload: { rows: props.rows } });
    }, [props.rows])

    const handlePaginationChange = (pageObj: PageObj): void => {
        tableDispatch({ type: 'new-page', payload: pageObj });
        props.onPaginationChange && props.onPaginationChange(pageObj);
    }

    return <TableStyled>
        <TableContext.Provider value={{
            columns: props.columns,
            firstRender: tableState.firstRender,
            rows: tableState.treatedRows,
            numRowsSelected: tableState.numRowsSelected,
            selectedRowsId: tableState.selectedRowsId,
            isLoading: props.isLoading || tableState.loading,
            hasActions: props.hasActions,
            hasSearch: props.hasSearch,
            hasSelect: props.hasSelect,
            ordering: tableState.ordering,
            onPaginationChange: handlePaginationChange,
            onSelectRow: (payload) => tableDispatch({ type: 'select-row', payload}),
            paging: tableState.paging,
            paginated: props.paginated,
            selectAllStatus: tableState.selectAllStatus,
            selectedOrder: tableState.selectedOrder,
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
