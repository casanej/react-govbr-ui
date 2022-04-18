import { Checkbox } from 'lib';
import React, { ReactElement, useContext, useMemo } from 'react';
import { TableContext } from '../..';
import { TableHeadTr, TableTh, TableTHeadStyled } from './index.style';

export const TableTHead = (): ReactElement => {
    const { columns, hasActions, hasSelect, onSelectAll } = useContext(TableContext);

    const numColumns = useMemo(() => {
        let totalColumns = columns.filter(column => column.accessor !== 'actions').length;

        if (hasActions) totalColumns++;

        return totalColumns;
    }, [columns, hasActions, hasSelect]);

    const columnWidth = useMemo(() => {

        let width: string | number = 100 / numColumns;

        if (hasSelect) width = `calc(${width}% - 50px)`;

        if (typeof width === 'number') return `${width}%`;
        return width;
    }, [hasSelect]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    hasSelect && <TableTh columWidth={'50px'}>
                        <Checkbox name='table-select-all' onChange={(_, value) => onSelectAll && onSelectAll(Boolean(value))} />
                    </TableTh>
                }
                {columns.map((column: any) => {
                    if (column.accessor === 'actions') {
                        if (hasActions) return <TableTh key={column.accessor} columWidth={columnWidth}>{column.title}</TableTh>;

                        return null;
                    }

                    return <TableTh key={column.accessor} columWidth={columnWidth}>{column.title}</TableTh>
                })}
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
