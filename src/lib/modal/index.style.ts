import styled from 'styled-components';

export const ModalStyled = styled.div <{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const ModalBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 30vw;
    max-width: 70vw;
    min-height: 30vh;
    max-height: 70vh;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 10px;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.div``;

export const ModalBody = styled.div``;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;