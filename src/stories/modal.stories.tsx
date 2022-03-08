import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Modal } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

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
        <Modal
            isOpen={isOpen}
            cancelLabel={args.cancelLabel}
            onClose={() => setIsOpen(false)}
            onSuccess={() => {
                args.onSuccess && args.onSuccess();
                setIsOpen(false);
            }}
            successLabel={args.successLabel}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});

Default.args = {
    isOpen: true,
    cancelLabel: 'Cancelar',
    onSuccess: () => alert('Salvo com sucesso'),
}