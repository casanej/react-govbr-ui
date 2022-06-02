import { CheckboxContext } from 'context';
import { Alert } from 'lib';
import { AlertTypes, CheckTypes } from 'models';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { CheckboxContent, CheckboxInputCustom, CheckboxRotulo, CheckboxStyled } from './index.style';

interface Props {
    alert?: {
        message?: string;
        type: AlertTypes;
    }
    checked?: CheckTypes;
    label?: React.ReactNode;
    name?: string;
    onChange?: (name:string, value: CheckTypes) => void;
    onClick?: (name:string, value: CheckTypes) => void;
    rotulo?: {
        texto: string;
        subTexto?: string;
    }
}

const noUpdateCheckbox = ['select-all']

export const Checkbox = (props: Props): ReactElement => {
    const name = props.name || 'default-checkbox';
    const { handleCheckboxUpdate, registerField } = useContext(CheckboxContext);
    const [checked, setChecked] = useState<CheckTypes>(props.checked || 0);

    useEffect(() => {
        if (registerField) {
            registerField({ name, setValue: setChecked, checked })
        }
    }, [registerField])

    useEffect(() => {
        let checkedParsed: CheckTypes = 0;

        if (typeof props.checked === 'number') {
            checkedParsed = props.checked as CheckTypes;
        }

        setChecked(checkedParsed);
    }, [props.checked])

    useEffect(() => {
        if (props.onChange) props.onChange(name, checked);

        if (handleCheckboxUpdate && noUpdateCheckbox.includes(name) === false) handleCheckboxUpdate();
    }, [checked])

    const handleCheck = () => {
        const newChecked = checked === 0 ? 1 : 0;
        setChecked(newChecked);

        props.onClick && props.onClick(name, newChecked);
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
                <CheckboxInputCustom
                    alert={props.alert?.type && !props.alert?.message ? props.alert?.type : undefined}
                    checked={checked}
                    onClick={handleCheck}
                >{props.label}</CheckboxInputCustom>
            </CheckboxContent>

            {
                props.alert?.message && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }
        </CheckboxStyled>
    );
};
