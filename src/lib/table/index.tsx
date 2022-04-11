import { Loading, Pagination } from 'lib';
import { PageObj, TableColumn, TablePaginationTypes, TableRow } from 'models';
import React, { ReactElement, useState } from 'react';
import { TableHeaderContent, TableTBody, TableTHead } from './components';
import { TableTitle } from './components/table-header-content/index.style';
import { TableBody, TableCustom, TableFooter, TableHeader, TableLoading, TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    isLoading?: boolean;
    hasActions?: boolean;
    hasSearch?: boolean;
    hasSelect?: boolean;
    onPaginationChange?: (pageObj: PageObj) => void
    paginated?: TablePaginationTypes;
    title?: string;
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
            {
                props.hasSearch || props.title && <TableHeader>
                    {
                        props.title && <TableTitle>{props.title}</TableTitle>
                    }
                    <TableHeaderContent hasSearch={props.hasSearch} />
                </TableHeader>
            }

            <TableHeaderContent hasSearch={props.hasSearch} />
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
                            variant={2}
                        />
                        : <Pagination
                            initialPage={1}
                            totalItems={props.rows.length}
                            onChange={handlePaginationChange}
                            variant={2}
                        />
                }
            </TableFooter>
        </TableStyled>
    );
};
