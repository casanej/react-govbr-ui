import { Checkbox } from 'lib';
import { CheckTypes, TableColumn } from 'models';
import React, { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TableTh } from '..';
import { TableContext } from '../..';
import { TableHeadTr, TableTHeadStyled } from './index.style';

export const TableTHead = (): ReactElement => {
    const { columns, hasActions, hasSelect, paginated, paging, tableDispatch, numRowsSelected } = useContext(TableContext);

    const [hasClicked, setHasClicked] = useState<boolean[]>([false]);
    const [pageRowsCount, setPageRowsCount] = useState<number[]>([]);

    useEffect(()=> {
        if (paging) {
            if (hasClicked[paging.page - 1] === false) handleClickSelectAll(false);
        }
    }, [paging])

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

    const handleClickSelectAll = useCallback((newStatus)=> {
        if (paging) {

            const pageIndex = paging.page - 1;
            const newClicked = [...hasClicked];
            newClicked[pageIndex] = newStatus;

            setHasClicked(newClicked);
        }
    }, [paging, hasClicked]);

    const checkboxSelectStatus = useMemo(():CheckTypes => {
        const newCount = pageRowsCount;
        let pageIndex = 0;
        if (paging) {
            pageIndex = paging.page - 1;
            const afterIndexes = newCount.slice(0, pageIndex);
            const beforeIndexes = newCount.slice(pageIndex + 1);
            const sumDisregard = afterIndexes.reduce((acc, curr) => acc + curr, 0) + beforeIndexes.reduce((acc, curr) => acc + curr, 0);

            let finalCount = numRowsSelected - sumDisregard;

            if (finalCount < 0) finalCount = 0;

            newCount[pageIndex] = finalCount;

            setPageRowsCount(newCount);
        }

        if (hasClicked[pageIndex] !== true) return 0;
        if (pageRowsCount[pageIndex] === 0) {
            handleClickSelectAll(false);
            return 0;
        }

        if (paginated && paginated.type === 'controlled' && paging) {
            const currentPageRowsCount = pageRowsCount[pageIndex];

            const pageSizeLastItem = Math.min(paging.pageSize, paging.page * paging.pageSize - paging.finalItem)
            const pageSize = pageSizeLastItem === 0 ? paging.pageSize : pageSizeLastItem;

            if (currentPageRowsCount === 0) return 0;
            if (pageSize === currentPageRowsCount) return 1;
            return 2;
        }

        return 0;
    }, [hasClicked, handleClickSelectAll, numRowsSelected, pageRowsCount, paging, paginated]);

    const tableSelectAll = useCallback(() => {
        handleClickSelectAll(true);
        const newChecked = Boolean(!checkboxSelectStatus)
        tableDispatch({ type: 'select-all', payload: { checked: newChecked } })
    }, [tableDispatch, handleClickSelectAll]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    hasSelect && <TableTh columWidth={'50px'} onClick={tableSelectAll} >
                        <Checkbox name='table-select-all' checked={checkboxSelectStatus} />
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
