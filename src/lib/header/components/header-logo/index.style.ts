import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const HeaderLogoStyled = styled(Link) <{ compact: boolean; }>`
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 10px;

    color: #555;
    font-weight: 500;
    max-width: 250px;
    width: 100%;
    max-height: 50px;
    padding: 10px;

    ${({ compact }) => {
        if (compact) {
            return css`
                top: -20px;
                left: -30px;
            `;
        } else {
            return css`
                top: 0;
                left: 0;
            `;
        }
    }}

    svg, img {
        ${props => props.compact
        ? css`
            width: 100%;
            max-width: 75px;
            height: 15px;
        `
        : css`
            width: 100%;
            max-width: 115px;
            height: 35px;
        `}
    }

    @media (max-width: 672px) {
        top: 0;
        left: 0;

        svg, img {
            width: 100%;
            max-width: 100px;
            height: 35px;
        }
    }
`;

export const HeaderLogoImg = styled.div`
    width: 100%;
`;

export const HeaderLogoSignature = styled.div`
    width: 100%;
    line-height: 30px;
`;