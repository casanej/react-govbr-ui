import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface LoadingExport extends ComponentMeta<typeof Checkbox> {}
interface LoadingStory extends ComponentStory<typeof Checkbox> {}

export default {
    title: 'Input/Checkbox',
    component: Checkbox,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Checkbox
        alert={args.alert}
        checked={args.checked}
        label={args.label}
        rotulo={args.rotulo}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const CheckboxWithAlert = Template.bind({});
export const CheckboxWithLabel = Template.bind({});
export const CheckboxWithRotulo = Template.bind({});

Default.args = {}

CheckboxWithLabel.args = {
    label: 'Checkbox 1'
}

CheckboxWithAlert.args = {
    alert: {
        message: 'Mensagem de atenção!',
        type: 'warning',
    }
}

CheckboxWithRotulo.args = {
    rotulo: {
        texto: 'Lorem ipsum dolor sit amet',
        subTexto: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    }
}