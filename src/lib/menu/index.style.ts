import styled from 'styled-components';

export const MenuStyled = styled.div<{ isOpen: boolean;}>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 10;
    display: ${props => props.isOpen ? 'block' : 'none'};
`

export const MenuContent = styled.div`
    z-index: 3000;
    background-color: #fff;
    height: 100vh;
    width: 100%;
    max-width: 25%;
    padding: 0 20px;

    @media (max-width: 900px) {
        max-width: 50%;
    }

    @media (max-width: 600px) {
        max-width: 100%;
    }
`;

export const MenuHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    div:first-child {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`

export const MenuItems = styled.div``

export const MenuFooter = styled.div``;

export const MenuFooterLogos = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 16px 40px;

    img {
        max-width: 100%;
    }
`;

export const MenuFooterLinks = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 40px;
`;

export const MenuFooterSocial = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 40px;

    div {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;

export const MenuFooterInfo = styled.div`
    padding: 16px 40px;
    font-size: 11.6px;
    text-align: center;
`;