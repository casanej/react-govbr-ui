import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputText } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';
import { OnChangeValueParameter } from 'models';

interface LoadingExport extends ComponentMeta<typeof InputText> {}
interface LoadingStory extends ComponentStory<typeof InputText> {}

export default {
    title: 'Input/Text',
    component: InputText,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const handleChange = (value:OnChangeValueParameter, name:string) => {
        console.log('[HANDLE CHANGE]', value, name);
    }

    return <ThemeProvider theme={theme}>
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
            maskObj={args.maskObj}
            size={args.size}
            placeholder={args.placeholder}
            value={args.value}
            type={args.type}
            onChange={handleChange}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const InputWithAlert = Template.bind({});
export const InputWithAlertDisabled = Template.bind({});
export const InputWithHelpText = Template.bind({});
export const InputWithMask = Template.bind({});

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

InputWithMask.args = {
    size: 'md',
    placeholder: 'Placeholder',
    maskObj: {
        mask: [
            { mask: '(00) 0000-0000' },
            { mask: '(00) 00000-0000' },
        ],
    },
}