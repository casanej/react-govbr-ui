import { CheckTypes, PageObj, TablePaginationTypes, TableRowDefault, TableRowTreated, TableStateAction } from 'models';

export const TableReducerInitialState = {};

export const tableActionTypes = {
    SELECT_ROW: 'SELECT_ROW',
}

export interface TableState {
    cbCkSelectAll: boolean;
    firstRender: boolean;
    loading: boolean;
    numRowsSelected: number;
    selectAllStatus: CheckTypes;
    selectedRows: string[];
    treatedRows: TableRowTreated[];
    paging?: PageObj;
    paginated?: TablePaginationTypes;
}

export const tableStateInitialValue: TableState = {
    cbCkSelectAll: false,
    firstRender: true,
    loading: false,
    numRowsSelected: 0,
    selectAllStatus: 0,
    selectedRows: [],
    treatedRows: [],
}

export const tableReducer = (state: TableState, action: TableStateAction): TableState => {

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
            selectAllStatus: 0,
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
        const newSelectedRows = state.selectedRows;
        const newTreatedRows = state.treatedRows;
        let newNumRowsSelected = newSelectedRows.length;

        const rowIndex = newSelectedRows.indexOf(action.payload.id);

        if (action.payload.selected) {
            if (!newSelectedRows.includes(action.payload.id)) {
                newSelectedRows.push(action.payload.id);
                newNumRowsSelected++;
            }
        } else {
            if (newNumRowsSelected > 0) {
                newSelectedRows.splice(rowIndex, 1);

                newNumRowsSelected--;
            }
        }

        return {
            ...state,
            selectedRows: newSelectedRows,
            numRowsSelected: newNumRowsSelected,
            treatedRows: newTreatedRows
        }
    }

    if (action.type === 'select-all') {
        const allRows = state.treatedRows;

        if (action.payload.checked) {
            allRows.map(row => tableReducer(state, {
                type: 'select-row',
                payload: {
                    id: row.id,
                    row: row.row,
                    selected: true,
                }
            }))

            return {
                ...state,
                selectAllStatus: 1,
                numRowsSelected: state.selectedRows.length,
            }
        } else {
            const response = allRows.map(row => tableReducer(state, {
                type: 'select-row',
                payload: {
                    id: row.id,
                    row: row.row,
                    selected: false,
                }
            }))

            return {
                ...state,
                ...response,
                numRowsSelected: state.selectedRows.length,
                selectAllStatus: 1
            }
        }
    }

    if (action.type === 'set-loading') {
        return {
            ...state,
            loading: action.payload.loading,
        }
    }

    return state;
}