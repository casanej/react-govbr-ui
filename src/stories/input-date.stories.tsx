import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputDate } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface InputDateExport extends ComponentMeta<typeof InputDate> {}
interface InputDateStory extends ComponentStory<typeof InputDate> {}

export default {
    title: 'Input/Date',
    component: InputDate,
} as InputDateExport;

const Template: InputDateStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <InputDate
        initialDate={args.initialDate}
        label={args.label}
        numberOfMonths={args.numberOfMonths}
        range={args.range}
        minBookDate={args.minBookDate}
        maxBookDate={args.maxBookDate}
        onChange={args.onChange}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const InputDateRange = Template.bind({});
export const InputDateLimit = Template.bind({});

Default.args = {
    numberOfMonths: 1,
    range: false,
    label: 'Período',
    onChange: (dates) => console.log('[DATES]', dates)
}

InputDateRange.args = {
    range: true,
    initialDate: {
        start: new Date(2022, 7, 19),
        end: new Date(2022, 7, 27)
    },
    onChange: (dates) => console.log('[DATES]', dates)
}

InputDateLimit.args = {
    range: true,
    minBookDate: new Date(2020, 0, 1),
    maxBookDate: new Date(2071, 11, 31),
}