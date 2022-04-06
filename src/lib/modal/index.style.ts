import { ModalScrollPosition } from 'models';
import styled, { css } from 'styled-components';

const handleScrollPosition = (position?: ModalScrollPosition) => {

    if (position === 'start') return css`box-shadow: inset 0 -10px 10px -10px grey;`;
    if (position === 'middle') return css`box-shadow: inset -5px 0px 10px 0px grey;`;
    if (position === 'end') return css`box-shadow: inset 0 10px 10px -10px grey;`;

    return css``;
}

export const ModalStyled = styled.div <{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999999999;
    display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const ModalBox = styled.div<{ loading?: boolean; centered?: boolean}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.loading ? 'space-around' : 'space-between'};
    ${props => props.centered && 'align-items: center;'}
    gap: 10px;
    min-width: ${props => props.loading || props.centered ? '10vw' : '30vw'};
    max-width: 50vw;
    min-height: ${props => props.loading ? '30vh' : '20vh'};
    max-height: 70vh;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    

`;

export const ModalBody = styled.div<{ ref?: any; scrollPosition?: ModalScrollPosition }>`
    overflow-y: auto;
    padding: 10px 15px;

    scrollbar-color: #9E9D9D #EDEDED;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #EDEDED; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #9E9D9D; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #888; 
    }

    ${props => handleScrollPosition(props.scrollPosition)}
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 10px;
`;