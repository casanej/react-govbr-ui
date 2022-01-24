import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { InputText, Item } from 'lib';
import { InputSelectContent, InputSelectMenu, InputSelectStyled } from './index.style';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface SelectItemProps {
    label: string;
    value: string;
    disabled?: boolean;
}

interface Props {
    items: SelectItemProps[];
    icon?: IconName;
    multiple?: boolean;
}

export const InputSelect = (props: Props): ReactElement => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [itemsSelected, setItemsSelected] = useState<Array<string>>([]);

    const handleInputValue = useCallback(() => {
        if (itemsSelected.length === 1) return itemsSelected[0];
        if (itemsSelected.length > 1) return `${itemsSelected[0]} + (${itemsSelected.length - 1})`;

        return '';
    }, [itemsSelected])

    useEffect(() => {
        setMenuOpen(inputFocus);
    }, [inputFocus]);

    const toggleMenu = () => setMenuOpen(oldToggle => !oldToggle);

    return (
        <InputSelectStyled>
            <InputSelectContent>
                <InputText
                    icon={props.icon}
                    value={inputFocus ? '' : handleInputValue()}
                    placeholder={ props.multiple ? 'Selecione os itens' : 'Selecione o item' }
                    onFocus={ () => setInputFocus(true) }
                    onBlur={ () => setInputFocus(false) }
                    action={{
                        icon: menuOpen ? 'angle-up' : 'angle-down',
                        onClick: toggleMenu
                    }}
                />
            </InputSelectContent>
            <InputSelectMenu isOpen={menuOpen}>
                {
                    props.items.map((item, index) => <Item key={index} type='text'>Item</Item>)
                }
            </InputSelectMenu>
        </InputSelectStyled>
    );
};
