import styled from 'styled-components';

export const TableHeaderContentStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    div {
        display: flex;
        flex-direction: row;
        gap: 10px;

        &:nth-child(1) {
            width: 100%;
        }

        &:nth-child(2) {
            width: 5%;
        }
    }
`

export const TableTitle = styled.div`

`