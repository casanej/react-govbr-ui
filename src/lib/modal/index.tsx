import React, { ReactElement } from 'react'
import { Button } from 'lib';
import { ModalBody, ModalBox, ModalFooter, ModalHeader, ModalStyled, ModalTitle } from './index.style';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cancelLabel?: string;
    onSuccess?: () => void;
    successLabel?: string;
}

export const Modal = (props: Props): ReactElement => {

    return <ModalStyled isOpen={props.isOpen}>
        <ModalBox>
            <ModalHeader>
                <ModalTitle></ModalTitle>
                <Button variant='tertiary' circle size='sm' onClick={props.onClose}>X</Button>
            </ModalHeader>
            <ModalBody>CONTEÚDO DO MODAL</ModalBody>
            <ModalFooter>
                <Button variant='tertiary' onClick={props.onClose}>{props.cancelLabel || 'Cancelar'}</Button>
                <Button variant='primary' onClick={props.onSuccess}>{props.successLabel || 'Salvar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;
};
