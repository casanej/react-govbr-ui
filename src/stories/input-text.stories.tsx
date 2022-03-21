import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputText } from 'lib';
import { OnChangeValueParameter } from 'models';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

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
    const [inputValue, setInputValue] = useState('');

    console.log('[INPUT VALUE]', inputValue);

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <InputText
            alert={args.alert}
            action={args.action}
            name={args.name}
            direction={args.direction}
            disabled={args.disabled}
            helpText={args.helpText}
            icon={args.icon}
            label={args.label}
            maskObj={args.maskObj}
            size={args.size}
            placeholder={args.placeholder}
            value={inputValue}
            type={args.type}
            onChange={handleChange}
            variant={args.variant}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const Secondary = Template.bind({});
export const InputWithAlert = Template.bind({});
export const InputWithAlertDisabled = Template.bind({});
export const InputWithHelpText = Template.bind({});
export const InputWithMask = Template.bind({});

Default.args = {
    size: 'md',
    placeholder: 'Placeholder',
}

Secondary.args = {
    size: 'md',
    placeholder: 'Placeholder',
    variant: 'secondary',
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