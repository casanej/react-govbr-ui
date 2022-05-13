import { CheckboxContext } from 'context';
import { Checkbox } from 'lib';
import { CheckTypes } from 'models';
import React, { ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { ItemStyled } from './index.style';

interface Props {
    children: React.ReactNode;
    name: string;
    type: 'text' | 'radio' | 'checkbox' | 'checkbox_master';
    disabled?: boolean;
    onClick?: (checked: CheckTypes) => void;
    onChange?: (checked: CheckTypes) => void;
}

export const Item = (props: Props): ReactElement => {
    const { handleSelectAll } = useContext(CheckboxContext);
    const [isActive, setIsActive] = useState<CheckTypes>(0);

    useEffect(() => {
        props.onChange && props.onChange(isActive);
    }, [isActive])

    const handleClickItem = useCallback(() => {
        if (props.type === 'checkbox') {
            if (isActive === 1) setIsActive(0);
            else setIsActive(1);
        }
    }, [props.type, isActive]);

    const handleChecked = (_: string, values: CheckTypes) => {
        if (props.type === 'checkbox_master') handleSelectAll && handleSelectAll();
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
                props.type === 'checkbox_master' && <Checkbox name={props.name} checked={isActive} label={isActive ? 'Desselecionar todos' : 'Selecionar todos'} onChange={handleChecked} />
            }
        </ItemStyled>
    );
};
