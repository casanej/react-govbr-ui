import styled, { css } from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const TableTrStyled = styled.tr<{ active?: boolean; }>`
    height: ${props => props.theme.properties.scale.base};

    ${props => props.active
        ? css`
            color: #fff;
            background-color: #2670e8;

            &:hover {
                background-color: ${props => hexColorApplyAlpha('#2670e8', props.theme.properties.opacity.lg)};
            }
        `
        : css`
            &:hover {
                background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.xs)};
            }
        `}
`;