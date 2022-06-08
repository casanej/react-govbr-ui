import { Pagination } from 'lib';
import { PageObj } from 'models';
import React, { FC, useContext, useMemo } from 'react';
import { TableContext } from '../..';

export const TablePagination:FC = () => {
    const { onPaginationChange, paginated, paging, rows, tableDispatch } = useContext(TableContext);

    const paginationInitialPage = useMemo(() => {
        if (paginated && paginated.type === 'controlled') return paginated.initialPage;

        return 1;
    }, [paginated]);

    const paginationTotalItems = useMemo(() => {
        if (paginated && paginated.type === 'controlled') return paginated.totalItems;

        return rows.length;
    }, [rows, paginated, paging])

    const handleChangePagination = (pageObj: PageObj) => {
        if (paginated && paginated.type === 'controlled') tableDispatch({ type: 'set-loading', payload: { loading: true } })

        tableDispatch({ type: 'new-page', payload: pageObj })
        onPaginationChange && onPaginationChange(pageObj);
    }

    if (!paginated) return null;

    return <Pagination
        currentPage={paging.page}
        currentPageSize={paging.pageSize}
        initialPage={paginationInitialPage}
        totalItems={paginationTotalItems}
        onChange={handleChangePagination}
        variant={2}
    />;
};
