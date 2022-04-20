import { TableRow } from 'models';
import React, { FC, useContext, useMemo, useState } from 'react';
import { TableTd, TableTdValue } from '..';
import { TableContext } from '../..';
import { TableTrStyled } from './index.style';

interface Props {
    row: any;
    index: number;
}

export const TableTr:FC<Props> = (props) => {
    const { index, row } = props;

    const { columns, hasSelect, onSelectRow } = useContext(TableContext);

    const [isActive, setIsActive] = useState<boolean>(false);

    const trName = useMemo(() => `table-row-${index}`, [index]);
    const columnsOrder = useMemo(() => columns.map(column => column.accessor), [columns]);

    const rowActive = useMemo(() => {
        return isActive;
    }, [isActive])

    const handleSelectRow = (row: TableRow) => (_: string, value: any) => {
        const boolValue = Boolean(value);

        setIsActive(boolValue);
        if (onSelectRow) onSelectRow({ selected: boolValue, index: trName, row });
    }

    return <TableTrStyled active={rowActive} >
        {
            hasSelect && <TableTdValue type='checkbox' payload={{
                name: trName,
                onSelectRow: handleSelectRow(row)
            }}/>
        }
        {
            columnsOrder.map((key: string) => <TableTd key={key} rowKey={key} row={row[key]} />)
        }
    </TableTrStyled>;
};
