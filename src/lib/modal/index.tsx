import { Button, Loading } from 'lib';
import { ModalTypes } from 'models';
import React, { ReactElement } from 'react';
import { ModalHeader } from './components';
import { ModalBody, ModalBox, ModalFooter, ModalStyled } from './index.style';

type Props = ModalTypes;

export const Modal = (props: Props): ReactElement => {

    if (props.type === 'loading') return <ModalStyled isOpen={props.isOpen}>
        <ModalBox loading centered>
            <ModalBody>
                <Loading infinity='md' />
            </ModalBody>
            <ModalFooter>
                <Button variant='secondary' onClick={props.cancelAction}>{props.cancelLabel || 'Cancelar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;

    if (props.type === 'confirmation') return <ModalStyled isOpen={props.isOpen}>
        <ModalBox centered>
            <ModalHeader title={props.title} noCloseButton />
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={props.successAction} disabled={props.successDisabled} >{props.successLabel || 'Confirmar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;

    if (props.type === 'negation') return <ModalStyled isOpen={props.isOpen}>
        <ModalBox centered>
            <ModalHeader title={props.title} noCloseButton />
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
                <Button variant='secondary' onClick={props.cancelAction} >{props.cancelLabel || 'Cancelar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;

    return <ModalStyled isOpen={props.isOpen}>
        <ModalBox>
            <ModalHeader title={props.title} noCloseButton={props.noCloseButton} onClose={props.cancelAction} />
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
                <Button variant='secondary' onClick={props.cancelAction}>{props.cancelLabel || 'Cancelar'}</Button>
                <Button variant='primary' onClick={props.successAction} disabled={props.successDisabled}>{props.successLabel || 'Confirmar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;
};
