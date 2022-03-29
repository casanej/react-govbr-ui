import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputSelect } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface InputSelectExport extends ComponentMeta<typeof InputSelect> {}
interface InputSelectStory extends ComponentStory<typeof InputSelect> {}

export default {
    title: 'Input/Select',
    component: InputSelect,
    argTypes: {
        onChange: { action: 'onChange(item)' },
    }
} as InputSelectExport;

const Template: InputSelectStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <InputSelect
        alert={args.alert}
        disabled={args.disabled}
        icon={args.icon}
        items={args.items}
        helpText={args.helpText}
        label={args.label}
        multiple={args.multiple}
        onChange={args.onChange}
        placeholder={args.placeholder}
        inputVariant={args.inputVariant}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const SelectComplete = Template.bind({});
export const SelectDisabled = Template.bind({});
export const SelectVariantTertiary = Template.bind({});
export const SelectWithLabel = Template.bind({});
export const SelectWithPlaceholder = Template.bind({});

const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
    { label: 'Item 4', value: 'item4' },
    { label: 'Item 5', value: 'item5' },
]

Default.args = {
    items
}

SelectComplete.args = {
    items,
    alert: {
        message: 'This is an alert message',
        type: 'error'
    },
    label: 'Select',
    helpText: 'Texto de ajuda',
    placeholder: 'Selecione',
}

SelectDisabled.args = {
    items,
    alert: {
        message: 'This is an alert message',
        type: 'error'
    },
    disabled: true,
    label: 'Select',
    helpText: 'Texto de ajuda',
    placeholder: 'Selecione',
}

SelectVariantTertiary.args = {
    items,
    inputVariant: 'secondary'
}

SelectWithLabel.args = {
    items,
    label: 'Select with label'
}

SelectWithPlaceholder.args = {
    items,
    placeholder: 'Selecione'
}