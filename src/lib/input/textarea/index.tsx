import { Alert } from 'lib';
import { AlertTypes } from 'models';
import React, { ReactElement, useEffect, useState } from 'react';
import { InputLabel } from '../components/general.style';
import { TextAreaCounter } from './components';
import { InputTextAreaContent, InputTextAreaStyled, InputTextAuxiliary, TextAreaStyled } from './index.style';

interface Props {
    alert?: {
        message?: string;
        type: AlertTypes;
    }
    auxiliary?: string;
    cols?: number;
    count?: boolean;
    label?: string;
    labelDirection?: 'row' | 'column';
    maxLength?: number;
    name?: string;
    onBlur?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string, name: string) => void;
    placeholder?: string;
    rows?: number;
    value?: string;
}

export const InputTextArea = (props: Props): ReactElement => {
    const name = props.name || 'default_textarea';
    const rows = props.rows || 8;
    const cols = props.cols || 100;
    const [charsLen, setCharsLen] = useState<number>(0);
    const [value, setValue] = useState<string>(props.value || '');

    useEffect(() => {
        if (typeof props.value === 'string') {
            setValue(props.value);
            setCharsLen(props.value.length);
        } else {
            setValue('');
            setCharsLen(0);
        }
    }, [props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;

        setValue(value);
        setCharsLen(value.length);

        if (props.onChange) props.onChange(event, value, name);
    }

    return (
        <InputTextAreaStyled>
            <InputTextAreaContent direction={props.labelDirection || 'column'} >
                {
                    props.label && <InputLabel htmlFor={name} direction={props.labelDirection || 'column'}>{props.label}</InputLabel>
                }
                <TextAreaStyled
                    id={name}
                    alert={props.alert?.type}
                    cols={cols}
                    maxLength={props.maxLength && props.maxLength > 0 ? props.maxLength : undefined}
                    name={name}
                    placeholder={props.placeholder}
                    rows={rows}
                    onBlur={props.onBlur}
                    onChange={handleChange}
                    value={value}
                />
            </InputTextAreaContent>
            {
                props.count && <TextAreaCounter charsLen={charsLen} maxLength={props.maxLength} />
            }
            {
                props.alert && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }
            {
                props.auxiliary && <InputTextAuxiliary>{props.auxiliary}</InputTextAuxiliary>
            }
        </InputTextAreaStyled>
    );
};
