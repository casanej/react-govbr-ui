import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Item } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface InputSelectExport extends ComponentMeta<typeof Item> {}
interface InputSelectStory extends ComponentStory<typeof Item> {}

export default {
    title: 'Layout/Item',
    component: Item,
} as InputSelectExport;

const Template: InputSelectStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Item
        disabled={args.disabled}
        type={args.type}
    >ITEM TEXT</Item>
</ThemeProvider>

export const Default = Template.bind({});
export const ItemWithCheckbox = Template.bind({});

Default.args = {
    type: 'text',
}

ItemWithCheckbox.args = {
    type: 'checkbox',
}