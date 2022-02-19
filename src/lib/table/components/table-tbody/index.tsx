import { TableColumn, TableColumnAction, TableColumnActions, TableColumnCustom, TableRow, TableRowDefault } from 'models';
import React, { ReactElement } from 'react'
import { TableTd } from '..';
import { TableBody, TableBodyTr } from './index.style';

interface Props {
    rows: TableRow[];
    columns: TableColumn[]
    actions?: TableColumnAction[];
    hasAction?: boolean;
    hasSelect?: boolean;
    onSelectRow?: (e: any) => void;
}

export const TableTBody = (props: Props): ReactElement => {

    const handleTdRender = (rawRow: TableRow, key: string) => {
        const column = props.columns.find((column) => column.accessor === key);

        if (key === 'actions' && props.hasAction) {
            const row = rawRow as TableColumnActions;
            return <TableTd
                key={key}
                type='actions'
                payload={{
                    func: row
                }}
            />
        }

        if (!column) return null;

        if (column.type === 'custom' && key !== 'actions') {
            const columnRender = column as TableColumnCustom;
            return <TableTd
                key={key}
                type='custom'
                payload={{
                    renderer: columnRender.renderer,
                    value: rawRow
                }}
            />
        }

        const row = rawRow as TableRowDefault;

        return <TableTd
            key={key}
            type={column.type || 'text'}
            payload={{}}
        >
            {row.value.toString()}
        </TableTd>
    }

    return <TableBody>
        {
            props.rows.map((row: any, index) => <TableBodyTr key={`table-row-${index}`}>
                {
                    props.hasSelect && <TableTd type='checkbox' payload={{
                        name: `table-row-${index}`,
                        onSelectRow: props.onSelectRow
                    }}/>
                }
                {
                    Object.keys(row).map((key: string) => handleTdRender(row[key], key))
                }
            </TableBodyTr>)
        }
    </TableBody>;
};
