import { IconName } from '@fortawesome/fontawesome-svg-core';
import { ReactElement, ReactNode } from 'react';
import { CheckTypes } from './input-checkbox.model';
import { PageObj, TablePaginationTypes } from './pagination.model';
import { TableOrderType, TableStateAction, TableStateActionSelectRowProps } from './table-actions';

// ======================= /* TABLE CONTEXT */ ======================= //
export interface TableContextProps {
    columns: TableColumn[];
    firstRender: boolean;
    rows: TableRowTreated[];
    selectAllStatus: CheckTypes;
    selectedRowsId: string[];
    numRowsSelected: number;
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectRow?: (payload: TableStateActionSelectRowProps) => void;
    paging?: PageObj;
    paginated?: TablePaginationTypes;
    tableDispatch: (value: TableStateAction) => void
    tableWidth?: number;
    title?: string;
}

export const tableContextInitialValues:TableContextProps = {
    columns: [],
    firstRender: true,
    numRowsSelected: 0,
    selectAllStatus: 0,
    selectedRowsId: [],
    rows: [],
    tableDispatch: (value) => { return value },
};

// ======================= /* TABLE COLUMN */ ======================= //
export type TableColumn = TableColumnCustom | TableColumnActions | TableColumnDefault;

export type TableColumnTypes = 'text' | 'number' | 'number_min' | 'date' | 'date_time' | 'boolean' | 'money' | 'money_min' | 'action';

export type TableOrdering = TableOrderingInternal | TableOrderingExternal;

export interface TableOrderingInternal {
    type: 'internal';
}

export interface TableOrderingExternal {
    type: 'external';
    onOrder: (name: string, order: TableOrderType) => void;
}

export interface TableColumnDefault {
    title: string;
    accessor: string;
    order?: TableOrdering;
    type?: TableColumnTypes;
}

export interface TableColumnCustom {
    type: 'custom';
    title: string;
    accessor: string;
    renderer: (value: string | number) => ReactNode;
    order?: TableOrdering;
}

export interface TableColumnActions {
    type: 'actions';
    accessor: 'actions';
    title: string;
    actions: TableColumnAction[];
}

// ======================= /* TABLE ROW */ ======================= //

export type TableRow = TableRowDefault | TableRowAction;

export interface TableRowTreated {
    id: string;
    index: number;
    row: TableRow;
}

export interface TableRowDefault {
    [key: string]: any;
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
        checked: CheckTypes;
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