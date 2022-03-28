/* eslint-disable complexity */
import { faTimes, IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOnClickOutside } from 'hooks';
import { AnyMaskedOptions } from 'imask';
import { Alert, Button, Item } from 'lib';
import { InputAlertObj, InputListParams, InputTextButtonAction, InputVariants, OnChangeValueParameter } from 'models';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useIMask } from 'react-imask';
import { InputLabel } from '../components/general.style';
import { InputAction, InputContent, InputHelpText, InputIcon, InputListMenu, InputReset, inputSize, InputStyled, InputTextStyled } from './index.style';

export interface InputTextProps {
    action?: InputTextButtonAction;
    alert?: InputAlertObj;
    autoComplete?: boolean;
    initialValue?: string;
    inputCustomProps?: any;
    direction?: 'row' | 'column';
    disabled?: boolean;
    hasReset?: boolean;
    helpText?: React.ReactNode;
    icon?: IconName;
    label?: string;
    list?: InputListParams[];
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
    const inputContentRef = useRef();
    const [name, setName] = useState<string>('input-text');
    const [listOpen, setListOpen] = useState<boolean>(false);
    const [listSelected, setListSelected] = useState<unknown>();
    const { ref, value, setValue, unmaskedValue, setUnmaskedValue } = useIMask(props.maskObj || { mask: String });

    useOnClickOutside(inputContentRef, () => setListOpen(false));

    useEffect(() => {
        if (typeof props.value === 'string') {
            setUnmaskedValue(props.value);
            setValue(props.value);
        } else {
            setUnmaskedValue('');
            setValue('');
        }
    }, [props.value]);

    useEffect(() => {
        if (props.name) setName(props.name);
        if (props.initialValue) {
            setUnmaskedValue(props.initialValue);
            setValue(props.initialValue);
        }
    }, [])

    useEffect(() => {
        const finalValue = {
            normal: unmaskedValue,
            masked: value,
            item: listSelected
        };

        if (props.onChange) props.onChange(finalValue, name);
    }, [value]);

    const handleListSelectItem = (item: InputListParams) => {
        setListSelected(item);
        if (typeof item === 'string') {
            setValue(item);
            setUnmaskedValue(item);
        } else {
            setValue(item.label);
            setUnmaskedValue(item.label);
        }
        setListOpen(false);
    }

    const handleFocus = () => {
        if (props.list) setListOpen(true);
        if (props.onFocus) props.onFocus();
    }

    const handleBlur = () => {
        // if (props.list) setListOpen(false);
        if (props.onBlur) props.onBlur();
    }

    const handleReset = () => {
        setValue('');
        setUnmaskedValue('');

        if (props.onReset) props.onReset();
    }

    const renderInputListItem = useCallback((item: InputListParams) => {
        const itemLabel = typeof item === 'string' ? item : item.label;

        if (!itemLabel.toLowerCase().includes(value.toLowerCase())) return null;

        return <Item key={itemLabel} type='text' onClick={() => handleListSelectItem(item)} >{itemLabel}</Item>;
    }, [value])

    return (
        <InputTextStyled direction={props.direction || 'column'}>
            {
                props.label && <InputLabel direction={props.direction || 'column'} htmlFor={name}>{props.label}</InputLabel>
            }
            <InputContent ref={inputContentRef}>
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    readOnly={props.readOnly}
                    variant={props.variant || 'primary'}
                    {...props.inputCustomProps}
                />

                {
                    props.list && props.list.length > 0 && listOpen && <InputListMenu>{ props.list.map(renderInputListItem) }</InputListMenu>
                }

                {
                    props.hasReset && <InputReset>
                        <Button circle variant='tertiary' size='sm' onClick={handleReset}><FontAwesomeIcon icon={faTimes} color='#a3a3a3' /></Button>
                    </InputReset>
                }

                {
                    props.action && <InputAction>
                        <Button circle variant='tertiary' size='sm' disabled={props.action.disabled} onClick={props.action.onClick}><FontAwesomeIcon icon={props.action.icon} color='#1351b4' /></Button>
                    </InputAction>
                }
            </InputContent>
            {
                props.alert && <Alert type={props.alert.type}>{props.alert.message}</Alert>
            }

            {
                props.helpText && <InputHelpText>{props.helpText}</InputHelpText>
            }
        </InputTextStyled>
    );
};
