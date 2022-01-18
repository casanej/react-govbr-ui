import styled from 'styled-components';

export type DividerDirection = 'horizontal' | 'vertical';

export const DividerStyled = styled.div<{ direction: DividerDirection }>`
    width: ${props => props.direction === 'horizontal' ? '100%' : '1px'};
    height: ${props => props.direction === 'vertical' ? '100%' : '1px'};
    margin: ${props => props.direction === 'horizontal' ? '0 auto' : '0 auto'};
    margin-top: ${props => props.direction === 'vertical' ? '0 auto' : '0 auto'};
    background-color: #cccccc;
`;