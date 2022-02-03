import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface MenuContextItemProps {
    label: string;
    icon?: IconName;
    onClick?: () => void;
    url?: string;
}