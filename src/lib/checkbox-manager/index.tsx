import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import { CheckboxRegisterObject, CheckTypes } from 'models';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
    children: React.ReactNode;
    blackList?: string[];
    master?: string[];
    selectAll?: boolean;
    onCheckAll?: (values: Array<{ name: string; value: boolean }>) => void;
}

export const CheckboxManager = (props: Props): ReactElement => {
    const [boxes, setBoxes] = useState<CheckboxRegisterObject[]>([]);
    const [selectAllValue, setSelectAllValue] = useState<CheckTypes>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (isUpdating === false) {
            if (updateSelectAllState()) {
                setIsUpdating(false);
            }
        }
    }, [isUpdating]);

    const blackListBoxes = useMemo(() => {
        const old = ['select-all'];

        if (props.blackList && props.blackList.length > 0) {
            old.push(...props.blackList);
        }

        return old;
    }, [props.blackList]);

    const registerField = useCallback((ref: CheckboxRegisterObject) => {
        if (!blackListBoxes.includes(ref.name)) {
            setBoxes(oldBoxes => {
                const index = oldBoxes.findIndex(box => box.name === ref.name);

                if (index === -1) {
                    return [...oldBoxes, ref]
                }

                return oldBoxes
            });
        }
    }, [blackListBoxes])

    const handleCheckboxUpdate = useCallback(() => {
        setIsUpdating(true);
    }, [])

    const handleSelectAll = useCallback((prefix?: string, active?: CheckTypes) => {
        let setActive: CheckTypes = 0;

        if (active !== undefined) {
            setActive = active;
        } else {
            setActive = selectAllValue === 1 ? 0 : 1;
        }

        setSelectAllValue(setActive);

        boxes.forEach(box => {
            if (prefix) {
                if (box.name.includes(prefix)) box.setValue(setActive);
            } else {
                box.setValue(setActive);
            }
        });
    }, [boxes, selectAllValue])

    const updateSelectAllState = () => {
        const checked = boxes.filter(box => box.checked).length;

        if (checked === boxes.length - 1) setSelectAllValue(1);
        if (checked > 0) setSelectAllValue(2);

        setSelectAllValue(0);

        return true;
    }

    return (
        <CheckboxContext.Provider value={{ registerField, handleCheckboxUpdate, handleSelectAll, selectAllValue }}>
            {
                props.selectAll && <Checkbox
                    label='Selecionar todos'
                    name='select-all'
                    checked={selectAllValue}
                    onChange={() => handleSelectAll()}
                />
            }
            {props.children}
        </CheckboxContext.Provider>
    );
};
