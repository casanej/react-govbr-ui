import { TableRow } from './table';

export type TableStateAction = TableStateActionSelectRow | TableStateActionSelectAll;

interface TableStateActionSelectAll {
    type: 'select-all';
}

interface TableStateActionSelectRow {
    type: 'select-row';
    payload: {
        checked: boolean;
        index: string;
        row: TableRow;
    };
}