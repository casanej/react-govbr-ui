import styled from 'styled-components';

export const TableBody = styled.div`
    overflow-x: auto;
`;

export const TableCustom = styled.table<{ tableWidth?: number;}>`
    width: ${props => props.tableWidth ? props.tableWidth : '100%'};
    border-collapse: collapse;
    border-spacing: 0;
    min-width: 1000px;
`;

export const TableLoading = styled.tbody`
    > tr td {
        padding: 10px;

        > div {
            margin: 0 auto;
        }
    }
`;

export const TableFooter = styled.div``;