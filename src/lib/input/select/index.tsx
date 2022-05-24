import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useOnClickOutside } from 'hooks';
import { InputAlertObj, InputVariants, SelectItemProps, SelectSearchableProps } from 'models';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InputLabel } from '../components/general.style';
import { SelectMenu } from './components';
import { SelectInputText } from './components/select-input-text';
import { InputSelectContent, InputSelectStyled } from './index.style';

export interface InputSelectProps {
    items: SelectItemProps[];
    alert?: InputAlertObj;
    disabled?: boolean;
    icon?: IconName;
    inputVariant?: InputVariants;
    fullWidth?: boolean;
    hasReset?: boolean;
    helpText?: React.ReactNode;
    isSearchable?: SelectSearchableProps;
    label?: string;
    multiple?: boolean;
    name?: string;
    placeholder?: string;
    selectedItems?: SelectItemProps[];
    onChange?: (item: SelectItemProps[], name: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onReset?: () => void;
    onSearchChange?: (value: string) => void;
    visibleRows?: number;
}

export const InputSelect = (props: InputSelectProps): ReactElement => {
    const name = useMemo(() => props.name || Math.random().toString(), [props.name]);
    const inputSelectRef = useRef<HTMLDivElement>()
    const [firstRun, setFirstRun] = useState<boolean>(true);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [itemsSelected, setItemsSelected] = useState<SelectItemProps[]>(props.selectedItems || []);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        setInputFocus(false);
    }, [props.label, inputSelectRef])

    useEffect(() => {
        if (props.selectedItems) {
            setItemsSelected(props.selectedItems);
        }
    }, [props.selectedItems])

    useOnClickOutside(inputSelectRef, () => setInputFocus(false));

    useEffect(() => {
        setMenuOpen(inputFocus);

        if (!inputFocus && !firstRun) props.onBlur && props.onBlur();
    }, [inputFocus]);

    useEffect(() => { if (firstRun) setFirstRun(false); }, []);

    const inputSelectItems = useMemo(() => {
        if (props.isSearchable && props.isSearchable === 'internal') {
            return props.items.filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()));
        }

        return props.items;
    }, [props.isSearchable, searchValue, props.items]);

    const handleChange = useCallback((values: SelectItemProps[]) => {
        setItemsSelected(values);
        if (props.onChange && !firstRun) props.onChange(values, name);
    }, [firstRun, props.onChange]);

    const handleSearchValue = (value: string) => {
        if (props.isSearchable && inputFocus) {
            if (props.isSearchable === 'internal') setSearchValue(value);
            else if (props.isSearchable === 'external') props.onSearchChange && props.onSearchChange(value);
        }
    }

    return (
        <InputSelectStyled ref={inputSelectRef} fullWidth={props.fullWidth} >
            <InputSelectContent ref={setReferenceElement}>
                {
                    props.label && <InputLabel direction='column'>{props.label}</InputLabel>
                }
                <SelectInputText
                    alert={props.alert}
                    disabled={props.disabled}
                    hasReset={props.hasReset}
                    icon={props.icon}
                    isFocused={inputFocus}
                    isSearchable={!!props.isSearchable}
                    itemsSelected={itemsSelected}
                    menuOpen={menuOpen}
                    name={name}
                    onFocus={() => { setInputFocus(true); }}
                    onReset={() => {
                        setInputFocus(false);
                        setItemsSelected([]);

                        if (props.onReset) props.onReset();
                    }}
                    onSearchChange={handleSearchValue}
                />
            </InputSelectContent>
            <SelectMenu
                isOpen={inputFocus}
                items={inputSelectItems}
                multiple={props.multiple}
                name={name}
                onClose={() => setInputFocus(false)}
                onChange={handleChange}
                selectedItems={itemsSelected}
                refContentInput={referenceElement}
            />
        </InputSelectStyled>
    );
};
