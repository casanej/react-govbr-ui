import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Item } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface InputSelectExport extends ComponentMeta<typeof Item> {}
interface InputSelectStory extends ComponentStory<typeof Item> {}

export default {
    title: 'Layout/Item',
    component: Item,
} as InputSelectExport;

const Template: InputSelectStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Item
        name={args.name}
        disabled={args.disabled}
        type={args.type}
    >ITEM TEXT</Item>
</ThemeProvider>

export const Default = Template.bind({});
export const ItemWithCheckbox = Template.bind({});

Default.args = {
    name: 'item',
    type: 'text',
}

ItemWithCheckbox.args = {
    name: 'item',
    type: 'checkbox',
}