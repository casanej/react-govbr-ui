import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const InputSelectMenu = styled.div<{ ref: any; visibleRows: number; }>`
    position: absolute;
    left: 0;
    background-color: #fff;
    width: 100%;
    max-height: ${props => `${props.visibleRows * 50}px`};
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

    > div:not(:last-child) {
        border-bottom: 1px solid ${props => hexColorApplyAlpha('#333333', props.theme.properties.opacity.xs)};
    }
`