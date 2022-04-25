import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import React, { ReactElement, useCallback, useContext, useEffect, useMemo } from 'react';
import { CheckTypes } from 'src/lib/checkbox/index.style';
import { TableContext } from '../..';
import { TableHeadTr, TableTh, TableTHeadStyled } from './index.style';

export const TableTHead = (): ReactElement => {
    const { columns, hasActions, hasSelect, onSelectAll, numRowsSelected } = useContext(TableContext);
    const { handleSelectAll } = useContext(CheckboxContext);

    useEffect(() => {
        console.log('[numRowsSelected]', numRowsSelected);
    }, [numRowsSelected]);

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

    const tableSelectAll = useCallback((_:string, value: CheckTypes) => {
        onSelectAll && onSelectAll(Boolean(value))
        handleSelectAll && handleSelectAll();
    }, [onSelectAll, handleSelectAll, numRowsSelected]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    hasSelect && <TableTh columWidth={'50px'} >
                        <Checkbox name='table-select-all' checked={ undefined} onChange={tableSelectAll} />
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
