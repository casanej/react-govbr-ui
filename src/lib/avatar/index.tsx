import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react'
import { AvatarImage, AvatarStyled } from './index.style';

export interface AvatarProps {
    image?: string;
    onClick?: () => void;
}

export const Avatar = (props: AvatarProps): ReactElement => {

    return <AvatarStyled hasFunction={!!props.onClick} onClick={props.onClick}>
        {
            props.image
                ? <AvatarImage src={props.image} />
                : <FontAwesomeIcon icon={faUserCircle} color='#c5d4eb' size='3x' />
        }
    </AvatarStyled>;
};
