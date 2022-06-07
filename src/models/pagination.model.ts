export interface PageObj {
    page: number;
    pageSize: number;
}

export type TablePaginationTypes = TablePaginationControlled | TablePaginationUncontrolled;

export interface TablePaginationControlled {
    type: 'controlled';
    initialPage: number;
    totalItems: number;
}

export interface TablePaginationUncontrolled {
    type: 'uncontrolled';
}