import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const TableTHeadStyled = styled.thead``;

export const TableHeadTr = styled.tr`
    background-color: ${props => props.theme.currentPallet.table.header.background.primary};
`;

export const TableTh = styled.th<{ columWidth: string }>`
    padding: 16px 24px;
    cursor: pointer;
    text-align: left;
    color: #1351B4;
    width: ${props => props.columWidth};

    &:hover {
        background-color: ${props => hexColorApplyAlpha(props.theme.currentPallet.table.header.background.hover, 0.15)};
    }
`;