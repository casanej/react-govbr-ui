import { IconName } from '@fortawesome/fontawesome-common-types';

export interface OnChangeValueParameter {
    normal: string;
    masked: string;
    item: unknown;
}

export interface InputTextButtonAction {
    icon: IconName;
    onClick: () => void;
    disabled?: boolean;
}

export type InputListParams = string | { label: string; [key: string]: string };

export type InputVariants = 'primary' | 'secondary' | 'tertiary';