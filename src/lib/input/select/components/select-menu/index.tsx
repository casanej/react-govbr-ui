import { CheckboxManager, Item, Loading } from 'lib';
import { CheckTypes, SearchOptions, SelectItemProps } from 'models';
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
    searchValue: string;
    selectedItems: SelectItemProps[];
    isSearchable?: boolean;
    loading?: boolean;
    multiple?: boolean;
    searchOptions?: SearchOptions;
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
        const newItems = props.selectedItems.map(item => item.value);
        const currentItems = selectedItems;

        const arrIsEqual = currentItems.every((value, index) => value === newItems[index]);

        if (arrIsEqual && newItems.length === 0) setCkbxAll(0);

        if (!arrIsEqual) setSelectedItems(props.selectedItems.map(item => item.value));
    }, [props.selectedItems]);

    useEffect(() => {
        if (selectedItems.length === 0) {
            setCkbxAll(0);
        } else if (selectedItems.length === props.items.length) {
            setCkbxAll(1);
        } else {
            setCkbxAll(2);
        }
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

    if (props.loading) return <InputSelectMenu ref={setPopperElement} style={styles.popper} visibleRows={props.visibleRows || 5} { ...attributes.popper }>
        <Item
            name={`${props.name}-min-length`}
            type='text'
            disabled
        >
            <Loading infinity='md' />
        </Item>
    </InputSelectMenu>

    if (props.searchOptions) {
        if (props.isSearchable && props.searchValue.length < (props.searchOptions.minLength || 3)) return <InputSelectMenu ref={setPopperElement} style={styles.popper} visibleRows={props.visibleRows || 5} { ...attributes.popper }>
            <Item
                name={`${props.name}-min-length`}
                type='text'
                disabled
            >
                Digite ao menos {(props.searchOptions.minLength || 3)} caracteres
            </Item>
        </InputSelectMenu>;
    }

    return <InputSelectMenu ref={setPopperElement} style={styles.popper} visibleRows={props.visibleRows || 5} { ...attributes.popper }>
        <CheckboxManager blackList={[`${props.name}-select-all`]}>
            { props.multiple && <Item type='checkbox_master' active={ckbxAll} name={`${props.name}-select-all`} onChange={setCkbxAll} >Selecione todos</Item> }
            {
                props.items.map(item => {
                    let isActive = selectedItems.includes(item.value);

                    if (!isActive) isActive = false;

                    return <Item
                        key={item.value}
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
