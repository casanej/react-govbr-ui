import styled from 'styled-components';

export const AvatarStyled = styled.div<{ hasFunction: boolean; }>`
    cursor: ${props => props.hasFunction ? 'pointer' : 'default'};
`;

export const AvatarImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
`;