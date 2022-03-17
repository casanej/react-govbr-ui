import styled from 'styled-components';

export const PaginationLeftSide = styled.div``;

export const PaginationRightSide = styled.div``;

export const PaginationContentInput = styled.div`
    width: 70px;
`;

export const PaginationActionsButtons = styled.div``

export const PaginationStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    padding: ${props => `${props.theme.properties.scale['2x']}`};

    ${PaginationLeftSide}, ${PaginationRightSide}, ${PaginationActionsButtons} {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
`;