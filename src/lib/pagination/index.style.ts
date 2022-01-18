import styled from 'styled-components';

export const PaginationLeftSide = styled.div``;

export const PaginationRightSide = styled.div``;

export const PaginationStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    padding: ${props => `${props.theme.properties.scale['2x']}`};

    ${PaginationLeftSide}, ${PaginationRightSide} {
        display: flex;
        flex-direction: row;
        gap: 10PX;
    }
`;