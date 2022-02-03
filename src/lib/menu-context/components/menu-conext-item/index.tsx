import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import { MenuContextItemStyled } from './index.style';

interface Props {
    label: string;
    icon?: IconName;
    onClick?: () => void;
    url?: string;
}

export const MenuContextItem = (props: Props): ReactElement => {

    const iconElement = props.icon ? <FontAwesomeIcon icon={props.icon} color={'#1351B4'}/> : null;

    if (props.url) return <Link to={props.url}>
        <MenuContextItemStyled onClick={props.onClick}>
            {iconElement}
            <div>{props.label}</div>
        </MenuContextItemStyled>
    </Link>;

    return <MenuContextItemStyled onClick={props.onClick}>
        {iconElement}
        <div>{props.label}</div>
    </MenuContextItemStyled>;
};
