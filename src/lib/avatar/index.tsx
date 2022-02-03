import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react'
import { AvatarImage, AvatarStyled } from './index.style';

interface Props {
    image?: string;
}

export const Avatar = (props: Props): ReactElement => {

    return <AvatarStyled>
        {
            props.image
                ? <AvatarImage src={props.image} />
                : <FontAwesomeIcon icon={faUserCircle} color='#c5d4eb' size='3x' />
        }
    </AvatarStyled>;
};
