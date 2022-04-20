import { TableStateAction, TableStateActionSelectRowProps } from 'models';

export const TableReducerInitialState = {};

export const tableActionTypes = {
    SELECT_ROW: 'SELECT_ROW',
}

export interface TableState {
    firstRender: boolean;
    loading: boolean;
    numRowsSelected: number;
    selectedRows: TableStateActionSelectRowProps[];
}

export const tableStateInitialValue: TableState = {
    firstRender: true,
    loading: false,
    numRowsSelected: 0,
    selectedRows: [],
}

export const tableReducer = (state: TableState, action: TableStateAction) => {

    if (action.type === 'first-render') return {
        ...state,
        firstRender: false,
    }

    if (action.type === 'select-row') {
        const rowsSelected = [...state.selectedRows];

        if (action.payload.selected) {
            rowsSelected.push(action.payload);
            return {
                ...state,
                numRowsSelected: rowsSelected.length,
                selectedRows: rowsSelected,
            }
        } else {
            if (rowsSelected.length === 0) return state;

            const index = rowsSelected.findIndex(row => row.id === action.payload.id);

            rowsSelected.splice(index, 1);

            return {
                ...state,
                numRowsSelected: rowsSelected.length,
                selectedRows: rowsSelected,
            }
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