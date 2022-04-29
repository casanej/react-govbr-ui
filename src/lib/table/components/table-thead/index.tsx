import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import { CheckTypes, TableColumn } from 'models';
import React, { ReactElement, useCallback, useContext, useMemo } from 'react';
import { TableTh } from '..';
import { TableContext } from '../..';
import { TableHeadTr, TableTHeadStyled } from './index.style';

export const TableTHead = (): ReactElement => {
    const { columns, hasActions, hasSelect, onSelectAll, numRowsSelected, selectAllStatus, tableDispatch } = useContext(TableContext);
    const { handleSelectAll } = useContext(CheckboxContext);

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
        if (handleSelectAll) {
            tableDispatch({ type: 'select-all' })
            handleSelectAll();
        }
    }, [onSelectAll, handleSelectAll, numRowsSelected]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    hasSelect && <TableTh columWidth={'50px'} >
                        <Checkbox name='table-select-all' checked={selectAllStatus} onChange={tableSelectAll} />
                    </TableTh>
                }
                {columns.map((column: TableColumn) => {
                    if (column.accessor === 'actions') {
                        if (hasActions) return <TableTh key={column.accessor} columWidth={columnWidth}>{column.title}</TableTh>;

                        return null;
                    }

                    let ordering = undefined;

                    if (column.type !== 'actions' && column.type !== 'custom') ordering = column.order;

                    return <TableTh key={column.accessor} accessor={column.accessor} columWidth={columnWidth} ordering={ordering}>{column.title}</TableTh>
                })}
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
