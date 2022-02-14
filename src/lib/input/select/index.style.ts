import styled from 'styled-components';

export const InputSelectStyled = styled.div<{ ref: any }>`
    position: relative;
`

export const InputSelectContent = styled.div``

export const InputSelectMenu = styled.div<{ isOpen: boolean }>`
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`