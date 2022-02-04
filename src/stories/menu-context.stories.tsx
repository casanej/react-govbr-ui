import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuContext } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface LoadingExport extends ComponentMeta<typeof MenuContext> {}
interface LoadingStory extends ComponentStory<typeof MenuContext> {}

export default {
    title: 'Navegação/Menu Context',
    component: MenuContext,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(args.open || false);
    }, [args.open]);

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <div style={{padding: 20}}>
            <MenuContext
                open={open}
                items={args.items}
                title={args.title}
                onClose={() => setOpen(false)}
            />
        </div>
    </ThemeProvider>
}

export const Default = Template.bind({});

Default.args = {
    open: false,
    title: 'Acesso Rápido',
    items: [
        { label: 'Home', icon: 'home', url: '' },
        { label: 'Sobre', icon: 'info-circle', url: '' },
        { label: 'Contato', icon: 'envelope', url: '' },
    ]
}