import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface ButtonExport extends ComponentMeta<typeof Button> {}
interface ButtonStory extends ComponentStory<typeof Button> {}

export default {
    title: 'Input/Button',
    component: Button,
} as ButtonExport;

const Template: ButtonStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Button
        label={args.label}
        circle={args.circle}
        disabled={args.disabled}
        fullWidth={args.fullWidth}
        size={args.size}
        variant={args.variant}
    />
</ThemeProvider>

export const Primary = Template.bind({});

Primary.args = {
    label: 'Button',
    variant: 'primary',
};