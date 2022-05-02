import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { Button, Checkbox } from 'lib';
import { TableTdTypeActions, TableTdTypeCheckBox, TableTdTypeCustom, TableTdTypes } from 'models';
import React, { ReactElement } from 'react';
import { formatNumber } from 'utils';
import { TableTdStyled } from './index.style';

interface Props {
    children?: React.ReactNode;
    payload: TableTdTypes['payload'];
    type: TableTdTypes['type'];
    colSpan?: number;
    width?: string;
}

export const TableTdValue = (props: Props): ReactElement => {

    if (props.type === 'checkbox') {
        const customProps = props.payload as TableTdTypeCheckBox['payload'];

        return <TableTdStyled width='50px'>
            <Checkbox name={`table-row-${customProps.name}`} checked={customProps.checked} onClick={customProps.onSelectRow} />
        </TableTdStyled>
    }

    if (props.type === 'custom') {
        const customProps = props.payload as TableTdTypeCustom['payload'];

        return <TableTdStyled>
            {customProps.renderer(customProps.value.toString())}
        </TableTdStyled>
    }

    if (props.type === 'actions') {
        const customProps = props.payload as TableTdTypeActions['payload'];

        return <TableTdStyled>
            {customProps.func.map((action) => {

                if (typeof action.icon === 'string') return <Button key={action.label} variant='tertiary' circle onClick={action.fn}>
                    <FontAwesomeIcon icon={action.icon} />
                </Button>

                return action.icon;
            })}
        </TableTdStyled>
    }

    if (['number', 'number_min', 'money', 'money_min'].includes(props.type)) return <TableTdStyled width={props.width}>{formatNumber(props.children as string | number, props.type)}</TableTdStyled>;

    if ( props.type === 'date') return <TableTdStyled width={props.width}>{new Date(props.children as string).toLocaleDateString()}</TableTdStyled>;
    if ( props.type === 'date_time') return <TableTdStyled width={props.width}>
        {format(new Date(props.children as string), 'dd/MM/yyyy HH:mm')}
    </TableTdStyled>;

    return <TableTdStyled width={props.width} colSpan={props.colSpan} >{props.children}</TableTdStyled>;
};
