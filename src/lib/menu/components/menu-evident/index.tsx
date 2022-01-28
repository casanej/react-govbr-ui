import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItemGroup } from 'models';
import React, { ReactElement } from 'react'
import { MenuItem } from '..';
import { MenuEvidentHeader, MenuEvidentLabel, MenuEvidentStyled } from './index.style';

interface Props {
    item: MenuItemGroup;
    handleEvidentMenu: (item: MenuItemGroup) => void;
    handleRemoveEvidentMenu: () => void;
}

export const MenuEvident = (props: Props): ReactElement => {
    return (
        <MenuEvidentStyled>
            <MenuEvidentHeader onClick={props.handleRemoveEvidentMenu}>
                <div>
                    <FontAwesomeIcon icon={faAngleLeft} color='#0c326f' />
                    <MenuEvidentLabel>{props.item.label}</MenuEvidentLabel>
                </div>
                {
                    props.item.icon && <FontAwesomeIcon icon={props.item.icon} color={'#0c326f'} />
                }
            </MenuEvidentHeader>
            {
                props.item.subItems && props.item.subItems.map((item, itemIndex) => <MenuItem
                    key={itemIndex}
                    item={item}
                    variant='secondary'
                    handleEvidentMenu={(subItem) => props.handleEvidentMenu(subItem)}
                />)
            }
        </MenuEvidentStyled>
    );
};
