/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckboxRegisterObject, CheckTypes } from 'models';
import React, { createContext, ReactElement } from 'react';

interface ICheckboxContext {
    selectAllValue: CheckTypes;
    handleCheckboxUpdate?: () => void;
    handleSelectAll?: (prefix?: string, active?: CheckTypes) => void;
    registerField?: (ref: CheckboxRegisterObject) => void;
}

const defaultState: ICheckboxContext = {
    selectAllValue: 0,
}

export const CheckboxContext = createContext<ICheckboxContext>(defaultState);

interface Props {
    children: React.ReactNode;
}

export const CheckboxProvider = (props: Props): ReactElement => {

    return (
        <>{props.children}</>
    );
};
