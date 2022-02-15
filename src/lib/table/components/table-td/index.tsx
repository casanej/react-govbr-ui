import { Checkbox } from 'lib';
import { TableTdTypes } from 'models';
import React, { ReactElement } from 'react'
import { formatNumber } from 'utils';
import { TableTdStyled } from './index.style';

export const TableTd = (props: TableTdTypes): ReactElement => {

    if (props.type === 'checkbox') return <TableTdStyled width='50px'>
        <Checkbox name={`table-row-${props.name}`} onChange={props.onSelectRow} />
    </TableTdStyled>

    if (props.type === 'custom') return <TableTdStyled>
        {props.renderer(props.value)}
    </TableTdStyled>

    if (['number', 'number_min', 'money', 'money_min'].includes(props.type)) return <TableTdStyled width={props.width}>{formatNumber(props.children as string | number, props.type)}</TableTdStyled>;

    return <TableTdStyled width={props.width} >{props.children}</TableTdStyled>;
};
