import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { PalletModel, PalletsType, darkTheme, lightTheme, ThemePatternPallet, colors } from './pallets';
import { properties } from './properties';

export * from './pallets'

declare module 'styled-components' {
    export interface DefaultTheme {
        pallet: ThemePatternPallet;
        currentPallet: PalletModel;
        colors: typeof colors,
        properties: typeof properties,
        changePallet: (pallet: PalletsType) => PalletModel;
    }
}

interface GlobalStyleProps {
    readonly theme: PalletModel;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`

    @mixin for-max-size($range) {
        $boundary-xs: 599px;
        $boundary-sm: 600px;
        $boundary-md: 900px;
        $boundary-lg: 1200px;
        $boundary-xl: 1800px;

        @if $range == xs { @media (max-width: $boundary-xs) { @content; } }
        @else if $range == sm { @media (min-width: $boundary-sm) { @content; } }
        @else if $range == md { @media (min-width: $boundary-md) { @content; } }
        @else if $range == lg { @media (min-width: $boundary-lg) { @content; } }
        @else if $range == xl { @media (min-width: $boundary-xl) { @content; } }
    }

    * {
        margin: 0;
        padding: 0;
    }

    *, ::after, ::before {
        box-sizing: border-box;
    }
    
    body {
        background-color: ${props => props.theme.currentPallet.background.primary};
        color: ${props => props.theme.currentPallet.text.primary};
        font-family: "Rawline", "Roboto", sans-serif;
        font-size: 14px;
        width: 100%;
        height: 100vh;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
    }

    #root {
        overflow-x: hidden;
        position: relative;
        justify-content: flex-start;
        align-items: flex-start;
    }
`

export const theme = {
    pallet: {
        light: lightTheme,
        dark: darkTheme
    },
    currentPallet: lightTheme,
    colors,
    properties,
    changePallet: function(pallet: PalletsType) {
        switch (pallet) {
        case 'light': return lightTheme;
        case 'dark': return darkTheme;
        default: return lightTheme;
        }
    }
} as DefaultTheme