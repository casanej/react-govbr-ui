import { theme } from 'assets';
import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './assets/theme';

export const App:FC = () => {
    return <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>App</div>
    </ThemeProvider>;
};
