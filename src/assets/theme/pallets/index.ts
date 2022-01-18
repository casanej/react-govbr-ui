export * from './dark'
export * from './light'
export * from './colors'

export type PalletsType = 'light' | 'dark';

export interface ThemePatternPallet {
    light: PalletModel;
    dark: PalletModel;
}

export interface PalletModel {
    table: {
        header: {
            background: {
                primary: string;
                hover: string;
            },
            text: {
                primary: string;
            }
        },
        body: {
            background: {},
            tr: {
                hover: string;
            }
            text: {},
        }
    },
    text: {
        primary: string;
    };
    background: {
        primary: string;
    };
}