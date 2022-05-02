import { Checkbox } from 'lib';
import { CheckTypes, TableColumn } from 'models';
import React, { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TableTh } from '..';
import { TableContext } from '../..';
import { TableHeadTr, TableTHeadStyled } from './index.style';

export const TableTHead = (): ReactElement => {
    const { columns, firstRender, hasActions, hasSelect, paginated, paging, selectAllStatus, selectedRows, tableDispatch, numRowsSelected } = useContext(TableContext);

    const [hasClicked, setHasClicked] = useState(false);
    const [pageRowsCount, setPageRowsCount] = useState<number[]>([]);
    const [teste, setTeste] = useState(0);

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

    useEffect(()=> {
        if (paging) {
            setPageRowsCount(oldCount => {
                const newCount = oldCount;
                const pageIndex = paging.page - 1;

                const afterIndexes = newCount.slice(0, pageIndex);
                const beforeIndexes = newCount.slice(pageIndex + 1);
                const sumDisregard = afterIndexes.reduce((acc, curr) => acc + curr, 0) + beforeIndexes.reduce((acc, curr) => acc + curr, 0);

                newCount[pageIndex] = numRowsSelected - sumDisregard;

                return newCount;
            });
        }
    }, [paging, numRowsSelected])

    const checkboxSelectStatusCb = useMemo(():CheckTypes => {
        if (!hasClicked) return 0;
        if (numRowsSelected === 0) {
            setHasClicked(false);
            return 0;
        }

        if (paginated && paginated.type === 'controlled' && paging) {
            const pageIndex = paging.page - 1;
            const currentPageRowsCount = pageRowsCount[pageIndex];

            console.log('[DEBUG]', currentPageRowsCount, paging.pageSize, currentPageRowsCount);

            if (currentPageRowsCount === 0) return 0;
            if (paging.pageSize === currentPageRowsCount) return 1;
            return 2;
        }

        return 0;
    }, [hasClicked, numRowsSelected, pageRowsCount, paging, paginated]);

    const tableSelectAll = useCallback((_:string, value: CheckTypes) => {
        setHasClicked(true);
        tableDispatch({ type: 'select-all', payload: { checked: Boolean(value) } })
    }, [tableDispatch]);

    console.log('[DEBUG 2]', teste, hasClicked, numRowsSelected, pageRowsCount, paging, paginated)

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    hasSelect && <TableTh columWidth={'50px'} >
                        <Checkbox name='table-select-all' checked={checkboxSelectStatusCb} onClick={tableSelectAll} />
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
