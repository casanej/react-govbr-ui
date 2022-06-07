import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const ItemStyled = styled.div < { disabled?: boolean; isActive?: boolean; hidden?: boolean }>`
    padding: 16px;
    cursor: pointer;

    ${props => props.hidden && 'display: none;'}

    ${props => props.disabled
        ? css`
            cursor: not-allowed;
            opacity: ${props.theme.properties.opacity.md};
        `
        : css`
        ${props.isActive
        ? css`
            background-color: #2670e8;
            color: #fff;

            &:hover {
                background-color: ${props => hexColorApplyAlpha('#2670e8', props.theme.properties.opacity.lg)}
            }

            &:active {
                background-color: ${props => hexColorApplyAlpha('#2670e8', props.theme.properties.opacity.sm)}
            }

            &:focus-visible {
                outline-color: #c2850c;
                outline-style: dashed;
                outline-width: 4px;
                outline-offset: -4px;
            }
        `
        : css`
            &:hover {
                background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.xs)}
            }

            &:active {
                background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.md)}
            }

            &:focus-visible {
                outline-color: #c2850c;
                outline-style: dashed;
                outline-width: 4px;
                outline-offset: -4px;
            }
        `}
    
    `}
`