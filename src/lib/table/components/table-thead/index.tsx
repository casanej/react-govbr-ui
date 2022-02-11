import { Checkbox } from 'lib';
import React, { ReactElement, useMemo } from 'react'
import { TableTHeadStyled, TableHeadTr, TableTh } from './index.style';

interface Props {
    columns: Array<any>;
    width?: string;
    hasAction?: boolean;
    hasSelect?: boolean;
    onSelectAll?: (e: any) => void;
}

export const TableTHead = (props: Props): ReactElement => {
    const numColumns = useMemo(() => {
        return props.hasAction ? props.columns.length : props.columns.length + 1;
    }, [props.columns, props.hasAction]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    props.hasSelect && <TableTh width={'50px'}>
                        <Checkbox name='table-select-all' onChange={props.onSelectAll} />
                    </TableTh>
                }
                {props.columns.map((column: any) =>
                    <TableTh key={column.accessor} width={props.width || `${100 / numColumns}%`}>{column.title}</TableTh>
                )}
                {
                    props.hasAction && <TableTh key={'actions'} width={props.width || `${100 / numColumns}%`}>Actions</TableTh>
                }
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
