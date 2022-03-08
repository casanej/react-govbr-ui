import { Button } from 'lib';
import React, { ReactElement } from 'react'
import { ModalHeaderStyled, ModalTitle } from './index.style';

interface Props {
    title?: React.ReactNode;
    noCloseButton?: boolean;
    onClose?: () => void;
}

export const ModalHeader = (props: Props): ReactElement | null => {

    if (!props.title && props.noCloseButton) return null;

    return <ModalHeaderStyled>
        <ModalTitle>{props.title}</ModalTitle>

        {
            !props.noCloseButton && <Button variant='tertiary' circle size='sm' onClick={props.onClose}>X</Button>
        }
    </ModalHeaderStyled>;
};
