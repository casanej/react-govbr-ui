import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputText } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof InputText> {}
interface LoadingStory extends ComponentStory<typeof InputText> {}

export default {
    title: 'Input/Text',
    component: InputText,
    argTypes: {
        onChange: { action: 'onChange(value, name)' },
    }
} as LoadingExport;

const Template: LoadingStory = (args) => {
    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <InputText
            alert={args.alert}
            action={args.action}
            direction={args.direction}
            disabled={args.disabled}
            helpText={args.helpText}
            icon={args.icon}
            initialValue={args.initialValue}
            label={args.label}
            list={args.list}
            maskObj={args.maskObj}
            name={args.name}
            onChange={args.onChange}
            placeholder={args.placeholder}
            size={args.size}
            type={args.type}
            variant={args.variant}
            value={args.value}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const Secondary = Template.bind({});
export const InputListArrayString = Template.bind({});
export const InputListArrayObj = Template.bind({});
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

InputListArrayString.args = {
    size: 'md',
    placeholder: 'Placeholder',
    list: ['Rafael', 'Casanje', 'Bertolino'],
    helpText: 'Start typing to filter the list',
}

InputListArrayObj.args = {
    size: 'md',
    placeholder: 'Placeholder',
    list: [
        { label: 'Rafael Casanje', year: '1998' },
        { label: 'Casanje', year: '2001' },
        { label: 'Costa', year: '1971' },
    ]
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