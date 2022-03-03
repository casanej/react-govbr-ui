import { ReactNode } from 'react';

export interface HeaderLinkProps {
    label: string;
    url: string;
    external?: boolean;
}

export interface HeaderLoginProps {
    avatar?: string;
    name: string;
    menuContent?: ReactNode;
}

export interface HeaderLogoProps {
    image: ReactNode,
    url: string;
    signature?: string;
}