import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Checkbox, CheckboxManager } from 'lib';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

interface LoadingExport extends ComponentMeta<typeof Checkbox> {}
interface LoadingStory extends ComponentStory<typeof Checkbox> {}

export default {
    title: 'Input/Checkbox',
    component: Checkbox,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const [multiple, setMultiple] = useState(false);

    useEffect(() => {
        const params = qs.parse(window.location.search);

        if (params.id === 'input-checkbox--multiple-checkboxes') {
            setMultiple(true);
        } else {
            setMultiple(false);
        }
    }, []);

    if (multiple) return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <CheckboxManager
            selectAll
        >
            <Checkbox
                alert={args.alert}
                checked={args.checked}
                label='Checkbox 1'
                name='checkbox1'
            />
            <Checkbox
                alert={args.alert}
                checked={args.checked}
                label='Checkbox 2'
                name='checkbox2'
            />
            <Checkbox
                alert={args.alert}
                checked={args.checked}
                label='Checkbox 3'
                name='checkbox3'
            />
        </CheckboxManager>
    </ThemeProvider>

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <Checkbox
            alert={args.alert}
            checked={args.checked}
            label={args.label}
            rotulo={args.rotulo}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const CheckboxWithAlert = Template.bind({});
export const CheckboxWithLabel = Template.bind({});
export const CheckboxWithRotulo = Template.bind({});
export const MultipleCheckboxes = Template.bind({});

Default.args = {
    checked: 0
}

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

MultipleCheckboxes.args = {}