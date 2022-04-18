import React, { ReactElement, useContext } from 'react';
import { TableTdValue, TableTr } from '..';
import { TableContext } from '../..';
import { TableBody } from './index.style';

export const TableTBody = (): ReactElement => {
    const { columns, rows } = useContext(TableContext);

    if (rows.length === 0) return <TableTdValue type={'text'} payload={{}} colSpan={columns.length} >
        <div style={{textAlign: 'center'}}>
            <h3>Nenhum registro encontrado.</h3>
        </div>
    </TableTdValue>;

    return <TableBody>
        {
            rows.map((row, index) => <TableTr key={index} index={index} row={row} />)
        }
    </TableBody>;
};
