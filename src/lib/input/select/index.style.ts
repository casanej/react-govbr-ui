import styled from 'styled-components';

export const InputSelectStyled = styled.div<{ ref: any; fullWidth?: boolean; }>`
    position: relative;

    ${props => props.fullWidth && 'width: 100%'}
`

export const InputSelectContent = styled.div<{ ref: any }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
`