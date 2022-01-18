import styled from 'styled-components';

export const TableTHeadStyled = styled.thead``;

export const TableHeadTr = styled.tr`
    background-color: ${props => props.theme.currentPallet.table.header.background.primary};
`;

export const TableTh = styled.th<{ width: string }>`
    padding: 16px 24px;
    cursor: pointer;
    text-align: left;

    &:hover {
        background-color: ${props => props.theme.currentPallet.table.header.background.hover};
    }
`;