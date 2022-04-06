import { useWindowSize } from 'hooks';
import { Button, Loading } from 'lib';
import { ModalScrollPosition, ModalTypes } from 'models';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { ModalHeader } from './components';
import { ModalBody, ModalBox, ModalFooter, ModalStyled } from './index.style';

type Props = ModalTypes;

export const Modal = (props: Props): ReactElement => {
    const modalBodyRef = useRef<HTMLDivElement>();
    const [modalScrollPosition, setModalScrollPosition] = useState<ModalScrollPosition>('none');

    const { height } = useWindowSize();

    useEffect(() => {
        if (modalBodyRef.current) {
            modalBodyRef.current.addEventListener('scroll', handleScroll);
            handleScroll({ target: modalBodyRef.current });
        }

        return () => {
            if (modalBodyRef.current) {
                modalBodyRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [modalBodyRef.current])

    useEffect(() => {
        if (modalBodyRef.current) {
            handleScroll({ target: modalBodyRef.current });
        }
    }, [height])

    const handleScroll = useCallback((element: any) => {
        const { scrollTop, scrollHeight, offsetHeight } = element.target;

        if (scrollHeight === offsetHeight) {
            setModalScrollPosition('none');
        } else if (scrollTop === 0) {
            setModalScrollPosition('start');
        } else if (scrollHeight - scrollTop === offsetHeight) {
            setModalScrollPosition('end');
        } else {
            setModalScrollPosition('middle');
        }
    }, []);

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
            <ModalBody ref={modalBodyRef} scrollPosition={modalScrollPosition}>{props.children}</ModalBody>
            <ModalFooter>
                <Button variant='secondary' onClick={props.cancelAction}>{props.cancelLabel || 'Cancelar'}</Button>
                <Button variant='primary' onClick={props.successAction} disabled={props.successDisabled}>{props.successLabel || 'Confirmar'}</Button>
            </ModalFooter>
        </ModalBox>
    </ModalStyled>;
};
