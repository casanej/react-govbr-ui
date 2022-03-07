import { Checkbox } from 'lib';
import { TableColumn } from 'models';
import React, { ReactElement, useMemo } from 'react'
import { TableTHeadStyled, TableHeadTr, TableTh } from './index.style';

interface Props {
    columns: TableColumn[];
    width?: string;
    hasAction?: boolean;
    hasSelect?: boolean;
    onSelectAll?: (e: any) => void;
}

export const TableTHead = (props: Props): ReactElement => {
    const numColumns = useMemo(() => {
        let totalColumns = props.columns.length;

        if (props.hasAction) totalColumns++;
        if (props.hasSelect) totalColumns++;

        return totalColumns;
    }, [props.columns, props.hasAction, props.hasSelect]);

    return (
        <TableTHeadStyled>
            <TableHeadTr>
                {
                    props.hasSelect && <TableTh width={'50px'}>
                        <Checkbox name='table-select-all' onChange={props.onSelectAll} />
                    </TableTh>
                }
                {props.columns.map((column: any) => {
                    if (column.accessor === 'actions') {
                        if (props.hasAction) return <TableTh key={column.accessor} width={props.width || `${100 / numColumns}%`}>{column.title}</TableTh>;

                        return null;
                    }

                    return <TableTh key={column.accessor} width={props.width || `${100 / numColumns}%`}>{column.title}</TableTh>
                })}
            </TableHeadTr>
        </TableTHeadStyled>
    );
};
