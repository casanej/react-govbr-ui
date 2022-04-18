import { TableColumnActions, TableColumnCustom, TableRowDefault } from 'models';
import React, { FC, useContext } from 'react';
import { TableTdValue } from '..';
import { TableContext } from '../..';

interface Props {
    rowKey: string;
    row: any;
}

export const TableTd:FC<Props> = (props) => {
    const { rowKey: key, row: rawRow } = props;
    const { columns, hasActions } = useContext(TableContext);

    const column = columns.find((column) => column.accessor === key);

    if (key === 'actions') {
        if (hasActions) {
            const row = rawRow as TableColumnActions;

            return <TableTdValue
                key={key}
                type='actions'
                payload={{
                    func: row
                }}
            />
        }
        return null
    }

    if (!column) return null;

    if (column.type === 'custom' && key !== 'actions') {
        const columnRender = column as TableColumnCustom;
        return <TableTdValue
            key={key}
            type='custom'
            payload={{
                renderer: columnRender.renderer,
                value: rawRow
            }}
        />
    }

    const row = rawRow as TableRowDefault;

    if (!row) return <TableTdValue key={key} type={'text'} payload={{}} >
        <div>{''}</div>
    </TableTdValue>

    return <TableTdValue
        key={key}
        type={column.type || 'text'}
        payload={{}}
    >
        {row.toString()}
    </TableTdValue>
};
