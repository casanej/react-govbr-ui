import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputSelect } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

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
        multiple={args.multiple}
    />
</ThemeProvider>

export const Default = Template.bind({});

Default.args = {
    items: [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
        { label: 'Item 4', value: 'item4' },
        { label: 'Item 5', value: 'item5' },
    ]
}