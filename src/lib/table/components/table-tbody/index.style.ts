import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const TableBodyTr = styled.tr`
    height: ${props => props.theme.properties.scale.base};

    &:hover {
        background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.xs)};
    }
`;

export const TableBody = styled.tbody`
    ${TableBodyTr} {
        &:not(:last-child) {
            border-bottom: 1px solid ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.sm)};
        }
    }
`;

export const TableTdActions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;