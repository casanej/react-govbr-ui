import styled, { css } from 'styled-components';

export type DividerDirection = 'horizontal' | 'vertical';

export const DividerStyled = styled.div<{ direction: DividerDirection }>`
    background-color: #cccccc;
    margin: 0 auto;

    ${props => props.direction === 'horizontal'
        ? css`
            width: 100%;
            height: 1px;
        `
        : css`
            width: 1px;
            max-height: 100vh;
        `}
`;