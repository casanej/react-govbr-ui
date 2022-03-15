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
} as InputSelectExport;

const Template: InputSelectStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <InputSelect
        icon={args.icon}
        items={args.items}
        label={args.label}
        multiple={args.multiple}
        placeholder={args.placeholder}
        inputVariant={args.inputVariant}
    />
</ThemeProvider>

export const Default = Template.bind({});
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