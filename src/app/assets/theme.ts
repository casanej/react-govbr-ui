import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    * {
        margin: 0;
        padding: 0;
    }

    *, ::after, ::before {
        box-sizing: border-box;
    }
    
    body {
        font-family: "Rawline", "Raleway", sans-serif;
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
        min-height: 100%;
        padding: 10px;
    }
`