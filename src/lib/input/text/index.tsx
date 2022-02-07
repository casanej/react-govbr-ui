import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnyMaskedOptions } from 'imask';
import { Alert, Button } from 'lib';
import { AlertTypes } from 'models';
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useIMask } from 'react-imask';
import { InputLabel } from '../components/general.style';
import { InputAction, InputContent, InputIcon, inputSize, InputStyled, InputTextStyled } from './index.style';

interface OnChangeValueParameter {
    normal: string;
    masked: string;
}

interface Props {
    action?: {
        icon: IconName;
        onClick: () => void;
    };
    alert?: {
        message: string;
        type: AlertTypes;
    }
    inputCustomProps?: any;
    direction?: 'row' | 'column';
    disabled?: boolean;
    helpText?: React.ReactNode;
    highlight?: boolean;
    icon?: IconName;
    label?: string;
    name?: string;
    maxLength?: number;
    maskObj?: AnyMaskedOptions;
    size?: keyof typeof inputSize;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: OnChangeValueParameter, name: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    type?: string;
}

export const InputText = (props: Props): ReactElement => {
    const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
    const [name, setName] = useState<string>('input-text');
    const { ref, value, setValue, unmaskedValue } = useIMask(props.maskObj || { mask: String });

    useEffect(() => {
        if (props.name) setName(props.name);
        if (typeof props.value === 'string') setValue(props.value);
    }, [props.name, props.value]);

    useEffect(() => {
        const finalValue = {
            normal: unmaskedValue,
            masked: value
        };

        if (props.onChange) props.onChange(event!, finalValue, name);
    }, [value]);

    return (
        <InputTextStyled direction={props.direction || 'column'}>
            {
                props.label && <InputLabel direction={props.direction || 'column'} htmlFor={name}>{props.label}</InputLabel>
            }
            <InputContent>
                {
                    props.icon && <InputIcon>
                        <FontAwesomeIcon icon={props.icon} color='#888' />
                    </InputIcon>
                }
                <InputStyled
                    ref={ref}
                    id={name}
                    alert={props.alert?.type}
                    disabled={props.disabled}
                    name={name}
                    density={props.size || 'md'}
                    hasIcon={!!props.icon}
                    highlight={props.highlight}
                    maxLength={props.maxLength || undefined}
                    value={value}
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    onChange={(e) => setEvent(e)}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    {...props.inputCustomProps}
                />

                {
                    props.action && <InputAction>
                        <Button circle variant='tertiary' size='sm'><FontAwesomeIcon icon={props.action.icon} color='#1351b4' /></Button>
                    </InputAction>
                }
            </InputContent>
            {
                props.alert && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }

            {
                props.helpText && <div>{props.helpText}</div>
            }
        </InputTextStyled>
    );
};
