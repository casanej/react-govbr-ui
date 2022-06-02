import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputSelect } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mockCityList } from 'utils';

interface InputSelectExport extends ComponentMeta<typeof InputSelect> {}
interface InputSelectStory extends ComponentStory<typeof InputSelect> {}

export default {
    title: 'Input/Select',
    component: InputSelect,
    argTypes: {
        onChange: { action: 'onChange(item, name)' },
        onBlur: { action: 'onBlur()' },
        onSearchChange: { action: 'onSearchChange(value)' },
    }
} as InputSelectExport;

const Template: InputSelectStory = (args) => {
    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <InputSelect
            alert={args.alert}
            disabled={args.disabled}
            icon={args.icon}
            items={args.items}
            hasReset={args.hasReset}
            helpText={args.helpText}
            inputVariant={args.inputVariant}
            isSearchable={args.isSearchable}
            label={args.label}
            multiple={args.multiple}
            onChange={args.onChange}
            onBlur={args.onBlur}
            onSearchChange={args.onSearchChange}
            placeholder={args.placeholder}
            selectedItems={args.selectedItems}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const SelectComplete = Template.bind({});
export const SelectDisabled = Template.bind({});
export const SelectMultiple = Template.bind({});
export const SelectSearchable = Template.bind({});
export const SelectVariantTertiary = Template.bind({});
export const SelectWithAlert = Template.bind({});
export const SelectWithLabel = Template.bind({});
export const SelectWithPlaceholder = Template.bind({});
export const SelectWithSelection = Template.bind({});

const items = mockCityList;

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

SelectMultiple.args = {
    items,
    label: 'Select Multiple',
    multiple: true
}

SelectSearchable.args = {
    items,
    isSearchable: 'internal',
}

SelectVariantTertiary.args = {
    items,
    inputVariant: 'secondary'
}

SelectWithAlert.args = {
    alert: {
        type: 'error',
        message: 'This is an alert message'
    },
    items,
}

SelectWithLabel.args = {
    items,
    label: 'Select with label'
}

SelectWithPlaceholder.args = {
    items,
    placeholder: 'Selecione'
}

SelectWithSelection.args = {
    items,
    selectedItems: [items[0]]
}