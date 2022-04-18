import { Loading } from 'lib';
import React, { FC, useContext } from 'react';
import { TableHeader, TablePagination, TableSelect, TableTBody, TableTHead } from '..';
import { TableContext } from '../..';
import { TableBody, TableCustom, TableFooter, TableLoading } from './index.style';

interface Props {
    tableWidth?: number;
}

export const TableContent:FC<Props> = (props) => {
    const { columns, isLoading } = useContext(TableContext);

    return <>
        <TableHeader />
        <TableSelect />
        <TableBody>
            <TableCustom tableWidth={props.tableWidth}>
                <TableTHead />
                {
                    isLoading
                        ? <TableLoading>
                            <tr>
                                <td colSpan={columns.length }>
                                    <Loading infinity='md' />
                                </td>
                            </tr>
                        </TableLoading>
                        : <TableTBody />
                }
            </TableCustom>
        </TableBody>
        <TableFooter>
            <TablePagination />
        </TableFooter>
    </>;
};
