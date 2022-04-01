/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputRadio } from 'lib';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof InputRadio> {}
interface LoadingStory extends ComponentStory<typeof InputRadio> {}

export default {
    title: 'Input/Radio',
    component: InputRadio,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <InputRadio
            alert={args.alert}
            checked={args.checked}
            disabled={args.disabled}
            label={args.label}
            name={args.name}
            value={args.value}
            onChange={args.onChange}
            rotulo={args.rotulo}
        />

        <InputRadio
            alert={args.alert}
            checked={args.checked}
            disabled={args.disabled}
            label={args.label}
            name={args.name}
            value={args.value}
            onChange={args.onChange}
            rotulo={args.rotulo}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const RadioWithAlert = Template.bind({});
export const RadioWithLabel = Template.bind({});
export const RadioWithRotulo = Template.bind({});

const inputValueParam = {
    label: 'isTeste: true',
    fn: () => console.log('[TESTE 1]'),
    otherParam: 'otherParam',
}

Default.args = {
    value: inputValueParam
}

RadioWithLabel.args = {
    label: 'Checkbox 1',
    value: inputValueParam
}

RadioWithAlert.args = {
    alert: {
        message: 'Mensagem de atenção!',
        type: 'error',
    },
    value: inputValueParam
}

RadioWithRotulo.args = {
    rotulo: {
        texto: 'Lorem ipsum dolor sit amet',
        subTexto: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    },
    value: inputValueParam
}