import styled, { css } from 'styled-components';

export const TableTdStyled = styled.td<{ colAlign?: boolean }>`
    padding: 16px 24px;

    ${props => props.colAlign && css`
        display: flex;
        gap: 5px;
        align-items: center;
    `}
`