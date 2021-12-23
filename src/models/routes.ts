import { ReactNode } from 'react';
import { iconNames } from 'components';

export interface RouteObj {
    title: string;
    path: string;
    reactPath: string;
    component: ReactNode | ReactNode[];
    icon?: keyof typeof iconNames;
    showOnSidebar?: boolean;
    showOnFooter?: boolean;
}