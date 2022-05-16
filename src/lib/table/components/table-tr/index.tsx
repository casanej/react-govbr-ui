import { TableRowTreated } from 'models';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { TableTd, TableTdValue } from '..';
import { TableContext } from '../..';
import { TableTrStyled } from './index.style';

interface Props {
    row: TableRowTreated;
}

export const TableTr:FC<Props> = (props) => {
    const { row } = props;

    const { columns, hasSelect, onSelectRow, selectedRowsId } = useContext(TableContext);

    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        setFirstRender(false);
    }, [])

    const isSelected = useMemo(() => {
        return selectedRowsId.includes(row.id);
    }, [selectedRowsId.length])

    const columnsOrder = useMemo(() => columns.map(column => column.accessor), [columns]);

    const handleSelectRow = (id: string) => (value: any) => {
        const boolValue = Boolean(value);

        if (onSelectRow && !firstRender) onSelectRow({ selected: boolValue, id: id, row: row.row });
    }

    return <TableTrStyled active={isSelected} >
        {
            hasSelect && <TableTdValue type='checkbox' payload={{
                checked: +isSelected,
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
