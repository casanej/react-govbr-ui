import React, { ReactElement } from 'react'
import { Pagination } from '../pagination';
import { TableHeaderContent, TableTBody, TableTHead } from './components';
import { TableBody, TableCustom, TableFooter, TableHeader, TableStyled } from './index.style';

interface Props {
    columns: Array<{
        title: string;
        accessor: string;
    }>;
    rows: Array<any>;
    hasSelect?: boolean;
}

export const Table = (props: Props): ReactElement => {
    return (
        <TableStyled>
            <TableHeader>
                <TableHeaderContent />
            </TableHeader>
            <TableBody>
                <TableCustom>
                    <TableTHead hasSelect={props.hasSelect} columns={props.columns} />
                    <TableTBody hasSelect={props.hasSelect} rows={props.rows} />
                </TableCustom>
            </TableBody>
            <TableFooter>
                <Pagination />
            </TableFooter>
        </TableStyled>
    );
};
