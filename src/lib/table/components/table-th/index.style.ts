import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const TableThStyled = styled.th<{ columWidth: string }>`
    padding: 16px 24px;
    cursor: pointer;
    text-align: left;
    color: #1351B4;
    width: ${props => props.columWidth};

    &:hover {
        background-color: ${props => hexColorApplyAlpha(props.theme.currentPallet.table.header.background.hover, 0.15)};
    }
`;

export const TableThTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const TableThIcons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
`;