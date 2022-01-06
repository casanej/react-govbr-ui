import { alertColorTypes, AlertTypes } from 'models';
import styled, { css } from 'styled-components';

export const inputSize = {
    sm: '32px',
    md: '40px',
    lg: '48px'
}

interface InputStyledProps {
    alert?: AlertTypes
    density: keyof typeof inputSize;
    hasIcon?: boolean;
    highlight?: boolean;
}

export const InputTextStyled = styled.div<{ direction: 'row' | 'column' }>`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: center;
    align-items: ${props => props.direction === 'row' ? 'center' : 'flex-start'};
    gap: 5px;
`;

export const InputContent = styled.div`
    position: relative;
`

export const InputIcon = styled.div`
    position: absolute;
    bottom: 12px;
    left: 12px;
`

export const InputLabel = styled.label`
    margin-bottom: ${props => props.theme.properties.scale.half};
    line-height: ${props => props.theme.properties.lineHeight.medium};
    font-size: ${props => props.theme.properties.scale.base};
    font-weight: 600;
`

export const InputAction = styled.div`
    position: absolute;
    bottom: 3.5px;
    right: 3.5px;
`

export const InputStyled = styled.input<InputStyledProps>`
    height: ${props => inputSize[props.density]};
    width: 100%;
    padding: 0 ${props => props.hasIcon ? props.theme.properties.scale['4x'] : props.theme.properties.scale['2x']};
    border: 3px solid rgba(0, 0, 0, 0);
    border-radius: ${props => props.theme.properties.surface.rounder.sm};

    ${props => props.highlight
        ? css`
            background-color: ${props => props.theme.colors.appScheme.colors.secondary.secondary02};
            border: none;

            &:not(:disabled) {
                &:hover {
                    background-color: rgba(51, 51, 51, .16);
                }
            }
        `
        : css`
            border: 1px solid ${props => props.theme.colors.appScheme.colors.secondary.secondary06};

            &:not(:disabled) {
                &:hover {
                    background-color: rgba(51, 51, 51, .16);
                }
            }
            
    `}

    &:disabled {
        cursor: not-allowed;
    }

    &:not(:disabled) {
        ${props => props.alert && css`
            border: 3px solid ${alertColorTypes[props.alert].background};
        `}

        &:focus, &:focus-visible {
            outline: #c2850c;
            border: 3px solid #c2850c;
        }

        &:active {
            background-color: rgba(51, 51, 51, .45)!important;
            border: 3px solid #c2850c;
        }
    }

`;