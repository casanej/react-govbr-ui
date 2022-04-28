/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckboxRegisterObject } from 'models';
import React, { createContext, ReactElement } from 'react';

interface ICheckboxContext {
    handleCheckboxUpdate?: () => void;
    handleSelectAll?: (prefix?: string) => void;
    registerField?: (ref: CheckboxRegisterObject) => void;
}

const defaultState: ICheckboxContext = {}

export const CheckboxContext = createContext<ICheckboxContext>(defaultState);

interface Props {
    children: React.ReactNode;
}

export const CheckboxProvider = (props: Props): ReactElement => {

    return (
        <>{props.children}</>
    );
};
