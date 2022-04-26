import { TableRowTreated } from 'models';
import React, { FC, useContext, useMemo } from 'react';
import { TableTd, TableTdValue } from '..';
import { TableContext } from '../..';
import { TableTrStyled } from './index.style';

interface Props {
    row: TableRowTreated;
}

export const TableTr:FC<Props> = (props) => {
    const { row } = props;

    const { columns, hasSelect, onSelectRow } = useContext(TableContext);

    const columnsOrder = useMemo(() => columns.map(column => column.accessor), [columns]);

    const handleSelectRow = (id: string) => (_: string, value: any) => {
        const boolValue = Boolean(value);

        if (onSelectRow) onSelectRow({ selected: boolValue, id: id, row: row.row });
    }

    return <TableTrStyled active={row.selected} >
        {
            hasSelect && <TableTdValue type='checkbox' payload={{
                name: row.id,
                onSelectRow: handleSelectRow(row.id)
            }}/>
        }
        {
            columnsOrder.map((key: string) => {
                const validRow = row.row as any;
                return <TableTd key={key} rowKey={key} row={validRow[key]} />
            })
        }
    </TableTrStyled>;
};
