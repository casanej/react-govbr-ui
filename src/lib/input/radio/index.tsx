import { Alert } from 'lib';
import { AlertTypes } from 'models';
import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { InputRadioStyled, RadioContent, RadioInput, RadioLabel, RadioRotulo } from './index.style';

interface Props {
    alert?: {
        message: string;
        type: AlertTypes;
    }
    checked?: boolean;
    disabled?: boolean;
    label?: React.ReactNode;
    name?: string;
    onChange?: (name:string, value?: string, obj?: any) => void;
    rotulo?: {
        texto: string;
        subTexto?: string;
    }
    value?: {
        label: string;
        fn?: () => void;
        [key: string]: any;
    }
}

export const InputRadio = (props: Props): ReactElement => {
    const inputId = useMemo(() => `input-radio-${Math.random()}`, []);
    const inputRef = useRef<HTMLInputElement>();
    const name = props.name || 'default-checkbox';

    useEffect(() => {
        if (inputRef.current && props.checked) inputRef.current.checked = props.checked;
    }, [props.checked, inputRef.current])

    const handleCheck = () => {
        if (props.onChange) {
            props.onChange(name, props.value?.label, props.value);

            if (props.value?.fn) props.value.fn();
        }
    }

    return (
        <InputRadioStyled>
            {
                props.rotulo && <RadioRotulo>
                    <div>{props.rotulo.texto}</div>
                    <p>{props.rotulo.subTexto}</p>
                </RadioRotulo>
            }
            <RadioContent disabled={props.disabled}>
                <RadioInput
                    alert={props.alert?.type}
                    disabled={props.disabled}
                    id={inputId}
                    name={name}
                    ref={inputRef}
                    type='radio'
                    onChange={handleCheck}
                />
                {
                    props.label && <RadioLabel htmlFor={inputId}>{props.label}</RadioLabel>
                }
            </RadioContent>

            {
                props.alert && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }
        </InputRadioStyled>
    );
};
