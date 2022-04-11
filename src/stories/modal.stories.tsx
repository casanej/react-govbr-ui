import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Button, Modal } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof Modal> {}
interface LoadingStory extends ComponentStory<typeof Modal> {}

export default {
    title: 'Utilidades/Modal',
    component: Modal,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen || false);

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        {
            args.type === 'loading' && <Modal
                centered={args.centered}
                type={'loading'}
                isOpen={isOpen}
                cancelLabel={args.cancelLabel}
                cancelAction={() => setIsOpen(false)}
            />
        }
        {
            args.type === 'confirmation' && <Modal
                centered={args.centered}
                type={args.type}
                title={args.title}
                isOpen={isOpen}
                successLabel={args.successLabel}
                successAction={() => setIsOpen(false)}
                successDisabled={args.successDisabled}
                noCloseButton={args.noCloseButton}
            >
                {args.children}
            </Modal>
        }
        {
            args.type === 'negation' && <Modal
                centered={args.centered}
                type={args.type}
                title={args.title}
                isOpen={isOpen}
                cancelLabel={args.cancelLabel}
                cancelAction={() => setIsOpen(false)}
                noCloseButton={args.noCloseButton}
            >
                {args.children}
            </Modal>
        }

        {
            args.type === 'default' && <Modal
                centered={args.centered}
                type={args.type}
                isOpen={isOpen}
                title={args.title}
                noCloseButton={args.noCloseButton}
                cancelLabel={args.cancelLabel}
                cancelAction={() => setIsOpen(false)}
                successAction={() => {
                    args.successAction && args.successAction();
                    setIsOpen(false);
                }}
                successDisabled={args.successDisabled}
                successLabel={args.successLabel}
            >
                {args.children}
            </Modal>
        }
    </ThemeProvider>
}

export const Default = Template.bind({});
export const ModalConfirmation = Template.bind({});
export const ModalLoading = Template.bind({});
export const ModalNegation = Template.bind({});
export const ModalNoCloseButton = Template.bind({});

Default.args = {
    type: 'default',
    title: 'Default Modal',
    isOpen: true,
    cancelLabel: 'Cancelar',
    successAction: () => alert('Salvo com sucesso'),
    successLabel: 'Confirmar',
    successDisabled: false,
    children: <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
        <div>Lorem Ipsum Dolor Asimet</div>
    </div>
}

ModalConfirmation.args = {
    type: 'confirmation',
    isOpen: true,
    successAction: () => alert('Visto com sucesso'),
    successLabel: 'Visto',
    successDisabled: false,
    children: <div>[CONFIRMAR] Lorem Ipsum Dolor Asimet</div>
}

ModalNegation.args = {
    type: 'negation',
    isOpen: true,
    cancelAction: () => alert('Negado com sucesso'),
    cancelLabel: 'Negar',
    children: <div>[NEGAR] Lorem Ipsum Dolor Asimet</div>
}

ModalNoCloseButton.args = {
    noCloseButton: true,
    type: 'default',
    isOpen: true,
    cancelLabel: 'Cancelar',
    successAction: () => alert('Salvo com sucesso'),
    successLabel: 'Confirmar',
    successDisabled: false,
    children: <div>Lorem Ipsum Dolor Asimet</div>
}

ModalLoading.args = {
    type: 'loading',
    isOpen: true,
    cancelLabel: 'Cancelar',
}