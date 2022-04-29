import { tableReducer, tableStateInitialValue } from 'hooks';
import { PageObj, TableColumn, tableContextInitialValues, TableContextProps, TablePaginationTypes, TableRow } from 'models';
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
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectChange?: (selectedRows: TableRow[]) => void;
    paginated?: TablePaginationTypes;
    tableWidth?: number;
    title?: string;
}

export const TableContext = createContext<TableContextProps>(tableContextInitialValues);

export const useTableContext = () => useContext(TableContext);

export const Table = (props: Props): ReactElement => {
    const [tableState, tableDispatch] = useReducer(tableReducer, tableStateInitialValue)

    useEffect(() => {
        if (!tableState.firstRender && props.onSelectChange) {
            props.onSelectChange(tableState.selectedRows);
        }
    }, [tableState.selectedRows.length])

    useEffect(() => {
        tableDispatch({ type: 'first-render', payload: {
            rows: props.rows,
            paginated: props.paginated,
        }})
    }, [])

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
            selectedRows: tableState.selectedRows,
            isLoading: props.isLoading || tableState.loading,
            hasActions: props.hasActions,
            hasSearch: props.hasSearch,
            hasSelect: props.hasSelect,
            onPaginationChange: handlePaginationChange,
            onSelectAll: () => tableDispatch({ type: 'select-all'}),
            onSelectRow: (payload) => tableDispatch({ type: 'select-row', payload}),
            paging: tableState.paging,
            paginated: props.paginated,
            selectAllStatus: tableState.selectAllStatus,
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
