import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';
import { TableTrStyled } from '../table-tr/index.style';

export const TableBody = styled.tbody`
    ${TableTrStyled} {
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