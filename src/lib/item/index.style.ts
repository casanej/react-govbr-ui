import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const ItemStyled = styled.div < { disabled?: boolean; isActive?: boolean }>`
    padding: ${props => props.theme.properties.scale.base} ${props => props.theme.properties.scale['2x']};
    cursor: pointer;

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
        `
        : css`
            &:hover {
                background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.xs)}
            }

            &:active {
                background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.md)}
            }
        `}
    
    `}
`