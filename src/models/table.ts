import { IconName } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

export interface TableActions {
    icon: IconName;
    label: string;
    fn: () => void;
}

export type TableColumnTypes = 'text' | 'number' | 'number_min' | 'date' | 'boolean' | 'money' | 'money_min';

export interface TableRow {
    [key: string]: {
        value: string | number;
    };
}

export type TableTdTypes = TableTdTypeCheckBox | TableTdTypeCustom | TableTdTypeGeneric;

export interface TableTdTypeCheckBox {
    type: 'checkbox';
    name: string;
    onSelectRow?: (e: any) => void;
}

export interface TableTdTypeCustom {
    type: 'custom';
    value: string | number;
    renderer: (value: string | number) => ReactNode;
}

export interface TableTdTypeGeneric {
    type: TableColumnTypes;
    children: ReactNode;
    width?: string;
}

export type TableColumn = TableColumnCustom | TableColumnDefault;

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