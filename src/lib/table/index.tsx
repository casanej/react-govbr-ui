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
    paging?: PageObj;
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
        if (Array.isArray(props.selectedItems)) tableDispatch({ type: 'set-forced-selected-items', payload: {
            selectedRowsId: props.selectedItems,
            selectedRawRows: []
        }})
    }, [props.selectedItems])

    useEffect(() => {
        tableDispatch({ type: 'set-paginated', payload: props.paginated })
    }, [props.paginated])

    useEffect(() => {
        tableDispatch({ type: 'new-rows', payload: { rows: props.rows } });
    }, [props.rows])

    useEffect(() => {
        if (props.paging) tableDispatch({ type: 'new-page', payload: props.paging })
    }, [props.paging])

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
            paginated: tableState.paginated,
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
