import styled from 'styled-components';

export const InputSelectStyled = styled.div<{ ref: any }>`
    position: relative;
`

export const InputSelectContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const InputSelectLabel = styled.div`
    font-weight: 600;
    font-size: 14px;
`;

export const InputSelectMenu = styled.div<{ gapTop: number }>`
    position: absolute;
    top: ${props => `${props.gapTop}px`};
    left: 0;
    background-color: #fff;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`