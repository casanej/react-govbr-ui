import { Checkbox } from 'lib';
import { TableColumn } from 'models';
import React, { ReactElement, useMemo } from 'react';
import { TableHeadTr, TableTh, TableTHeadStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    hasAction?: boolean;
    hasSelect?: boolean;
    onSelectAll?: (e: any) => void;
}

export const TableTHead = (props: Props): ReactElement => {
    const numColumns = useMemo(() => {
        let totalColumns = props.columns.filter(column => column.accessor !== 'actions').length;

        if (props.hasAction) totalColumns++;

        return totalColumns;
    }, [props.columns, props.hasAction, props.hasSelect]);

    const columnWidth = useMemo(() => {

        let width: string | number = 100 / numColumns;

        if (props.hasSelect) width = `calc(${width}% - 50px)`;

        if (typeof width === 'number') return `${width}%`;
        return width;
    }, [props.hasSelect]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    props.hasSelect && <TableTh columWidth={'50px'}>
                        <Checkbox name='table-select-all' onChange={props.onSelectAll} />
                    </TableTh>
                }
                {props.columns.map((column: any) => {
                    if (column.accessor === 'actions') {
                        if (props.hasAction) return <TableTh key={column.accessor} columWidth={columnWidth}>{column.title}</TableTh>;

                        return null;
                    }

                    return <TableTh key={column.accessor} columWidth={columnWidth}>{column.title}</TableTh>
                })}
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
