import styled, { css } from 'styled-components';
import { convertPercentageToAlpha } from 'utils';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

const buttonHeight = {
    sm: '32px',
    md: '40px',
    lg: '48px',
}

export type ButtonSize = keyof typeof buttonHeight;

interface ButtonProps {
    variant: ButtonVariant;
    size: ButtonSize;
    circle?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
}

const handleButtonVariant = (props: any) => {
    switch (props.variant) {
    case 'primary':
        return css`
            background-color: ${props => props.theme.colors.appScheme.button.primary.background};
            color: ${props => props.theme.colors.appScheme.button.primary.text};

            &:not(:disabled):hover  {
                opacity: ${props => props.theme.properties.opacity.xl};
            }

            &:not(:disabled):active {
                opacity: ${props => props.theme.properties.opacity.md};
            }

            &:disabled {
                opacity: ${props => props.theme.properties.opacity.md};
                cursor: not-allowed;
            }
        `
    case 'secondary':
    case 'tertiary':
        return css`
            background-color: ${props.theme.colors.appScheme.button.secondary.background};
            color: ${props.theme.colors.appScheme.button.secondary.text};
            border: ${props.variant === 'secondary' ? `1px solid ${props.theme.colors.appScheme.button.primary.background}` : 'none'};

            &:hover {
                background-color: ${props => `${props.theme.colors.appScheme.button.primary.background}${convertPercentageToAlpha(props.theme.properties.opacity.sm)}`};
            }

            &:active {
                background-color: ${props => `${props.theme.colors.appScheme.button.primary.background}${convertPercentageToAlpha(props.theme.properties.opacity.md)}`};
            }
        `
    }

    return css``;
}

const handleButtonWidth = (props: ButtonProps): string => {
    if (props.circle) return buttonHeight[props.size];
    if (props.fullWidth) return '100%';

    return 'auto';
}

export const ButtonStyled = styled.button<ButtonProps>`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    width: ${props => handleButtonWidth(props)};
    height: ${props => buttonHeight[props.size]};
    border: 0;
    border-radius: ${props => props.circle ? '50%' : '100em'};
    padding: 0 ${props => props.circle ? '0' : props.theme.properties.scale['3x']};
    font-size: ${props => props.theme.properties.fontSizeScale['up-01']};
    font-weight: ${props => props.theme.properties.fontWeight.semiBold};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;

    ${props => handleButtonVariant(props)}

    &:disabled {
    }
    
`