import { PageObj, TablePaginationTypes } from './pagination.model';
import { TableRow } from './table';

export type TableStateAction = TableStateActionFirstRender | TableStateActionNewPage | TableStateActionNewRows | TableStateActionSelectRow | TableStateActionSelectAll | TableStateActionSetLoading;

/* ============== INTERFACE FIRST RENDER ============== */
interface TableStateActionFirstRender {
    type: 'first-render';
    payload: {
        rows: TableRow[];
        paginated?: TablePaginationTypes;
    };
}

/* ============== INTERFACE NEW ROWS ============== */
interface TableStateActionNewPage {
    type: 'new-page';
    payload: PageObj;
}

/* ============== INTERFACE NEW ROWS ============== */
interface TableStateActionNewRows {
    type: 'new-rows';
    payload: {
        rows: TableRow[];
    };
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

/* ============== INTERFACE SET LOADING ============== */
interface TableStateActionSetLoading {
    type: 'set-loading';
    payload: {
        loading: boolean;
    }
}

/* ============== INTERFACE ??? ============== */