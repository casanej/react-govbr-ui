import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { InputText, Item } from 'lib';
import { InputSelectContent, InputSelectLabel, InputSelectMenu, InputSelectStyled } from './index.style';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { SelectItemProps } from 'models';
import { useOnClickOutside } from 'hooks';

export interface InputSelectProps {
    items: SelectItemProps[];
    icon?: IconName;
    hasReset?: boolean;
    label?: string;
    multiple?: boolean;
    placeholder?: string;
    selectedItems?: SelectItemProps[];
    onChange?: (item: SelectItemProps[]) => void;
    onFocus?: () => void;
    onReset?: () => void;
}

export const InputSelect = (props: InputSelectProps): ReactElement => {
    const inputSelectRef = useRef<HTMLDivElement>()
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [itemsSelected, setItemsSelected] = useState<SelectItemProps[]>(props.selectedItems || []);

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

    useEffect(() => {
        if (props.onChange) props.onChange(itemsSelected);
    }, [itemsSelected])

    useEffect(() => {
        setMenuOpen(inputFocus);
    }, [inputFocus]);

    const handleInputValue = useMemo((): string => {
        if (itemsSelected.length === 1) return itemsSelected[0].label;
        if (itemsSelected.length > 1) return `${itemsSelected[0].label} + (${itemsSelected.length - 1})`;

        return '';
    }, [itemsSelected])

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

    return (
        <InputSelectStyled ref={inputSelectRef}>
            <InputSelectContent>
                {
                    props.label && <InputSelectLabel>{props.label}</InputSelectLabel>
                }
                <InputText
                    icon={props.icon}
                    value={inputFocus ? '' : handleInputValue}
                    placeholder={ props.multiple ? 'Selecione os itens' : 'Selecione o item' }
                    onFocus={ () => setInputFocus(true) }
                    onReset={handleOnReset}
                    hasReset={false}
                    action={{
                        icon: menuOpen ? 'angle-up' : 'angle-down',
                        onClick: () => setInputFocus(oldFocus => !oldFocus)
                    }}
                    autoComplete={false}
                />
            </InputSelectContent>
            <InputSelectMenu isOpen={inputFocus} >
                {
                    props.items.map((item, index) => <Item key={index} type='text' onClick={() => handleSelectChange(item)}>{item.label}</Item>)
                }
            </InputSelectMenu>
        </InputSelectStyled>
    );
};
