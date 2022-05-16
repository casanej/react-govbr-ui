import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableOrdering, TableOrderType } from 'models';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useTableContext } from '../..';
import { TableThIcons, TableThStyled, TableThTitle } from './index.style';

interface Props {
    columWidth: string;
    accessor?: string;
    onClick?: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void;
    ordering?: TableOrdering;
}

export const TableTh:FC<Props> = (props) => {
    const { tableDispatch } = useTableContext();
    const [orderType, setOrderType] = useState<TableOrderType>('none');

    const handleOrderType = useCallback(() => {
        let newOrderType = orderType;

        if (orderType === 'none') {
            newOrderType = 'asc';
        } else if (orderType === 'asc') {
            newOrderType = 'desc';
        } else if (orderType === 'desc') {
            newOrderType = 'none';
        }

        if (props.ordering) {
            tableDispatch({ type: 'set-loading', payload: { loading: true } });
            const accessor = props.accessor || '';
            if (props.ordering?.type === 'external') {
                props.ordering.onOrder(accessor, newOrderType);
            } else {
                tableDispatch({ type: 'ordering', payload: { order: newOrderType, orderBy: accessor } });
            }
        }

        setOrderType(newOrderType);
    }, [orderType]);

    const iconOrderType = useMemo(():IconProp[] => {
        if (orderType === 'asc') return ['caret-up'];
        if (orderType === 'desc') return ['caret-down'];

        return ['caret-up', 'caret-down'];
    }, [orderType]);

    return <TableThStyled columWidth={props.columWidth} onClick={(e) => { handleOrderType(); props.onClick && props.onClick(e) }}>
        <TableThTitle>
            <div>{props.children}</div>
            {
                props.ordering && <TableThIcons>
                    {
                        iconOrderType.map((icon, index) => {
                            return <FontAwesomeIcon key={index} icon={icon} />
                        })
                    }
                </TableThIcons>
            }
        </TableThTitle>
    </TableThStyled>;
};
