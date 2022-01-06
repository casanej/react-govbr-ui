import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'lib';
import React, { ReactElement, useEffect, useState } from 'react'
import { InputAction, InputIcon, InputLabel, inputSize, InputStyled, InputTextStyled } from './index.style';

interface Props {
    action?: {
        icon: IconName;
        onClick: () => void;
    }
    highlight?: boolean;
    icon?: IconName;
    label?: string;
    direction?: 'row' | 'column';
    name?: string;
    size?: keyof typeof inputSize;
    value?: string;
    onChange?: (value: string, name: string) => void;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
}

export const InputText = (props: Props): ReactElement => {
    const [value, setValue] = useState<string>('');
    const [name, setName] = useState<string>('input-text');

    useEffect(() => {
        if (props.name) setName(props.name);
        if (props.value) setValue(props.value);
    }, [props.name, props.value]);

    useEffect(() => {
        if (props.onChange) props.onChange(value, name);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    }

    return (
        <InputTextStyled direction={props.direction || 'column'}>
            {
                props.label && <InputLabel htmlFor={name}>{props.label}</InputLabel>
            }
            {
                props.icon && <InputIcon>
                    <FontAwesomeIcon icon={props.icon} color='#888' />
                </InputIcon>
            }
            <InputStyled
                name={name}
                density={props.size || 'md'}
                hasIcon={!!props.icon}
                highlight={props.highlight}
                value={value}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                onChange={handleChange}
            />

            {
                props.action && <InputAction>
                    <Button circle variant='tertiary' size='sm' label={
                        <FontAwesomeIcon icon={props.action.icon} color='#1351b4' />
                    } />
                </InputAction>
            }
        </InputTextStyled>
    );
};
