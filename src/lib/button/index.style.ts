import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const buttonHeight = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
}

interface ButtonProps {
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth?: boolean;
}

const handleButtonSize = (size: ButtonSize) => {
    return ''
}

export const ButtonStyled = styled.div<ButtonProps>`
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    height: ${props => buttonHeight[props.size]};

    &:hover {
        opacity: ${props => props.theme.properties.opacity.xs};
    }

    &:active {
        opacity: ${props => props.theme.properties.opacity.md};
    }

    height: ${props => handleButtonSize(props.size)}

    ${props => props.variant === 'primary' && css`
        background-color: ${props.theme.colors.appScheme.button.primary.background};
        color: ${props.theme.colors.appScheme.button.primary.text};
    `}

    ${props => props.variant === 'secondary' && css`
        background-color: ${props.theme.colors.appScheme.button.secondary.background};
        color: ${props.theme.colors.appScheme.button.secondary.text};
        border: 1px solid ${props.theme.colors.appScheme.button.primary.background};
    `}
`