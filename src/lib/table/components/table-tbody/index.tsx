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
        return <TableBody>
            {
                rows.slice(paging.initialItem - 1, paging.finalItem).map((row, index) => <TableTr key={index} row={row} />)
            }
        </TableBody>;
    }

    return <TableBody>
        {
            rows.map((row, index) => <TableTr key={index} row={row} />)
        }
    </TableBody>;
};
