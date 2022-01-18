import { Checkbox } from 'lib';
import React, { ReactElement } from 'react'
import { TableTHeadStyled, TableHeadTr, TableTh } from './index.style';

interface Props {
    columns: Array<any>;
    width?: string;
    hasSelect?: boolean;
    onSelectAll?: (e: any) => void;
}

export const TableTHead = (props: Props): ReactElement => {

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    props.hasSelect && <TableTh width={'50px'}>
                        <Checkbox name='table-select-all' onChange={props.onSelectAll} />
                    </TableTh>
                }
                {props.columns.map((column: any) =>
                    <TableTh key={column.accessor} width={props.width || `${100 / props.columns.length}%`}>{column.title}</TableTh>
                )}
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
