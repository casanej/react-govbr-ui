import React, { ReactElement } from 'react'
import { Loading } from 'lib'
import { ButtonSize, ButtonStyled, ButtonVariant, ButtonLoading} from './index.style';

type ButtonTypes = 'button' | 'submit' | 'reset';

export interface ButtonProps {
    label: React.ReactNode;
    circle?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    size?: ButtonSize;
    type?: ButtonTypes;
    variant?: ButtonVariant;
    onClick?: () => void;
}

export const Button = (props: ButtonProps): ReactElement => {

    const handleClick = () => {
        if (props.onClick) props.onClick();
    }

    return (
        <ButtonStyled
            circle={props.circle}
            disabled={props.disabled}
            fullWidth={props.fullWidth && !props.circle}
            isLoading={props.isLoading}
            size={props.size || 'md'}
            type={props.type || 'button'}
            variant={props.variant || 'primary'}
            onClick={handleClick}
        >
            {props.isLoading
                ? <ButtonLoading>
                    {/* <div>Carregando</div> */}
                    <Loading infinity='sm' variant='secondary' />
                </ButtonLoading>
                : props.label}
        </ButtonStyled>
    );
};
