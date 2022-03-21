import { IconName } from '@fortawesome/fontawesome-common-types';

export interface OnChangeValueParameter {
    normal: string;
    masked: string;
}

export interface InputTextButtonAction {
    icon: IconName;
    onClick: () => void;
    disabled?: boolean;
}

export type InputVariants = 'primary' | 'secondary' | 'tertiary';