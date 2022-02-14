import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { InputText, Item } from 'lib';
import { InputSelectContent, InputSelectMenu, InputSelectStyled } from './index.style';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { SelectItemProps } from 'models';
import { useOnClickOutside } from 'hooks';

interface Props {
    items: SelectItemProps[];
    icon?: IconName;
    multiple?: boolean;
    placeholder?: string;
    selectedItems?: SelectItemProps[];
    onChange?: (item: SelectItemProps[]) => void;
}

export const InputSelect = (props: Props): ReactElement => {
    const inputSelectRef = useRef<HTMLDivElement>()
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [itemsSelected, setItemsSelected] = useState<SelectItemProps[]>([]);

    useOnClickOutside(inputSelectRef, () => setInputFocus(false));

    useEffect(() => {
        if (props.selectedItems) setItemsSelected(props.selectedItems.map(item => item));
    }, []);

    useEffect(() => {
        if (props.onChange) props.onChange(itemsSelected);
    }, [itemsSelected])

    useEffect(() => {
        setMenuOpen(inputFocus);
    }, [inputFocus]);

    const handleInputValue = useCallback((): string => {
        if (itemsSelected.length === 1) return itemsSelected[0].value;
        if (itemsSelected.length > 1) return `${itemsSelected[0]} + (${itemsSelected.length - 1})`;

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

    return (
        <InputSelectStyled ref={inputSelectRef}>
            <InputSelectContent>
                <InputText
                    icon={props.icon}
                    value={inputFocus ? '' : handleInputValue()}
                    placeholder={ props.multiple ? 'Selecione os itens' : 'Selecione o item' }
                    onFocus={ () => setInputFocus(true) }
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
