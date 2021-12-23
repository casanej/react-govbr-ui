import React, { ReactElement, useEffect } from 'react'
import { ButtonSize, ButtonStyled, ButtonVariant } from './index.style';

interface Props {
    label: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

export const Button = (props: Props): ReactElement => {
    return (
        <ButtonStyled
            variant={props.variant || 'primary'}
            size={props.size || 'md'}
        >
            {props.label}
        </ButtonStyled>
    );
};
