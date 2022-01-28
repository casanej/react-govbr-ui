import { MenuItemGroup, MenuItemsProps } from 'models';
import React, { ReactElement } from 'react'
import { MenuItem } from '..';
import { MenuItemListStyled } from './index.style';

interface Props {
    items: MenuItemsProps[];
    isOpen?: boolean;
    handleEvidentMenu?: (item: MenuItemGroup) => void;
}

export const MenuItemList = (props: Props): ReactElement => {
    return <MenuItemListStyled isOpen={props.isOpen || false}>
        {
            props.items.map((item, itemIndex) => <MenuItem key={itemIndex} item={item} variant='secondary' handleEvidentMenu={props.handleEvidentMenu} />)
        }
    </MenuItemListStyled>;
};
