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
        numberOfMonths={args.numberOfMonths}
        range={args.range}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const InputDateRange = Template.bind({});

Default.args = {
    numberOfMonths: 1,
    range: false
}

InputDateRange.args = {
    range: true,
    initialDate: {
        start: new Date(2022, 7, 19),
        end: new Date(2022, 7, 27)
    }
}