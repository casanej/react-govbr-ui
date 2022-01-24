import styled from 'styled-components';

export const InputSelectStyled = styled.div`
    position: relative;
`

export const InputSelectContent = styled.div``

export const InputSelectMenu = styled.div<{ isOpen: boolean }>`
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
`