import styled from 'styled-components';

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
    padding: 24px;
`;

export const ModalBody = styled.div``;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;