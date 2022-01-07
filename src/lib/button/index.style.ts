import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

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
    isLoading?: boolean;
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
        return css`
            background-color: ${props.theme.colors.appScheme.button.secondary.background};
            color: ${props.theme.colors.appScheme.button.secondary.text};
            border: ${props.variant === 'secondary' ? `1px solid ${props.theme.colors.appScheme.button.primary.background}` : 'none'};

            &:not(:disabled):hover {
                background-color: ${props => `${hexColorApplyAlpha(props.theme.colors.appScheme.button.primary.background, props.theme.properties.opacity.sm)}`};
            }

            &:not(:disabled):active {
                background-color: ${props => `${hexColorApplyAlpha(props.theme.colors.appScheme.button.primary.background, props.theme.properties.opacity.md)}`};
            }

            &:disabled {
                opacity: ${props => props.theme.properties.opacity.md};
                cursor: not-allowed;
            }
        `

    case 'tertiary':
        return css`
            background-color: transparent;
            color: ${props.theme.colors.appScheme.button.secondary.text};
            border: ${props.variant === 'secondary' ? `1px solid ${props.theme.colors.appScheme.button.primary.background}` : 'none'};

            &:not(:disabled):hover {
                background-color: ${props => `${hexColorApplyAlpha(props.theme.colors.appScheme.button.primary.background, props.theme.properties.opacity.sm)}`};
            }

            &:not(:disabled):active {
                background-color: ${props => `${hexColorApplyAlpha(props.theme.colors.appScheme.button.primary.background, props.theme.properties.opacity.md)}`};
            }

            &:disabled {
                opacity: ${props => props.theme.properties.opacity.md};
                cursor: not-allowed;
            }
        `
    }

    return css``;
}

const handleLoadingVariant = (props: any) => {
    switch (props.variant) {
    case 'primary': return css`
            color: ${props => props.theme.colors.appScheme.button.primary.background};
        `
    case 'secondary':
    case 'tertiary': return css`
            color: ${props => props.theme.colors.appScheme.button.secondary.background};
        `
    }

    return css``
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
    min-width: ${props => props.circle ? 'unset' : '100px'};
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
`

export const ButtonLoading = styled.div`
    ${props => handleLoadingVariant(props)}
`;