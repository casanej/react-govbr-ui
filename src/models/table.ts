import { IconName } from '@fortawesome/fontawesome-svg-core';
import { ReactElement, ReactNode } from 'react';
import { PageObj, TablePaginationTypes } from './pagination.model';
import { TableStateAction, TableStateActionSelectRowProps } from './table-actions';

// ======================= /* TABLE CONTEXT */ ======================= //
export interface TableContextProps {
    columns: TableColumn[];
    rows: TableRow[];
    selectedRows: TableStateActionSelectRowProps[];
    numRowsSelected: number;
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectAll?: (value: boolean) => void;
    onSelectRow?: (payload: TableStateActionSelectRowProps) => void;
    paginated?: TablePaginationTypes;
    tableDispatch?: (value: TableStateAction) => void
    tableWidth?: number;
    title?: string;
}

export const tableContextInitialValues:TableContextProps = {
    columns: [],
    numRowsSelected: 0,
    selectedRows: [],
    rows: [],
};

// ======================= /* TABLE COLUMN */ ======================= //
export type TableColumn = TableColumnCustom | TableColumnActions | TableColumnDefault;

export type TableColumnTypes = 'text' | 'number' | 'number_min' | 'date' | 'date_time' | 'boolean' | 'money' | 'money_min' | 'action';

export interface TableColumnDefault {
    title: string;
    accessor: string;
    type?: TableColumnTypes;
}

export interface TableColumnCustom {
    type: 'custom';
    title: string;
    accessor: string;
    renderer: (value: string | number) => ReactNode;
}

export interface TableColumnActions {
    type: 'actions';
    accessor: 'actions';
    title: string;
    actions: TableColumnAction[];
}

// ======================= /* TABLE ROW */ ======================= //

export type TableRow = TableRowDefault | TableRowAction;

export interface TableRowDefault {
    [key: string]: string | number | null;
}

export interface TableRowAction {
    actions: TableColumnAction[];
}

// ======================= /* TABLE TD TYPES */ ======================= //

export type TableTdTypes = TableTdTypeCheckBox | TableTdTypeCustom | TableTdTypeActions | TableTdTypeGeneric;

export interface TableTdTypeCheckBox extends TableTdTypesDefault {
    type: 'checkbox';
    payload: {
        name: string;
        onSelectRow?: (e: any) => void;
    }
}

export interface TableTdTypeCustom extends TableTdTypesDefault {
    type: 'custom';
    payload: {
        value: string | number;
        renderer: (value: string | number) => ReactNode;
    }
}

export interface TableTdTypeActions extends TableTdTypesDefault {
    type: 'actions';
    payload: {
        func: TableColumnAction[];
    }
}

export interface TableTdTypeGeneric extends TableTdTypesDefault {
    type: TableColumnTypes;
    children: ReactNode;
}

export interface TableTdTypesDefault {
    width?: string;
    payload: {};
}

// ======================= /* OTHERS MODELS */ ======================= //

export interface TableColumnAction {
    icon: IconName | ReactElement;
    label: string;
    fn: <IData = any>(payload?: IData) => void;
}