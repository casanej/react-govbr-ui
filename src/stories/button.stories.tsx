import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface ButtonExport extends ComponentMeta<typeof Button> {}
interface ButtonStory extends ComponentStory<typeof Button> {}

export default {
    title: 'Layout/Button',
    component: Button,
} as ButtonExport;

const Template: ButtonStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Button
        circle={args.circle}
        disabled={args.disabled}
        fullWidth={args.fullWidth}
        isLoading={args.isLoading}
        size={args.size}
        variant={args.variant}
    >{args.children}</Button>
</ThemeProvider>

export const Primary = Template.bind({});

Primary.args = {
    children: 'Button',
    variant: 'primary',
    size: 'md'
}