import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputText } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface LoadingExport extends ComponentMeta<typeof InputText> {}
interface LoadingStory extends ComponentStory<typeof InputText> {}

export default {
    title: 'Input/Text',
    component: InputText,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <InputText
        action={args.action}
        direction={args.direction}
        highlight={args.highlight}
        icon={args.icon}
        label={args.label}
        size={args.size}
        placeholder={args.placeholder}
        value={args.value}
    />
</ThemeProvider>

export const Default = Template.bind({});

Default.args = {
    size: 'md',
    placeholder: 'Placeholder',
}