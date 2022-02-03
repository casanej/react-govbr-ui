import React, { ReactElement, useCallback, useState } from 'react'
import { Checkbox } from 'lib';
import { ItemStyled } from './index.style';
import { CheckTypes } from '../checkbox/index.style';

interface Props {
    children: React.ReactNode;
    type: 'text' | 'radio' | 'checkbox';
    disabled?: boolean;
}

export const Item = (props: Props): ReactElement => {
    const [isActive, setIsActive] = useState<CheckTypes>(0);

    const handleClickItem = useCallback(() => {
        if (props.type === 'checkbox') {
            if (isActive === 1) setIsActive(0);
            else setIsActive(1);
        }
    }, [props.type, isActive]);

    const handleChecked = (_: string, values: CheckTypes) => {
        setIsActive(values);
    }

    return (
        <ItemStyled disabled={props.disabled} isActive={!!isActive} onClick={handleClickItem}>
            {
                props.type === 'text' && props.children
            }
            {
                props.type === 'checkbox' && <Checkbox checked={isActive} label={props.children} onChange={handleChecked} />
            }
        </ItemStyled>
    );
};
