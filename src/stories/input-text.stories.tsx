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
        alert={args.alert}
        action={args.action}
        name={args.name}
        direction={args.direction}
        disabled={args.disabled}
        helpText={args.helpText}
        highlight={args.highlight}
        icon={args.icon}
        label={args.label}
        size={args.size}
        placeholder={args.placeholder}
        value={args.value}
        type={args.type}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const InputWithAlert = Template.bind({});
export const InputWithAlertDisabled = Template.bind({});
export const InputWithHelpText = Template.bind({});

Default.args = {
    size: 'md',
    placeholder: 'Placeholder',
}

InputWithAlert.args = {
    alert: {
        message: 'Alert message',
        type: 'error',
    },
    size: 'md',
    placeholder: 'Placeholder',
}

InputWithAlertDisabled.args = {
    alert: {
        message: 'Alert message',
        type: 'error',
    },
    disabled: true,
    size: 'md',
    placeholder: 'Placeholder',
}

InputWithHelpText.args = {
    helpText: 'Help text',
    size: 'md',
    placeholder: 'Placeholder',
}