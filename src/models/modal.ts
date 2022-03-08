import { ReactNode } from 'react';

interface ModalButtonCancelAction {
    cancelAction: () => void;
    cancelLabel?: string;
}

interface ModalButtonSuccessAction {
    successAction: () => void;
    successDisabled?: boolean;
    successLabel?: string;
}

export interface ModalBasic {
    isOpen: boolean;
    noCloseButton?: boolean;
}

export interface ModalDefault extends ModalBasic, ModalButtonSuccessAction, ModalButtonCancelAction {
    type: 'default';
    children: ReactNode;
    title?: ReactNode;
}

export interface ModalConfirmation extends ModalBasic, ModalButtonSuccessAction {
    type: 'confirmation';
    children: ReactNode;
    title?: ReactNode;
}

export interface ModalNegation extends ModalBasic, ModalButtonCancelAction {
    type: 'negation';
    children: ReactNode;
    title?: ReactNode;
}

export interface ModalLoading extends ModalBasic, ModalButtonCancelAction {
    type: 'loading';
}

export type ModalTypes = ModalDefault | ModalConfirmation | ModalNegation | ModalLoading;