import { faTimes, IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnyMaskedOptions } from 'imask';
import { Alert, Button } from 'lib';
import { AlertTypes, InputVariants, OnChangeValueParameter } from 'models';
import React, { ReactElement, useEffect, useState } from 'react';
import { useIMask } from 'react-imask';
import { InputLabel } from '../components/general.style';
import { InputAction, InputContent, InputIcon, InputReset, inputSize, InputStyled, InputTextStyled } from './index.style';

export interface InputTextProps {
    action?: {
        icon: IconName;
        onClick: () => void;
    };
    alert?: {
        message: string;
        type: AlertTypes;
    };
    autoComplete?: boolean;
    inputCustomProps?: any;
    direction?: 'row' | 'column';
    disabled?: boolean;
    hasReset?: boolean;
    helpText?: React.ReactNode;
    icon?: IconName;
    label?: string;
    name?: string;
    maxLength?: number;
    maskObj?: AnyMaskedOptions;
    size?: keyof typeof inputSize;
    value?: string;
    onChange?: (value: OnChangeValueParameter, name: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onReset?: () => void;
    placeholder?: string;
    readOnly?: boolean;
    type?: string;
    variant?: InputVariants;
}

export const InputText = (props: InputTextProps): ReactElement => {
    const [name, setName] = useState<string>('input-text');
    const { ref, value, setValue, unmaskedValue, setUnmaskedValue } = useIMask(props.maskObj || { mask: String });

    useEffect(() => {
        if (props.name) setName(props.name);
        if (typeof props.value === 'string') {
            setUnmaskedValue(props.value);
            setValue(props.value);
        }
    }, [props.name, props.value]);

    useEffect(() => {
        const finalValue = {
            normal: unmaskedValue,
            masked: value
        };

        if (props.onChange) props.onChange(finalValue, name);
    }, [value]);

    const handleReset = () => {
        setValue('');
        setUnmaskedValue('');

        if (props.onReset) props.onReset();
    }

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
                    autoComplete={props.autoComplete ? 'on' : 'off'}
                    disabled={props.disabled}
                    name={name}
                    density={props.size || 'md'}
                    hasIcon={!!props.icon}
                    maxLength={props.maxLength || undefined}
                    value={value}
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    readOnly={props.readOnly}
                    variant={props.variant || 'primary'}
                    {...props.inputCustomProps}
                />

                {
                    props.hasReset && <InputReset>
                        <Button circle variant='tertiary' size='sm' onClick={handleReset}><FontAwesomeIcon icon={faTimes} color='#a3a3a3' /></Button>
                    </InputReset>
                }

                {
                    props.action && <InputAction>
                        <Button circle variant='tertiary' size='sm' onClick={props.action.onClick}><FontAwesomeIcon icon={props.action.icon} color='#1351b4' /></Button>
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
