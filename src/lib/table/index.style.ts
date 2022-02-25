import styled from 'styled-components';

export const TableStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 378px;
    font-size: 14px;
`;

export const TableHeader = styled.div``;

export const TableBody = styled.div`
    overflow-x: auto;
`;

export const TableCustom = styled.table`
    width: 100%;
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

export const TableTitle = styled.div``;