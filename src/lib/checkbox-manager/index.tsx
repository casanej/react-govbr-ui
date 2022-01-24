import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import { CheckTypes } from '../checkbox/index.style';

interface Props {
    children: React.ReactNode;
    selectAll?: boolean;
    onCheckAll?: (values: Array<{ name: string; value: boolean }>) => void;
}

export const CheckboxManager = (props: Props): ReactElement => {
    const [boxes, setBoxes] = useState<Array<HTMLInputElement>>([]);
    const [selectAllValue, setSelectAllValue] = useState<CheckTypes>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const registerField = useCallback((ref:HTMLInputElement) => {
        if (ref.id !== 'select-all') setBoxes(oldBoxes => [...oldBoxes, ref]);
    }, [])

    const handleCheckboxUpdate = useCallback(() => {
        setIsUpdating(true);
    }, [])

    useEffect(() => {
        if (isUpdating === false) {
            if (updateSelectAllState()) {
                setIsUpdating(false);
            }
        }
    }, [isUpdating])

    const handleSelectAll = useCallback(() => {
        if (selectAllValue === 0) {
            setSelectAllValue(1);
            boxes.forEach(box => { box.checked = true });
        } else {
            setSelectAllValue(0);
            boxes.forEach(box => { box.checked = false });
        }
    }, [boxes, selectAllValue])

    const updateSelectAllState = () => {
        const checked = boxes.filter(box => box.checked).length;

        if (checked === boxes.length - 1) setSelectAllValue(1);
        if (checked > 0) setSelectAllValue(2);

        setSelectAllValue(0);

        return true;
    }

    return (
        <CheckboxContext.Provider value={{ registerField, handleCheckboxUpdate }}>
            {
                props.selectAll && <Checkbox
                    label='Selecionar todos'
                    name='select-all'
                    checked={selectAllValue}
                    onChange={handleSelectAll}
                />
            }
            {props.children}
        </CheckboxContext.Provider>
    );
};
