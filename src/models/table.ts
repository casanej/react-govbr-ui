import { IconName } from '@fortawesome/fontawesome-svg-core';
import { ReactElement, ReactNode } from 'react';
import { CheckTypes } from './input-checkbox.model';
import { PageObj, TablePaginationTypes } from './pagination.model';
import { TableStateAction, TableStateActionSelectRowProps } from './table-actions';

// ======================= /* TABLE CONTEXT */ ======================= //
export interface TableContextProps {
    columns: TableColumn[];
    firstRender: boolean;
    rows: TableRowTreated[];
    paging: PageObj;
    selectAllStatus: CheckTypes;
    selectedRowsId: string[];
    numRowsSelected: number;
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    ordering?: TableOrdering;
    onPaginationChange?: (pageObj: PageObj) => void;
    onSelectRow?: (payload: TableStateActionSelectRowProps) => void;
    selectedOrder?: TableSelectedOrdering;
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
    paging: { page: 1, pageSize: 10 },
    rows: [],
    tableDispatch: (value) => { return value },
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

// ======================= /* TABLE ORDERING */ ======================= //
export type TableOrderingTypes = 'asc' | 'desc' | 'none';
export type TableOrderType = 'external' | 'internal'

export type TableOrdering = {
    columnsOrder: string[];
    type: TableOrderType;
    multiple?: boolean;
    onOrderChange?: (lastClicked: string, orderValue: TableSelectedOrdering) => void;
}

export type TableSelectedOrdering = {
    [key: string]: {
        order: TableOrderingTypes;
    }
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
        renderer: (value: any) => ReactNode;
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
    disabled?: boolean;
    fn?: <IData = any>(payload?: IData) => void;
}