import { css } from 'styled-components';
import { hexColorApplyAlpha } from '.';

export const cssDefaultActions = (color: string) => {
    return css`
        &:hover {
            background-color: ${hexColorApplyAlpha(color, 0.16)};
        }

        &:active {
            background-color: ${hexColorApplyAlpha(color, 0.45)};
        }

        &:focus-visible {
            outline-color: #c2850c;
            outline-style: dashed;
            outline-width: 4px;
            outline-offset: -4px;
        }
    `
}