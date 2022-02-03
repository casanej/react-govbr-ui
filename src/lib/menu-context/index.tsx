import React, { ReactElement, useRef } from 'react';
import { MenuContextItemProps } from 'models';
import { MenuContextItem } from './components';
import { MenuContextStyled, MenuContextTitle, OffsetPosition } from './index.style';
import { useOnClickOutside } from 'hooks';

interface Props {
    items: MenuContextItemProps[];
    open: boolean;
    title: string;
    onClose?: () => void;
    offset?: OffsetPosition;
}

export const MenuContext = (props: Props): ReactElement => {
    const menuRef = useRef<HTMLDivElement>();
    useOnClickOutside(menuRef, props.onClose)

    return <MenuContextStyled ref={menuRef} isOpen={props.open} offset={props.offset || { x: 0, y: 0 }}>
        <MenuContextTitle>{props.title}</MenuContextTitle>
        <div>
            {
                props.items.map((item, index) => <MenuContextItem key={index} {...item} />)
            }
        </div>
    </MenuContextStyled>;
};
