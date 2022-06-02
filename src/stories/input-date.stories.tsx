import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputDate } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface InputDateExport extends ComponentMeta<typeof InputDate> {}
interface InputDateStory extends ComponentStory<typeof InputDate> {}

export default {
    title: 'Input/Date',
    component: InputDate,
    argTypes: {
        onChange: { action: 'onChange(date[])' },
    }
} as InputDateExport;

const Template: InputDateStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <div style={{ height: 50, width: 320, marginTop: 0, marginLeft: 600 }} >
        <InputDate
            initialDate={args.initialDate}
            label={args.label}
            numberOfMonths={args.numberOfMonths}
            range={args.range}
            minBookDate={args.minBookDate}
            maxBookDate={args.maxBookDate}
            onChange={args.onChange}
            value={args.value}
        />
    </div>
</ThemeProvider>

export const Default = Template.bind({});
export const InputDateRange = Template.bind({});
export const InputDateLimit = Template.bind({});
export const InputDateCustomDate = Template.bind({});

Default.args = {
    numberOfMonths: 1,
    range: false,
    label: 'Período',
}

InputDateRange.args = {
    range: true,
    initialDate: {
        start: new Date(2022, 7, 19),
        end: new Date(2022, 7, 27)
    },
}

InputDateLimit.args = {
    range: true,
    minBookDate: new Date(2020, 0, 1),
    maxBookDate: new Date(2071, 11, 31),
}

InputDateCustomDate.args = {
    range: true,
    value: [new Date(2022, 8, 19), new Date(2022, 8, 27)],
}