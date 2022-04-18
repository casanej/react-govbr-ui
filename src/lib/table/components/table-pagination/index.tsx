import { Pagination } from 'lib';
import React, { FC, useContext, useMemo } from 'react';
import { TableContext } from '../..';

export const TablePagination:FC = () => {
    const { onPaginationChange, paginated, rows } = useContext(TableContext);

    const paginationInitialPage = useMemo(() => {
        if (paginated && paginated.type === 'controlled') return paginated.initialPage;

        return 1;
    }, []);

    const paginationTotalItems = useMemo(() => {

        if (paginated && paginated.type === 'controlled') return paginated.totalItems;

        return rows.length;
    }, [rows, paginated])

    return <Pagination
        initialPage={paginationInitialPage}
        totalItems={paginationTotalItems}
        onChange={onPaginationChange}
        variant={2}
    />;
};
