import styled from 'styled-components';

export const MenuEvidentStyled = styled.div``;

export const MenuEvidentHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    color: #0c326f;
    cursor: pointer;
    background-color: #ffffff;
    padding-left: 20px;

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    &:hover {
        background-color: rgba(12, 50, 111, .16);
    }

    &:active {
        background-color: rgba(12, 50, 111, .45);
    }

    &:focus-visible {
        outline-color: #c2850c;
        outline-style: dashed;
        outline-width: -4px;
        outline-offset: -4px;
    }
`;

export const MenuEvidentLabel = styled.div`
    font-weight: bold;
`