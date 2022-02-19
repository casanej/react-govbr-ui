import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox } from 'lib';
import { TableTdTypeActions, TableTdTypeCheckBox, TableTdTypeCustom, TableTdTypes } from 'models';
import React, { ReactElement } from 'react'
import { formatNumber } from 'utils';
import { TableTdStyled } from './index.style';

interface Props {
    children?: string | number;
    type: TableTdTypes['type'];
    width?: string;
    payload: TableTdTypes['payload'];
}

export const TableTd = (props: Props): ReactElement => {

    if (props.type === 'checkbox') {
        const customProps = props.payload as TableTdTypeCheckBox['payload'];

        return <TableTdStyled width='50px'>
            <Checkbox name={`table-row-${customProps.name}`} onChange={customProps.onSelectRow} />
        </TableTdStyled>
    }

    if (props.type === 'custom') {
        const customProps = props.payload as TableTdTypeCustom['payload'];

        return <TableTdStyled>
            {customProps.renderer(customProps.value.value.toString())}
        </TableTdStyled>
    }

    if (props.type === 'actions') {
        const customProps = props.payload as TableTdTypeActions['payload'];

        return <TableTdStyled>
            {customProps.func.map((action) => <Button key={action.label} variant='tertiary' circle onClick={action.fn}>
                <FontAwesomeIcon icon={action.icon} />
            </Button>)}
        </TableTdStyled>
    }

    if (['number', 'number_min', 'money', 'money_min'].includes(props.type)) return <TableTdStyled width={props.width}>{formatNumber(props.children as string | number, props.type)}</TableTdStyled>;

    return <TableTdStyled width={props.width} >{props.children}</TableTdStyled>;
};
