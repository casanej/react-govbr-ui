import React, { ReactElement, useEffect } from 'react'
import { ButtonSize, ButtonStyled, ButtonVariant } from './index.style';

interface Props {
    label: string;
    circle?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

export const Button = (props: Props): ReactElement => {

    return (
        <ButtonStyled
            circle={props.circle}
            disabled={props.disabled}
            fullWidth={props.fullWidth && !props.circle}
            size={props.size || 'md'}
            variant={props.variant || 'primary'}
        >
            {props.label}
        </ButtonStyled>
    );
};
