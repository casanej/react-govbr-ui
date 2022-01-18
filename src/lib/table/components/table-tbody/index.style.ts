import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const TableBody = styled.tbody``;

export const TableBodyTr = styled.tr`
    height: ${props => props.theme.properties.scale.base};

    &:hover {
        background-color: ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.sm)};
    }
`;

export const TableTd = styled.td`
    padding: 16px 24px;
`;