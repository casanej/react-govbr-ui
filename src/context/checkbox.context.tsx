/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactElement, useEffect, useState } from 'react';

interface ICheckboxContext {
    handleCheckboxUpdate?: () => void;
    registerField?: (ref: HTMLInputElement) => void;
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
