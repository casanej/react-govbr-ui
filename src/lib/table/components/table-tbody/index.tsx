import { Checkbox } from 'lib';
import React, { ReactElement } from 'react'
import { TableBody, TableBodyTr, TableTd } from './index.style';

interface Props {
    rows: Array<any>;
    hasSelect?: boolean;
    onSelectRow?: (e: any) => void;
}

export const TableTBody = (props: Props): ReactElement => {

    return <TableBody>
        {
            props.rows.map((row: any, index) => <TableBodyTr key={`table-row-${index}`}>
                {
                    props.hasSelect && <TableTd width={'50px'}>
                        <Checkbox name={`table-row-${index}`} onChange={props.onSelectRow} />
                    </TableTd>
                }
                {
                    Object.keys(row).map((key: string) => <TableTd key={key}>{row[key].value}</TableTd>)
                }
            </TableBodyTr>)
        }
    </TableBody>;
};
