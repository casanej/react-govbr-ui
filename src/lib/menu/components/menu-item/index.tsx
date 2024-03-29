import { faAngleDown, faAngleRight, faAngleUp, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItemGroup, MenuItemsProps } from 'models';
import React, { ReactElement, useState } from 'react';
import { MenuItemList } from '..';
import { MenuItemContent, menuItemDensity, MenuItemLabel, MenuItemStyled, MenuItemVariant } from './index.style';
import { MenuItemRedirect } from './menu-item-redirect';

interface Props {
    item: MenuItemsProps;
    density?: keyof typeof menuItemDensity;
    handleEvidentMenu?: (item: MenuItemGroup) => void;
    onClick?: () => void;
    variant?: MenuItemVariant;
}

export const MenuItem = (props: Props): ReactElement => {
    const { item } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleOpen = () => {
        if (item.groupType === 'item' && props.onClick) {
            props.onClick();
        } else if (item.groupType !== 'item' && props.variant === 'secondary') {
            const handleItem = props.item as MenuItemGroup;

            if (props.handleEvidentMenu) {
                props.handleEvidentMenu(handleItem);
            }
        } else {
            setIsOpen(oldOpen => !oldOpen);
        }
    }

    return <MenuItemRedirect item={props.item}>
        <MenuItemStyled variant={props.variant || 'primary'} density={props.density || 'lg'} onClick={handleToggleOpen}>
            <MenuItemContent>
                <div>
                    {
                        item.icon && <FontAwesomeIcon icon={item.icon} />
                    }
                    <MenuItemLabel>{item.label}</MenuItemLabel>
                </div>
                {
                    item.groupType === 'expand' && <>
                        {
                            props.variant === 'secondary'
                                ? <FontAwesomeIcon icon={faAngleRight} />
                                : isOpen
                                    ? <FontAwesomeIcon icon={faAngleUp} />
                                    : <FontAwesomeIcon icon={faAngleDown} />
                        }
                    </>
                }
                {
                    item.groupType === 'item_external' && <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                }
            </MenuItemContent>
        </MenuItemStyled>
        {
            item.groupType === 'divider'
            || item.groupType === 'evident'
            || item.groupType === 'expand' && <>
                {
                    item.subItems && <MenuItemList isOpen={isOpen} items={item.subItems} handleEvidentMenu={props.handleEvidentMenu} onClick={props.onClick} />
                }
            </>
        }
    </MenuItemRedirect>;
};
