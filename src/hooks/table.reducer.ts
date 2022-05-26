/* eslint-disable complexity */
import { CheckTypes, PageObj, TablePaginationTypes, TableRow, TableRowDefault, TableRowTreated, TableStateAction } from 'models';

export interface TableState {
    cbCkSelectAll: boolean;
    firstRender: boolean;
    loading: boolean;
    numRowsSelected: number;
    selectAllStatus: CheckTypes;
    selectedRawRows: TableRow[];
    selectedRowsId: string[];
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
    selectedRawRows: [],
    selectedRowsId: [],
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
            treatedRows.push({ id, index, row });
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
        const newSelectedRawRows = state.selectedRawRows;
        const newSelectedRowsId = state.selectedRowsId;
        const newTreatedRows = state.treatedRows;
        let newNumRowsSelected = newSelectedRowsId.length;

        if (action.payload.selected) {
            if (!newSelectedRowsId.includes(action.payload.id)) {
                newSelectedRowsId.push(action.payload.id);
                newSelectedRawRows.push(action.payload.row);
                newNumRowsSelected++;
            }
        } else {
            if (newNumRowsSelected > 0) {
                const rowIndex = newSelectedRowsId.findIndex(row => row === action.payload.id);

                if (rowIndex >= 0) {
                    newSelectedRowsId.splice(rowIndex, 1);
                    newSelectedRawRows.splice(rowIndex, 1);
                }

                newNumRowsSelected--;
            }
        }

        return {
            ...state,
            selectedRawRows: newSelectedRawRows,
            selectedRowsId: newSelectedRowsId,
            numRowsSelected: newNumRowsSelected,
            treatedRows: newTreatedRows
        }
    }

    if (action.type === 'select-all') {
        const allRows = state.treatedRows;

        const response = allRows.map(row => tableReducer(state, {
            type: 'select-row',
            payload: {
                id: row.id,
                row: row.row,
                selected: action.payload.checked,
            }
        }))

        return {
            ...state,
            ...response,
            numRowsSelected: state.selectedRowsId.length,
            selectAllStatus: 1
        }
    }

    if (action.type === 'set-loading') {
        return {
            ...state,
            loading: action.payload.loading,
        }
    }

    if (action.type === 'set-selected-items') {
        const allRows = state.treatedRows;

        const response = allRows.map(row => tableReducer(state, {
            type: 'select-row',
            payload: {
                id: row.id,
                row: row.row,
                selected: action.payload.selectedItems.includes(row.id),
            }
        }))

        return {
            ...state,
            ...response,
            numRowsSelected: state.selectedRowsId.length,
        }
    }

    return state;
}