import React, { ReactElement, useCallback, useContext, useLayoutEffect } from 'react';
import { TableTdValue, TableTr } from '..';
import { TableContext } from '../..';
import { TableBody } from './index.style';

export const TableTBody = (): ReactElement => {
    const { columns, rows, paginated, paging } = useContext(TableContext);

    useLayoutEffect(() => {
        handleRowsChange();
    }, [rows]);

    const handleRowsChange = useCallback(async() => {
        await new Promise(resolve => setTimeout(resolve, 0.1));
    }, [rows]);

    if (rows.length === 0) return <TableTdValue type={'text'} payload={{}} colSpan={columns.length} >
        <div style={{textAlign: 'center'}}>
            <h3>Nenhum registro encontrado.</h3>
        </div>
    </TableTdValue>;

    if (paging && paginated && paginated.type === 'uncontrolled') {
        const initialItem = paging.pageSize * (paging.page - 1);
        const finalItem = Math.min(paging.pageSize * paging.page, rows.length)

        return <TableBody>
            {
                rows.slice(initialItem, finalItem).map((row, index) => <TableTr key={index} row={row} />)
            }
        </TableBody>;
    }

    return <TableBody>
        {
            rows.map(row => <TableTr key={row.id} row={row} />)
        }
    </TableBody>;
};
