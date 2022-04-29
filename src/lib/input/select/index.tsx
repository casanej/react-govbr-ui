import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useOnClickOutside } from 'hooks';
import { InputText, Item } from 'lib';
import { InputAlertObj, InputVariants, SelectItemProps } from 'models';
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { InputLabel } from '../components/general.style';
import { InputSelectContent, InputSelectMenu, InputSelectStyled } from './index.style';

export interface InputSelectProps {
    items: SelectItemProps[];
    alert?: InputAlertObj;
    disabled?: boolean;
    icon?: IconName;
    inputVariant?: InputVariants;
    fullWidth?: boolean;
    hasReset?: boolean;
    helpText?: React.ReactNode;
    label?: string;
    multiple?: boolean;
    name?: string;
    placeholder?: string;
    selectedItems?: SelectItemProps[];
    onChange?: (item: SelectItemProps[], name: string) => void;
    onFocus?: () => void;
    onReset?: () => void;
    visibleRows?: number;
}

export const InputSelect = (props: InputSelectProps): ReactElement => {
    const name = useMemo(() => props.name || Math.random().toString(), [props.name]);
    const inputSelectRef = useRef<HTMLDivElement>()
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [firstRun, setFirstRun] = useState<boolean>(true);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [itemsSelected, setItemsSelected] = useState<SelectItemProps[]>(props.selectedItems || []);
    const [menuGapTop, setMenuGapTop] = useState<number>(0);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow' }],
    });

    useEffect(() => {
        setInputFocus(false);
        const inputEl = inputSelectRef.current?.lastChild?.lastChild?.firstChild as HTMLDivElement;

        if (inputEl) setMenuGapTop(inputEl.offsetTop + inputEl.offsetHeight);
    }, [props.label, inputSelectRef])

    useEffect(() => {
        if (props.selectedItems) {
            setItemsSelected(oldSelected => {
                if (props.selectedItems) {
                    if (JSON.stringify(oldSelected) !== JSON.stringify(props.selectedItems)) return props.selectedItems;
                }

                return oldSelected
            });
        }
    }, [props.selectedItems])

    useOnClickOutside(inputSelectRef, () => setInputFocus(false));

    useEffect(() => { if (props.onChange && !firstRun) props.onChange(itemsSelected, name); }, [itemsSelected])
    useEffect(() => { setMenuOpen(inputFocus); }, [inputFocus]);
    useEffect(() => { if (firstRun) setFirstRun(false); }, []);

    const handleInputValue = useMemo((): string => {
        if (itemsSelected.length === 1) return itemsSelected[0].label;
        if (itemsSelected.length > 1) return `${itemsSelected[0].label} + (${itemsSelected.length - 1})`;

        return '';
    }, [itemsSelected])

    const inputPlaceholder = useMemo((): string => {
        if (props.placeholder) return props.placeholder;
        if (props.multiple) return 'Selecione os itens';

        return 'Selecione o item';
    }, [props.placeholder, props.multiple]);

    const handleSelectChange = (item: SelectItemProps) => {
        if (props.multiple) {
            setItemsSelected(oldItems => {
                return [...oldItems, item];
            })
        } else {
            setItemsSelected([item])
            setInputFocus(false);
        }
    }

    const handleOnReset = () => {
        setInputFocus(false);
        setItemsSelected([]);

        if (props.onReset) props.onReset();
    }

    const handleFocus = () => {
        console.log('[FOCUS TRIGGERED]')
        setInputFocus(true)
    }

    return (
        <InputSelectStyled ref={inputSelectRef} fullWidth={props.fullWidth} >
            <InputSelectContent ref={setReferenceElement}>
                {
                    props.label && <InputLabel direction='column'>{props.label}</InputLabel>
                }
                <InputText
                    icon={props.icon}
                    value={inputFocus ? '' : handleInputValue}
                    placeholder={inputPlaceholder}
                    onFocus={handleFocus}
                    onReset={handleOnReset}
                    hasReset={false}
                    helpText={props.helpText}
                    name={`input-text-${name}`}
                    action={{
                        icon: menuOpen ? 'angle-up' : 'angle-down',
                        onClick: () => setInputFocus(oldFocus => !oldFocus),
                        disabled: props.disabled
                    }}
                    alert={props.alert}
                    autoComplete={false}
                    variant={props.inputVariant}
                    disabled={props.disabled}
                    readOnly
                />
            </InputSelectContent>
            {
                inputFocus && <InputSelectMenu ref={setPopperElement} gapTop={menuGapTop} style={styles.popper} visibleRows={props.visibleRows || 5} { ...attributes.popper }>
                    {
                        props.items.map((item, index) => <Item key={index} type='text' onClick={() => handleSelectChange(item)}>{item.label}</Item>)
                    }
                </InputSelectMenu>
            }
        </InputSelectStyled>
    );
};
