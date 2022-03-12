import { alertColorTypes, AlertTypes } from 'models';
import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export enum CheckTypes {
    noChecked = 0,
    checked = 1,
    indeterminate = 2
}

interface CheckboxInputProps {
    alert?: AlertTypes;
    checked?: CheckTypes;
}

export const CheckboxStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const CheckboxRotulo = styled.div`
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

export const CheckboxContent = styled.div`
    position: relative;
    font-weight: 500;
`;

export const CheckboxInput = styled.input<{ ref: any }>`
    opacity: 0;
    position: absolute;
`;

export const CheckboxLabel = styled.label`
    position: absolute;
    top: 5px;
    left: 30px;
`

export const CheckboxInputCustom = styled.label<CheckboxInputProps>`
    position: relative;
    align-items: flex-start;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    padding-left: 30px;
    line-height: 1.8em;
    min-height: ${props => props.theme.properties.scale['3x']};

    &:before {
        background: #ffffff;
        border-radius: 4px;
        ${props => props.alert === 'error' || props.alert === 'success'
        ? css`
            border: 2px solid ${alertColorTypes[props.alert].background};
        `
        : css`
            border: 1px solid #cccccc;
        `}
        content: "";
        height: 24px;
        left: 0;
        position: absolute;
        width: 24px;
    }

    &:after {
        content: "";
        position: absolute;
    }

    ${props => props.checked === 1 && css`
        &:after {
            left: 9px;
            top: 5px;
            width: 7px;
            height: 12px;
            border: solid #1351b4;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
        }
    `}

    ${props => props.checked === 2 && css`
        &:after {
            left: 5px;
            top: 10px;
            width: 13px;
            height: 3px;
            border: solid #1351b4;
            border-width: 0 0px 3px 0;
        }
    `}

    &:hover {
        &:before {
            background-color: ${props => hexColorApplyAlpha('#1351b4', props.theme.properties.opacity.sm)};
        }
    }
`;