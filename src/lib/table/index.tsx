import { PageObj, TableActions, TableColumn, TablePaginationTypes, TableRow } from 'models';
import React, { ReactElement, useState } from 'react'
import { Pagination } from '../pagination';
import { TableHeaderContent, TableTBody, TableTHead } from './components';
import { TableBody, TableCustom, TableFooter, TableHeader, TableStyled } from './index.style';

interface Props {
    columns: TableColumn[];
    rows: TableRow[];
    actions?: TableActions[];
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
                    <TableTHead hasAction={!!props.actions} hasSelect={props.hasSelect} columns={props.columns} />
                    <TableTBody
                        actions={props.actions}
                        hasSelect={props.hasSelect}
                        rows={props.paginated && props.paginated.type === 'uncontrolled'
                            ? props.rows.slice(pageObj.initialItem - 1, pageObj.finalItem)
                            : props.rows
                        }
                        columns={props.columns}
                    />
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
