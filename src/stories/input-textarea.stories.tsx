import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputTextArea } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof InputTextArea> {}
interface LoadingStory extends ComponentStory<typeof InputTextArea> {}

export default {
    title: 'Input/TextArea',
    component: InputTextArea,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <InputTextArea
        alert={args.alert}
        auxiliary={args.auxiliary}
        count={args.count}
        label={args.label}
        labelDirection={args.labelDirection}
        maxLength={args.maxLength}
        placeholder={args.placeholder}
        value={args.value}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const TextAreaWithLabel = Template.bind({});
export const TextAreaWithCount = Template.bind({});
export const TextAreaWithAlert = Template.bind({});
export const TextAreaWithAlertCount = Template.bind({});
export const TextAreaWithAuxiliary = Template.bind({});

Default.args = {
    placeholder: 'Insira um texto aqui'
}

TextAreaWithLabel.args = {
    label: 'Default Label',
    placeholder: 'Insira um texto aqui'
}

TextAreaWithCount.args = {
    count: true,
    maxLength: 100,
}

TextAreaWithAlert.args = {
    alert: {
        message: 'Error alert message',
        type: 'error',
    }
}

TextAreaWithAlertCount.args = {
    alert: {
        message: 'Warning alert message',
        type: 'warning',
    },
    count: true,
}

TextAreaWithAuxiliary.args = {
    auxiliary: 'Textarea with auxiliary',
}