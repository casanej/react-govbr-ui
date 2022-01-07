import { AlertTypes } from 'models';
import React, { ReactElement, useEffect, useState } from 'react'
import { Alert } from 'lib';
import { CheckboxStyled, CheckboxContent, CheckboxInput, CheckboxInputCustom, CheckboxRotulo, CheckboxLabel } from './index.style';

interface Props {
    alert?: {
        message: string;
        type: AlertTypes;
    }
    checked?: boolean;
    label?: React.ReactNode;
    name?: string;
    onChange?: (name:string, value: boolean) => void;
    rotulo?: {
        texto: string;
        subTexto?: string;
    }
}

export const Checkbox = (props: Props): ReactElement => {
    const [name, setName] = useState('default-checkbox');
    const [checked, setChecked] = useState<boolean>(props.checked || false);

    useEffect(() => {
        if (props.name) setName(props.name);
    }, [])

    useEffect(() => {
        setChecked(props.checked || false);
    }, [props.checked])

    useEffect(() => {
        if (props.onChange) props.onChange(name, checked);
    }, [checked])

    return (
        <CheckboxStyled>
            {
                props.rotulo && <CheckboxRotulo>
                    <div>{props.rotulo.texto}</div>
                    <p>{props.rotulo.subTexto}</p>
                </CheckboxRotulo>
            }
            <CheckboxContent>
                <CheckboxInput id={name} type='checkbox' onChange={() => setChecked(oldCheck => !oldCheck)} />
                <CheckboxInputCustom
                    alert={props.alert?.type}
                    htmlFor={name}
                    checked={checked}
                >{props.label}</CheckboxInputCustom>
            </CheckboxContent>

            {
                props.alert && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }
        </CheckboxStyled>
    );
};
