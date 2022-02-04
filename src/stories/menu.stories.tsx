import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';
import { BrowserRouter } from 'react-router-dom';
import { MenuFooterProps, MenuItemsProps } from 'models';

interface InputSelectExport extends ComponentMeta<typeof Menu> {}
interface InputSelectStory extends ComponentStory<typeof Menu> {}

export default {
    title: 'Navegação/Menu',
    component: Menu,
} as InputSelectExport;

const Template: InputSelectStory = (args) => {
    const [open, setOpen] = useState(args.open || false);

    useEffect(() => {
        setOpen(args.open || false);
    }, [args.open]);

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <BrowserRouter>
            <Menu
                items={args.items}
                footer={args.footer}
                open={open}
                onClose={() => setOpen(false)}
            />
        </BrowserRouter>
    </ThemeProvider>
}

const items: MenuItemsProps[] = [
    {
        label: 'Redes Sociais',
        groupType: 'expand',
        subItems: [
            { label: 'Facebook', groupType: 'item', url: '' },
            { label: 'Instagram', groupType: 'item', url: '' },
            { label: 'Twitter', groupType: 'item', url: '' }
        ],
    },
    {
        label: 'Investimento',
        groupType: 'expand',
        subItems: [
            { label: 'Renda Fixa', groupType: 'expand', subItems: [
                { label: 'Tesouro Direto', groupType: 'item', url: '' },
                { label: 'CDB', groupType: 'item', url: '' },
                { label: 'LCI', groupType: 'item', url: '' },
            ]},
            { label: 'Renda Variável', groupType: 'expand', subItems: [
                { label: 'Fundos de Investimento', groupType: 'item', url: '' },
                { label: 'FII', groupType: 'expand', subItems: [
                    { label: 'O que é ?', groupType: 'item', url: '' },
                    { label: 'Como aplicar ?', groupType: 'item', url: '' },
                ]},
            ]},
        ],
    },
    {
        label: 'Criptomoedas',
        groupType: 'expand',
        subItems: [
            { label: 'Jogos', groupType: 'expand', subItems: [
                { label: 'Axie Infinity', groupType: 'item', url: '' },
                { label: 'Bomb Crypto', groupType: 'item', url: '' },
            ] },
            { label: 'BTC', groupType: 'item', url: '' },
        ],
    },
    { label: 'Sobre', groupType: 'item', url: '' }
]

const footer: MenuFooterProps = {
    external: [
        { label: 'Políticas de Uso', url: '' },
        { label: 'Termos de Uso', url: '' },
        { label: 'Política de Privacidade', url: '' },
    ],
    info: [
        <div key={'info-1'}>Todo conteúdo deste site <strong>NÃO</strong> tem nenhum tipo de validade</div>,
        '© 2020 - Todos os direitos reservados'
    ],
    logos: [
        <img key={'logos-1'} src='http://xptoevents.com/img/logo-blue.png' />,
        <img key={'logos-2'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Mx5GZJOj9pB1lFAFBFPSseT8Aoos6M_3kQ&usqp=CAU' />
    ],
    social: {
        title: 'Siga-nos',
        links: [
            { icon: 'cog', url: '' },
            { icon: 'cog', url: '' },
            { icon: 'cog', url: '' },
        ]
    }
}

export const Default = Template.bind({});
export const MenuComplete = Template.bind({});
export const MenuWithFooter = Template.bind({});

Default.args = {
    open: false,
    items
}

MenuComplete.args = {
    open: true,
    items,
    footer
}

MenuWithFooter.args = {
    open: true,
    items,
    footer
}

