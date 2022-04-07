import { CheckboxContext } from 'context';
import { Alert } from 'lib';
import { AlertTypes } from 'models';
import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { CheckboxContent, CheckboxInput, CheckboxInputCustom, CheckboxRotulo, CheckboxStyled, CheckTypes } from './index.style';

interface Props {
    alert?: {
        message?: string;
        type: AlertTypes;
    }
    checked?: CheckTypes;
    label?: React.ReactNode;
    name?: string;
    onChange?: (name:string, value: CheckTypes) => void;
    rotulo?: {
        texto: string;
        subTexto?: string;
    }
}

const noUpdateCheckbox = ['select-all']

export const Checkbox = (props: Props): ReactElement => {
    const inputRef = useRef<HTMLInputElement>();
    const name = props.name || 'default-checkbox';
    const { handleCheckboxUpdate, registerField } = useContext(CheckboxContext);
    const [checked, setChecked] = useState<CheckTypes>(props.checked || 0);

    useEffect(() => {
        if (registerField && inputRef.current) {
            registerField(inputRef.current);
        }
    }, [registerField])

    useEffect(() => {
        setChecked(props.checked || 0);
    }, [props.checked])

    useEffect(() => {
        if (inputRef.current) setChecked(+inputRef.current.checked || 0);
    }, [inputRef.current?.checked])

    useEffect(() => {
        if (props.onChange) props.onChange(name, checked);

        if (handleCheckboxUpdate && noUpdateCheckbox.includes(name) === false) handleCheckboxUpdate();
    }, [checked])

    const handleCheck = () => {
        if (checked === 0) {
            setChecked(1);
        } else {
            setChecked(0);
        }
    }

    return (
        <CheckboxStyled>
            {
                props.rotulo && <CheckboxRotulo>
                    <div>{props.rotulo.texto}</div>
                    <p>{props.rotulo.subTexto}</p>
                </CheckboxRotulo>
            }
            <CheckboxContent>
                <CheckboxInput ref={inputRef} id={name} type='checkbox' onChange={handleCheck} />
                <CheckboxInputCustom
                    alert={props.alert?.type && !props.alert?.message ? props.alert?.type : undefined}
                    htmlFor={name}
                    checked={checked}
                >{props.label}</CheckboxInputCustom>
            </CheckboxContent>

            {
                props.alert?.message && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }
        </CheckboxStyled>
    );
};
