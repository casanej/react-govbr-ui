import { PageObj, TableColumn, TablePaginationTypes, TableRow } from 'models';
import React, { ReactElement, useState } from 'react'
import { Loading, Pagination } from 'lib';
import { TableHeaderContent, TableTBody, TableTHead } from './components';
import { TableBody, TableCustom, TableFooter, TableHeader, TableLoading, TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    paginated?: TablePaginationTypes;
    onPaginationChange?: (pageObj: PageObj) => void
}

export const Table = (props: Props): ReactElement => {
    const [pageObj, setPageObj] = useState<PageObj>({ page: 1, pageSize: 10, initialItem: 1, finalItem: 10 });
    const handlePaginationChange = (pageObj: PageObj) => {
        if (props.paginated && props.paginated.type === 'controlled') {
            if (props.onPaginationChange) props.onPaginationChange(pageObj)
        } else {
            setPageObj(pageObj);
        }
    }

    return (
        <TableStyled>
            <TableHeader>
                <TableHeaderContent hasSearch={props.hasSearch} />
            </TableHeader>
            <TableBody>
                <TableCustom>
                    <TableTHead hasAction={props.hasActions} hasSelect={props.hasSelect} columns={props.columns} />
                    {
                        props.isLoading
                            ? <TableLoading>
                                <tr>
                                    <td colSpan={props.columns.length }>
                                        <Loading infinity='md' />
                                    </td>
                                </tr>
                            </TableLoading>
                            : <TableTBody
                                hasAction={props.hasActions}
                                hasSelect={props.hasSelect}
                                rows={props.paginated && props.paginated.type === 'uncontrolled'
                                    ? props.rows.slice(pageObj.initialItem - 1, pageObj.finalItem)
                                    : props.rows
                                }
                                columns={props.columns}
                            />
                    }
                </TableCustom>
            </TableBody>
            <TableFooter>
                {
                    props.paginated?.type === 'controlled'
                        ? <Pagination
                            initialPage={props.paginated.initialPage}
                            totalItems={props.paginated.totalItems}
                            onChange={handlePaginationChange}
                        />
                        : <Pagination
                            initialPage={1}
                            totalItems={props.rows.length}
                            onChange={handlePaginationChange}
                        />
                }
            </TableFooter>
        </TableStyled>
    );
};
