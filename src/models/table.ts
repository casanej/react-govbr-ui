import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface TableActions {
    icon: IconName;
    label: string;
    fn: () => void;
}