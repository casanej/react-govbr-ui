import { TableColumn, TableColumnAction, TableColumnActions, TableColumnCustom, TableRow, TableRowDefault } from 'models';
import React, { ReactElement, useMemo } from 'react'
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

    const columnsOrder = useMemo(() => props.columns.map(column => column.accessor), [props.columns]);

    const handleTdRender = (rawRow: TableRow, key: string) => {
        const column = props.columns.find((column) => column.accessor === key);

        if (key === 'actions') {
            if (props.hasAction) {
                const row = rawRow as TableColumnActions;
                return <TableTd
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

        if (!row) return <TableTd key={key} type={'text'} payload={{}} >
            <div>{''}</div>
        </TableTd>

        return <TableTd
            key={key}
            type={column.type || 'text'}
            payload={{}}
        >
            {row.toString()}
        </TableTd>
    }

    if (props.rows.length === 0) return <TableTd type={'text'} payload={{}} colSpan={props.columns.length} >
        <div style={{textAlign: 'center'}}>
            <h3>Nenhum registro encontrado</h3>
        </div>
    </TableTd>;

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
                    columnsOrder.map((key: string) => handleTdRender(row[key], key))
                }
            </TableBodyTr>)
        }
    </TableBody>;
};
