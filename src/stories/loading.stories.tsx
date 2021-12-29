import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loading } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface LoadingExport extends ComponentMeta<typeof Loading> {}
interface LoadingStory extends ComponentStory<typeof Loading> {}

export default {
    title: 'Layout/Loading',
    component: Loading,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Loading
        infinity={args.infinity}
        value={args.value}
        variant={args.variant}
    />
</ThemeProvider>

export const Primary = Template.bind({});

Primary.args = {
    infinity: 'none',
    variant: 'primary',
    value: 25,
}