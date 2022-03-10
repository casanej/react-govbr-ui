import styled, { css } from 'styled-components';

export const HeaderStyled = styled.header`
    padding: 15px;
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.14), 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 12px 12px 0 rgba(0, 0, 0, 0.10);
    z-index: 999;
`;

export const HeaderContent = styled.nav<{ compact: boolean }>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    
    width: 100%;
    max-width: 1480px;
    margin: 0 auto;

    ${props => props.compact
        ? css`
            flex-direction: row;
        `
        : css`
            flex-direction: column-reverse;
        `}

    ${props => !props.compact && css`
        width: 100%;
    `}

    @media (max-width: 672px) {
        flex-direction: column-reverse;
    }
`;

export const HeaderTitleMenu = styled.div<{ compact: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    ${props => !props.compact && css`
        width: 100%;
    `}

    > div {
        display: flex;
        gap: 10px;
    }

    @media (max-width: 672px) {
        width: 100%;
    }
`;

export const HeaderActionButtons = styled.div<{ compact: boolean }>`
    display: flex;
    gap: 10px;

    ${props => !props.compact && css`
        width: 100%;
        justify-content: flex-end;
    `}

    > div {
        display: flex;
        gap: 10px;
    }

    @media (max-width: 672px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

export const HeaderSearching = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

export const HeaderTitleContent = styled.div``;

export const HeaderTitle = styled.div`
    font-size: 24px;
`;

export const HeaderSubTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
`;