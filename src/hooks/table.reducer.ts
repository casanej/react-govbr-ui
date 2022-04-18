import { TableRow, TableStateAction } from 'models';

export const TableReducerInitialState = {};

export const tableActionTypes = {
    SELECT_ROW: 'SELECT_ROW',
}

export interface TableState {
    numRowsSelected: number;
    selectedRows: TableRow[];
}

export const tableStateInitialValue: TableState = {
    numRowsSelected: 0,
    selectedRows: [],
}

export const tableReducer = (state: TableState, action: TableStateAction) => {

    if (action.type === 'select-row') {
        console.log('[SELECTED ROW]', action.payload);
    }

    if (action.type === 'select-all') {
        console.log('[SELECT ALL]', action);
    }

    return state;
}