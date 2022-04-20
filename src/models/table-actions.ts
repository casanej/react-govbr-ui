import { TableRow } from './table';

export type TableStateAction = TableStateActionFirstRender | TableStateActionSelectRow | TableStateActionSelectAll | TableStateActionSetLoading;

/* ============== INTERFACE FIRST RENDER ============== */
interface TableStateActionFirstRender {
    type: 'first-render';
}

/* ============== INTERFACE SELECT ALL ============== */
interface TableStateActionSelectAll {
    type: 'select-all';
}

/* ============== INTERFACE SELECT ROW ============== */
export interface TableStateActionSelectRowProps {
    selected: boolean;
    id: string;
    row: TableRow;
}

interface TableStateActionSelectRow {
    type: 'select-row';
    payload: TableStateActionSelectRowProps;
}

/* ============== INTERFACE TOGGLE LOADING ============== */
interface TableStateActionSetLoading {
    type: 'set-loading';
    payload: {
        loading: boolean;
    }
}

/* ============== INTERFACE ??? ============== */