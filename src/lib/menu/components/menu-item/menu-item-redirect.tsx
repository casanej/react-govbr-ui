import { MenuItemsProps } from 'models';
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    item: MenuItemsProps;
    children: React.ReactNode;
}

export const MenuItemRedirect = (props: Props): ReactElement => {
    if (props.item.groupType === 'item') return <Link to={props.item.url}>{props.children}</Link>;

    return <>{props.children}</>;
};
