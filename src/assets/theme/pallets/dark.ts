import { PalletModel } from '.';

const colorBlack = '#191923';
const colorWhite = '#E5E5E5';

export const darkTheme: PalletModel = {
    text: {
        primary: colorWhite,
        secondary: '',
        success: '',
        danger: '',
        info: '',
        light: colorWhite,
        dark: colorBlack
    },
    background: {
        primary: '#191923',
        primaryGradient: 'linear-gradient(to bottom, #18191a, #12263c, #143160, #353781, #663399);',
        secondary: '#7D7484',
    },
    button: {
        primary: {
            default: '',
            text: ''
        },
        secondary: {
            default: '',
            text: ''
        },
        success: {
            default: '',
            text: ''
        },
        danger: {
            default: '',
            text: ''
        },
        info: {
            default: '',
            text: ''
        },
        light: {
            default: '',
            text: ''
        },
        dark: {
            default: '',
            text: ''
        },
    }
};