import { IconName } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export type MenuItemsProps = MenuItemGroup | MenuItem;

export type MenuTypes = 'item' | 'item_external' | 'expand' | 'label' | 'divider' | 'evident';

export interface MenuItemGroup {
    label: React.ReactNode;
    groupType: 'expand' | 'label' | 'divider' | 'evident';
    subItems: MenuItemsProps[];
    disabled?: boolean;
    icon?: IconName;
}

export interface MenuItem {
    label: React.ReactNode;
    groupType: 'item' | 'item_external';
    url: string;
    disabled?: boolean;
    icon?: IconName;
}

export interface MenuHeaderProps {
    logo?: React.ReactNode;
    title?: React.ReactNode;
}

export interface MenuFooterProps {
    external?: Array<{
        url: string;
        label: string;
    }>;
    info?: React.ReactNode[]
    logos?: React.ReactNode[]
    social?: {
        title: string;
        links: Array<{
            icon: IconName;
            url: string;
        }>
    }
}

export interface MenuFunctionalities {
    icon: IconName;
    label: string;
    url?: string;
    onClick?: () => void;
}

export interface MenuLoggedActions {
    logout: () => void;
}