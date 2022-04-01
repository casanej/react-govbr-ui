import { alertColorTypes, AlertTypes } from 'models';
import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

interface CheckboxInputProps {
    ref?: any;
    alert?: AlertTypes;
}

export const InputRadioStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const RadioRotulo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #333;
    margin-bottom: 5px;

    > div {}

    p {
        font-size: ${props => props.theme.properties.fontSizeScale['down-01']};
    }
`

export const RadioContent = styled.div<{ disabled?: boolean }>`
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;

    ${props => props.disabled && css`
        opacity: 0.45;
        cursor: not-allowed;
    `}
`;

export const RadioInput = styled.input<CheckboxInputProps>`
    appearance: none;
    width: 24px;
    height: 24px;
    background-color: #fff;

    display: grid;
    border-radius: 50%;
    place-content: center;
    border: 1px solid #ccc;
    ${props => props.alert === 'error' || props.alert === 'success'
        ? css`
            border-color: ${alertColorTypes[props.alert].background};
        `
        : css`
            border-color: #cccccc;
        `}

    &:not(:disabled) &:hover {
        background-color: ${props => hexColorApplyAlpha('#1351b4', props.theme.properties.opacity.sm)};
    }


    &:disabled {
        cursor: not-allowed;
    }

    &::before {
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 50%;
        transition: 120ms transform ease-in-out;
        background-color: transparent;
    }

    &:checked::before {
        background-color: #1351b4;
    }
`;

export const RadioLabel = styled.label``;