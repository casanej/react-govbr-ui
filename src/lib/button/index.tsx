import React, { ReactElement } from 'react'
import { Loading } from 'lib'
import { ButtonSize, ButtonStyled, ButtonVariant, ButtonLoading} from './index.style';

interface Props {
    label: React.ReactNode;
    circle?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

export const Button = (props: Props): ReactElement => {

    return (
        <ButtonStyled
            circle={props.circle}
            disabled={props.disabled}
            fullWidth={props.fullWidth && !props.circle}
            isLoading={props.isLoading}
            size={props.size || 'md'}
            variant={props.variant || 'primary'}
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
