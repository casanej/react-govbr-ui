import { CheckboxManager, Item } from 'lib';
import { CheckTypes, SelectItemProps } from 'models';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { InputSelectMenu } from './index.style';

interface Props {
    isOpen: boolean;
    items: SelectItemProps[];
    name: string;
    onClose: () => void;
    onChange: (item: SelectItemProps[]) => void;
    refContentInput: any;
    multiple?: boolean;
    selectedItems?: SelectItemProps[];
    visibleRows?: number;
}

export const SelectMenu:FC<Props> = (props) => {
    const [popperElement, setPopperElement] = useState(null);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [ckbxAll, setCkbxAll] = useState<CheckTypes>(0);
    const { styles, attributes } = usePopper(props.refContentInput, popperElement, {
        modifiers: [{ name: 'arrow' }],
    });

    useEffect(() => {
        if (props.selectedItems) {
            const newItems = props.selectedItems.map(item => item.value);
            const currentItems = selectedItems;

            const arrIsEqual = currentItems.every((value, index) => value === newItems[index]);

            if (!arrIsEqual) setSelectedItems(props.selectedItems);
        }
    }, [props.selectedItems]);

    useEffect(() => {
        const items = props.items.filter(item => selectedItems.includes(item.value))

        props.onChange(items);
    }, [selectedItems])

    const handleSelectChange = useCallback((item: SelectItemProps) => (checked: CheckTypes) => {
        const { value } = item;
        const isChecked = Boolean(checked);

        if (props.multiple) {
            setSelectedItems(oldSelected => {
                if (isChecked) {
                    return [...oldSelected, value];
                } else {
                    return oldSelected.filter(item => item !== value);
                }
            })
        } else {
            setSelectedItems([value])
            props.onClose();
        }

    }, [props.multiple]);

    if (!props.isOpen) return null;

    return <InputSelectMenu ref={setPopperElement} style={styles.popper} visibleRows={props.visibleRows || 5} { ...attributes.popper }>
        <CheckboxManager blackList={[`${props.name}-select-all`]}>
            { props.multiple && <Item type='checkbox_master' active={ckbxAll} name={`${props.name}-select-all`} onChange={setCkbxAll} >Selecione todos</Item> }
            {
                props.items.map((item, index) => {
                    let isActive = selectedItems.includes(item.value);

                    if (!isActive) isActive = false;

                    return <Item
                        key={index}
                        active={+isActive as CheckTypes}
                        name={item.value}
                        type={ props.multiple ? 'checkbox' : 'text' }
                        onChange={handleSelectChange(item)}
                    >
                        {item.label}
                    </Item>
                })
            }
        </CheckboxManager>
    </InputSelectMenu>;
};
