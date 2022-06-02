import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputDate } from 'lib';
import React, { useState } from 'react';
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

const Template: InputDateStory = (args) => {
    const [date, setDate] = useState(args.value);

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <div style={{ height: 50, width: 320, marginTop: 0, marginLeft: 600 }} >
            <InputDate
                label={args.label}
                numberOfMonths={args.numberOfMonths}
                range={args.range}
                minBookDate={args.minBookDate}
                maxBookDate={args.maxBookDate}
                onChange={date => { setDate(date); args.onChange && args.onChange(date); }}
                value={date}
            />
        </div>
    </ThemeProvider>
}

export const Default = Template.bind({});
export const InputDateCustomSimpleDate = Template.bind({});
export const InputDateCustomRangeDate = Template.bind({});
export const InputDateRange = Template.bind({});
export const InputDateLimit = Template.bind({});

Default.args = {
    numberOfMonths: 1,
    range: false,
    label: 'Período',
}

InputDateCustomSimpleDate.args = {
    value: [new Date(2022, 7, 18)],
}

InputDateCustomRangeDate.args = {
    range: true,
    value: [new Date(2022, 7, 19), new Date(2022, 7, 26)],
}

InputDateRange.args = {
    range: true,
}

InputDateLimit.args = {
    range: true,
    minBookDate: new Date(2020, 0, 1),
    maxBookDate: new Date(2071, 11, 31),
}