import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Pagination } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof Pagination> {}
interface LoadingStory extends ComponentStory<typeof Pagination> {}

export default {
    title: 'Exibição de Dados/Paginação',
    component: Pagination,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Pagination
        initialPage={args.initialPage}
        totalItems={args.totalItems}
        variant={args.variant}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const PaginationVariant = Template.bind({});

Default.args = {
    initialPage: 1,
    totalItems: 10,
}

PaginationVariant.args = {
    initialPage: 1,
    totalItems: 30,
    variant: 2,
}