import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button } from 'lib';
import { AlertTypes } from 'models';
import React, { ReactElement, useEffect, useState } from 'react'
import { InputLabel } from '../components/general.style';
import { InputAction, InputContent, InputIcon, inputSize, InputStyled, InputTextStyled } from './index.style';

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
    size?: keyof typeof inputSize;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string, name: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    type?: string;
}

export const InputText = (props: Props): ReactElement => {
    const [value, setValue] = useState<string>('');
    const [name, setName] = useState<string>('input-text');

    useEffect(() => {
        if (props.name) setName(props.name);
        if (typeof props.value === 'string') setValue(props.value);
    }, [props.name, props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        setValue(value);

        if (props.onChange) props.onChange(event, value, name);
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
                    id={name}
                    alert={props.alert?.type}
                    disabled={props.disabled}
                    name={name}
                    density={props.size || 'md'}
                    hasIcon={!!props.icon}
                    highlight={props.highlight}
                    value={value}
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    onChange={handleChange}
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
