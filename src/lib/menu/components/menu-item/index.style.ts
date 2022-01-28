import styled from 'styled-components';

export type MenuItemVariant = 'primary' | 'secondary';

const menuItemBgColorVariant = {
    primary: '#fff',
    secondary: '#f5f5f5',
}

export const menuItemDensity = {
    lg: '16px',
    sm: '8px'
}

export const MenuItemStyled = styled.div<{ variant: MenuItemVariant; density: keyof typeof menuItemDensity }>`
    padding: ${props => menuItemDensity[props.density]} 16px;
    color: #1351b4;
    cursor: pointer;
    background-color: ${props => menuItemBgColorVariant[props.variant]};
    padding-left: ${props => props.variant === 'secondary' ? '40px' : '20px'};
    width: 100%;

    &:hover {
        background-color: rgba(19, 81, 180, .15);
    }

    &:active {
        background-color: rgba(19, 81, 180, .45);
    }

    &:focus-visible {
        outline-color: #c2850c;
        outline-style: dashed;
        outline-width: -4px;
        outline-offset: -4px;
    }
`;

export const MenuItemContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;

    > div {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;

export const MenuItemLabel = styled.div``;