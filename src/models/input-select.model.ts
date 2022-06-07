export interface SelectItemProps {
    label: string;
    value: string;
    disabled?: boolean;
}

export type SelectSearchableProps = 'internal' | 'external';

export interface SearchOptions {
    minLength?: number;
    hiddenSelectAll?: boolean;
}