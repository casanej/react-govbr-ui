import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import { CheckTypes } from 'models';
import React, { ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { ItemStyled } from './index.style';

interface Props {
    children: React.ReactNode;
    name: string;
    type: 'text' | 'radio' | 'checkbox' | 'checkbox_master';
    active?: CheckTypes;
    disabled?: boolean;
    onClick?: (checked: CheckTypes) => void;
    onChange?: (checked: CheckTypes) => void;
}

export const Item = (props: Props): ReactElement => {
    const { handleSelectAll } = useContext(CheckboxContext);
    const [isActive, setIsActive] = useState<CheckTypes>(props.active || 0);
    const [firstRun, setFirstRun] = useState<boolean>(true);

    useEffect(() => {
        if (!firstRun && props.onChange) props.onChange(isActive);
    }, [isActive])

    useEffect(() => {
        if (firstRun) setFirstRun(false);
    }, [])

    const handleClickItem = useCallback(() => {
        if (props.type === 'checkbox') {
            if (isActive === 1) setIsActive(0);
            else setIsActive(1);
        } else {
            setIsActive(1);
        }
    }, [props.type, isActive]);

    const handleChecked = (_: string, values: CheckTypes) => {
        if (props.type === 'checkbox_master') {
            handleSelectAll && handleSelectAll(undefined, values);
        }
        setIsActive(values);
    }

    return (
        <ItemStyled disabled={props.disabled} isActive={!!isActive} onClick={handleClickItem}>
            {
                props.type === 'text' && props.children
            }
            {
                props.type === 'checkbox' && <Checkbox name={props.name} checked={isActive} label={props.children} onChange={handleChecked} />
            }
            {
                props.type === 'checkbox_master' && <Checkbox name={props.name} checked={props.active || isActive} label={isActive ? 'Desselecionar todos' : 'Selecionar todos'} onChange={handleChecked} />
            }
        </ItemStyled>
    );
};
