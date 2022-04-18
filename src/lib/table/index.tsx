import { tableReducer, tableStateInitialValue } from 'hooks';
import { PageObj, TableColumn, tableContextInitialValues, TableContextProps, TablePaginationTypes, TableRow } from 'models';
import React, { createContext, ReactElement, useReducer } from 'react';
import { TableContent } from './components';
import { TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    onPaginationChange?: (pageObj: PageObj) => void
    paginated?: TablePaginationTypes;
    tableWidth?: number;
    title?: string;
}

export const TableContext = createContext<TableContextProps>(tableContextInitialValues);

export const Table = (props: Props): ReactElement => {
    const [tableState, tableDispatch] = useReducer(tableReducer, tableStateInitialValue)

    return <TableStyled>
        <TableContext.Provider value={{
            columns: props.columns,
            rows: props.rows,
            numRowsSelected: tableState.numRowsSelected,
            selectedRows: tableState.selectedRows,
            isLoading: props.isLoading,
            hasActions: props.hasActions,
            hasSearch: props.hasSearch,
            hasSelect: props.hasSelect,
            onPaginationChange: props.onPaginationChange,
            onSelectAll: () => tableDispatch({ type: 'select-all'}),
            onSelectRow: (payload) => tableDispatch({ type: 'select-row', payload}),
            paginated: props.paginated,
            tableWidth: props.tableWidth,
            title: props.title,
        }}>
            <TableContent
                tableWidth={props.tableWidth}
            />
        </TableContext.Provider>
    </TableStyled>;
};
