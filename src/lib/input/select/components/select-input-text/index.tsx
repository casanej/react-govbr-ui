import { IconName } from '@fortawesome/fontawesome-common-types';
import { InputText } from 'lib';
import { InputAlertObj, InputVariants } from 'models';
import React, { Dispatch, FC, useEffect, useMemo, useState } from 'react';

interface Props {
    isFocused: boolean;
    itemsSelected: any;
    menuOpen: boolean;
    name: string;
    onFocus: () => void;
    onReset: () => void;
    onSearchChange: (value: string) => void;
    alert?: InputAlertObj;
    disabled?: boolean;
    icon?: IconName;
    inputVariant?: InputVariants;
    isSearchable?: boolean;
    hasReset?: boolean;
    helpText?: React.ReactNode;
    multiple?: boolean;
    placeholder?: string;
}

export const SelectInputText:FC<Props> = (props) => {
    const [inputRef, setInputRef] = useState<{ unmaskValue: Dispatch<string> }>();

    useEffect(() => {
        if (props.itemsSelected.length === 0) {
            if (inputRef) inputRef.unmaskValue('');
        }
    }, [props.itemsSelected])

    const handleInputValue = useMemo((): string => {
        if (props.itemsSelected.length === 1) return props.itemsSelected[0].label;
        if (props.itemsSelected.length > 1) return `${props.itemsSelected[0].label} + (${props.itemsSelected.length - 1})`;

        return '';
    }, [props.itemsSelected])

    const inputPlaceholder = useMemo((): string => {
        if (props.placeholder) return props.placeholder;
        if (props.multiple) return 'Selecione os itens';

        return 'Selecione o item';
    }, [props.placeholder, props.multiple]);

    return <>
        <InputText
            rawSetValue={setInputRef}
            alert={props.alert}
            action={{
                icon: props.menuOpen ? 'angle-up' : 'angle-down',
                onClick: props.onFocus,
                disabled: props.disabled
            }}
            autoComplete={false}
            disabled={props.disabled}
            hasReset={props.hasReset}
            helpText={props.helpText}
            icon={props.icon}
            name={`input-text-${props.name}`}
            onChange={(value) => props.onSearchChange(value.normal)}
            onFocus={props.onFocus}
            onReset={props.onReset}
            placeholder={inputPlaceholder}
            readOnly={!props.isSearchable}
            variant={props.inputVariant}
            value={props.isFocused ? '' : handleInputValue}
        />
    </>;
};
