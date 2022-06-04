import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useMemo } from 'react';
import { useTableContext } from '../..';
import { TableThIcons, TableThStyled, TableThTitle } from './index.style';

interface Props {
    columWidth: string;
    accessor?: string;
    onClick?: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void;
}

export const TableTh:FC<Props> = (props) => {
    const { tableDispatch, ordering, selectedOrder } = useTableContext();
    const accessor = useMemo(() => {
        if (props.accessor) return props.accessor;

        return '';
    }, [props.accessor]);

    const hasOrder = useMemo(() => {
        if (ordering) {
            return ordering.columnsOrder.includes(accessor)
        }

        return false;
    }, [accessor, ordering]);

    const orderType = useMemo(() => {
        if (selectedOrder) {
            const selectedOrderAccessor = selectedOrder[accessor];

            if (selectedOrderAccessor) return selectedOrderAccessor.order;
        }

        return 'none';
    }, [accessor, selectedOrder]);

    const handleOrderType = useCallback(() => {
        if (hasOrder) {
            tableDispatch({ type: 'set-loading', payload: { loading: true } });
            tableDispatch({ type: 'ordering', payload: { orderBy: accessor } });
        }
    }, [accessor, hasOrder, orderType]);

    const iconOrderType = useMemo(():IconProp[] => {
        if (orderType === 'asc') return ['caret-up'];
        if (orderType === 'desc') return ['caret-down'];

        return ['caret-up', 'caret-down'];
    }, [orderType]);

    return <TableThStyled columWidth={props.columWidth} onClick={(e) => { handleOrderType(); props.onClick && props.onClick(e) }}>
        <TableThTitle>
            <div>{props.children}</div>
            {
                hasOrder && <TableThIcons>
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
