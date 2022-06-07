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
    hidden?: boolean;
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
        if (typeof props.active === 'number') setIsActive(props.active);
    }, [props.active])

    useEffect(() => {
        if (firstRun) setFirstRun(false);
    }, [])

    const handleClickItem = useCallback((_: string, value: CheckTypes) => {
        if (props.type === 'checkbox_master') {
            if (handleSelectAll) handleSelectAll(undefined, value);
        }
        setIsActive(value);
    }, [props.type, isActive, handleSelectAll]);

    return (
        <ItemStyled disabled={props.disabled} isActive={isActive === 1} hidden={props.hidden} onClick={() => handleClickItem('', +!isActive as CheckTypes)}>
            {
                props.type === 'text' && props.children
            }
            {
                props.type === 'checkbox' && <Checkbox name={props.name} checked={isActive} label={props.children} onChange={handleClickItem} />
            }
            {
                props.type === 'checkbox_master' && <Checkbox name={props.name} checked={isActive} label={isActive ? 'Desselecionar todos' : 'Selecionar todos'} />
            }
        </ItemStyled>
    );
};
