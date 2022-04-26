import { PageObj, TablePaginationTypes, TableRowDefault, TableRowTreated, TableStateAction, TableStateActionSelectRowProps } from 'models';

export const TableReducerInitialState = {};

export const tableActionTypes = {
    SELECT_ROW: 'SELECT_ROW',
}

export interface TableState {
    cbCkSelectAll: boolean;
    firstRender: boolean;
    loading: boolean;
    numRowsSelected: number;
    selectedRows: TableStateActionSelectRowProps[];
    treatedRows: TableRowTreated[];
    paging?: PageObj;
    paginated?: TablePaginationTypes;
}

export const tableStateInitialValue: TableState = {
    cbCkSelectAll: false,
    firstRender: true,
    loading: false,
    numRowsSelected: 0,
    selectedRows: [],
    treatedRows: [],
}

export const tableReducer = (state: TableState, action: TableStateAction) => {

    if (action.type === 'first-render') {

        return {
            ...state,
            firstRender: false,
            paginated: action.payload.paginated,
        }
    }

    if (action.type === 'new-page') {
        return {
            ...state,
            paging: action.payload,
        };
    }

    if (action.type === 'new-rows') {
        const treatedRows: TableRowTreated[] = [];

        action.payload.rows.forEach((row, index) => {
            const rawRow = row as TableRowDefault;
            const rowId = rawRow['id'];

            const id = rowId?.toString() || Math.random().toString();
            treatedRows.push({ id, index, row, selected: false });
        });

        return {
            ...state,
            treatedRows,
            loading: false,
        }
    }

    if (action.type === 'ordering') {
        const sortedRows = state.treatedRows;

        const sortByNone = (a:TableRowTreated, b:TableRowTreated) => {
            if (a.index < b.index) return -1;
            if (a.index > b.index) return 1;

            return 0;
        }

        const sortByAsc = (a:TableRowTreated, b:TableRowTreated) => {
            const aRow = a.row as TableRowDefault;
            const bRow = b.row as TableRowDefault;

            const aValue = aRow[action.payload.orderBy] || '';
            const bValue = bRow[action.payload.orderBy] || '';

            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;

            return 0;
        }

        const sortByDesc = (a:TableRowTreated, b:TableRowTreated) => {
            const aRow = a.row as TableRowDefault;
            const bRow = b.row as TableRowDefault;

            const aValue = aRow[action.payload.orderBy] || '';
            const bValue = bRow[action.payload.orderBy] || '';

            if (aValue < bValue) return 1;
            if (aValue > bValue) return -1;

            return 0;
        }

        if (action.payload.order === 'none') sortedRows.sort(sortByNone);
        if (action.payload.order === 'asc') sortedRows.sort(sortByAsc);
        if (action.payload.order === 'desc') sortedRows.sort(sortByDesc);

        return {
            ...state,
            loading: false,
            treatedRows: sortedRows,
        };
    }

    if (action.type === 'select-row') {
        const selectedRow = state.treatedRows.find(row => row.id === action.payload.id);

        if (selectedRow) selectedRow.selected = action.payload.selected;

        const selectedRows = state.treatedRows.filter(row => row.selected === true);
        return {
            ...state,
            selectedRows,
            numRowsSelected: selectedRows.length,
        }
    }

    if (action.type === 'select-all') {
        return state;
    }

    if (action.type === 'set-loading') {
        return {
            ...state,
            loading: action.payload.loading,
        }
    }

    return state;
}