import { alertColorTypes, AlertTypes } from 'models';
import styled, { css } from 'styled-components';
import { InputTextLabelDirection } from '../components/general.style';

interface InputStyledProps {
    alert?: AlertTypes;
    hasIcon?: boolean;
    highlight?: boolean;
}

export const InputTextAreaStyled = styled.div`
    width: 100%;
`;

export const InputTextAreaContent = styled.div<{ direction: InputTextLabelDirection }>`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.direction};
    gap: ${props => props.direction === 'row' ? '40px' : '0'};
`;

export const TextAreaStyled = styled.textarea<InputStyledProps>`
    width: 100%;
    border: 1px solid #888888;
    padding: 12px;
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

        &:focus-visible {
            outline-color: #c2850c;
            outline-style: dashed;
            outline-width: 4px;
            outline-offset: -4px;
        }

        &:active {
            background-color: rgba(51, 51, 51, .45)!important;
            border: 3px solid #c2850c;
        }
    }
`;

export const InputTextAuxiliary = styled.div`
    font-size: 14px;
`;