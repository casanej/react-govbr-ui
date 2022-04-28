import { Dispatch, SetStateAction } from 'react';

export type CheckTypes = 0 | 1 | 2;

export interface CheckboxRegisterObject {
    name: string;
    setValue: Dispatch<SetStateAction<CheckTypes>>
    checked: CheckTypes;
}