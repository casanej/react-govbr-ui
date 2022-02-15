import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'lib';
import { TableActions, TableColumn, TableColumnCustom, TableRow } from 'models';
import React, { ReactElement } from 'react'
import { TableTd } from '..';
import { TableBody, TableBodyTr, TableTdActions } from './index.style';

interface Props {
    rows: TableRow[];
    columns: TableColumn[]
    actions?: TableActions[];
    hasSelect?: boolean;
    onSelectRow?: (e: any) => void;
}

export const TableTBody = (props: Props): ReactElement => {

    const handleTdRender = (rawRow: TableRow, key: string) => {
        const column = props.columns.find((column) => column.accessor === key);
        const row = rawRow[key];

        if (!column) return null;

        if (column.type === 'custom') {
            const columnRender = column as TableColumnCustom;
            return <TableTd
                key={key}
                type='custom'
                renderer={columnRender.renderer}
                value={row.value}
            />
        }

        return <TableTd
            key={key}
            type={column.type || 'text'}
        >
            {row.value}
        </TableTd>
    }

    return <TableBody>
        {
            props.rows.map((row: any, index) => <TableBodyTr key={`table-row-${index}`}>
                {
                    props.hasSelect && <TableTd type='checkbox' name={`table-row-${index}`} onSelectRow={props.onSelectRow} />
                }
                {
                    Object.keys(row).map((key: string) => handleTdRender(row, key))
                }
                {
                    props.actions && <TableTd type='text'>
                        <TableTdActions>
                            {
                                props.actions.map(action => <Button key={action.label} variant='tertiary' circle onClick={action.fn}><FontAwesomeIcon icon={action.icon} /></Button>)
                            }
                        </TableTdActions>
                    </TableTd>
                }
            </TableBodyTr>)
        }
    </TableBody>;
};
