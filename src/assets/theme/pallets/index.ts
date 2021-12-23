export * from './dark'
export * from './light'
export * from './colors'

export type PalletsType = 'light' | 'dark';

export interface ThemePatternPallet {
    light: PalletModel;
    dark: PalletModel;
}

interface PalletModelButton {
    default: string;
    text: string;
    border?: string;
}

export interface PalletModel {
    text: {
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        info: string;
        light: string;
        dark: string;
    };
    background: {
        primary: string;
        primaryGradient: string;
        secondary: string;
    };
    button: {
        primary: PalletModelButton;
        secondary: PalletModelButton;
        success: PalletModelButton;
        danger: PalletModelButton;
        info: PalletModelButton;
        light: PalletModelButton;
        dark: PalletModelButton;
    }
}