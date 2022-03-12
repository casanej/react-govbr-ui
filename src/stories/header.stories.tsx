import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Header } from 'lib';
import { MenuFunctionalities, MenuItemsProps } from 'models';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof Header> {}
interface LoadingStory extends ComponentStory<typeof Header> {}

export default {
    title: 'Navegação/Header',
    component: Header,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <BrowserRouter>
        <div style={{padding: 20}}>
            <Header
                compact={args.compact}
                functionalities={args.functionalities}
                links={args.links}
                logged={args.logged}
                logo={args.logo}
                menuItems={args.menuItems}
                title={args.title}
                subTitle={args.subTitle}
            />
        </div>
    </BrowserRouter>
</ThemeProvider>

const logoEl = <>
    <svg width='110' height='35' viewBox='0 0 48 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect width='48' height='17.2632' fill='url(#pattern0)'/>
        <defs>
            <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                <use xlinkHref='#image0_1879_16800' transform='translate(0 -0.00396339) scale(0.00416667 0.0115854)'/>
            </pattern>
            <image id='image0_1879_16800' width='240' height='87' xlinkHref='data:image/png;base64,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'/>
        </defs>
    </svg>

</>

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

const functionalities: MenuFunctionalities[] = [
    { icon: 'info', label: 'Ajuda', url: '' },
    { icon: 'user', label: 'Perfil', url: '' },
    { icon: 'cog', label: 'Configurações', url: '' },
    { icon: 'comment', label: 'Chat', url: '' },
]

const menuObj = {
    menuItems: {
        header: {
            logo: <img src='http://xptoevents.com/img/logo-blue.png' alt='Logo' width={100} />,
            title: 'Xpto Events',
        },
        items
    },
    links: [
        { label: 'Link de acesso 1', url: '' },
        { label: 'Link de acesso 2', url: '' },
        { label: 'Link de acesso 3', url: '' },
        { label: 'Link de acesso 4', url: '' },
    ],
    functionalities,
    title: 'Header no Storybook',
    subTitle: 'Sub header no Storybook'
}

export const HeaderDefault = Template.bind({});
export const HeaderCompact = Template.bind({});
export const HeaderLoggedIn = Template.bind({});
export const HeaderWithLogo = Template.bind({});

HeaderDefault.args = {
    ...menuObj,
}

HeaderCompact.args = {
    ...menuObj,
    compact: true,
}

HeaderLoggedIn.args = {
    ...menuObj,
    logged: {
        name: 'Rafael',
        menuContent: <div>MENU DE LOGADO</div>
    }
}

HeaderWithLogo.args = {
    ...menuObj,
    logo: {
        image: logoEl,
        url: 'http://localhost:6006/',
        signature: 'Storybook Test'
    }
}