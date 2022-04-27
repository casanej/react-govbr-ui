import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const InputSelectStyled = styled.div<{ ref: any; fullWidth?: boolean; }>`
    position: relative;

    ${props => props.fullWidth && 'width: 100%'}
`

export const InputSelectContent = styled.div<{ ref: any }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const InputSelectMenu = styled.div<{ ref: any; gapTop: number; visibleRows: number; }>`
    position: absolute;
    top: ${props => `${props.gapTop}px`};
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