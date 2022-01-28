import styled from 'styled-components';

export const MenuItemListStyled = styled.div<{ isOpen: boolean }>`
    display: ${props => props.isOpen ? 'block' : 'none'};
`