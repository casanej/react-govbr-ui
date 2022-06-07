import { PageObj, TablePaginationTypes } from './pagination.model';
import { TableOrdering, TableRow } from './table';

export type TableStateAction = TableStateActionFirstRender | TableStateActionSetForcedSelectedItems | TableStateActionNewPage | TableStateActionNewRows | TableStateActionOrdering | TableStateActionSelectRow | TableStateActionSelectAll
    | TableStateActionSetLoading | TableStateActionSetPaginated | TableStateActionSetSelectedItems;

/* ============== INTERFACE FIRST RENDER ============== */
interface TableStateActionFirstRender {
    type: 'first-render';
    payload: {
        rows: TableRow[];
        ordering?: TableOrdering;
        paginated?: TablePaginationTypes;
        selectedItems?: string[];
    };
}

/* ============== INTERFACE NEW ROWS ============== */
interface TableStateActionNewPage {
    type: 'new-page';
    payload: PageObj | undefined;
}

/* ============== INTERFACE NEW ROWS ============== */
interface TableStateActionNewRows {
    type: 'new-rows';
    payload: {
        rows: TableRow[];
    };
}

/* ============== INTERFACE ORDERING ============== */

interface TableStateActionOrdering {
    type: 'ordering';
    payload: {
        orderBy: string;
    };
}

/* ============== INTERFACE SELECT ALL ============== */
interface TableStateActionSelectAll {
    type: 'select-all';
    payload: {
        checked: boolean;
    }
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

/* ============== INTERFACE SET LOADING ============== */
interface TableStateActionSetPaginated {
    type: 'set-paginated';
    payload: TablePaginationTypes | undefined;
}

/* ============== INTERFACE SET SELECTED ITEMS ============== */
interface TableStateActionSetSelectedItems {
    type: 'set-selected-items';
    payload: {
        selectedItems: string[];
    }
}

/* ============== INTERFACE SET FORCED SELECTED ITEMS ============== */
interface TableStateActionSetForcedSelectedItems {
    type: 'set-forced-selected-items';
    payload: {
        selectedRawRows: TableRow[];
        selectedRowsId: string[];
    }
}

/* ============== INTERFACE ??? ============== */