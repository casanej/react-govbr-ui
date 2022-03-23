import styled from 'styled-components';
import { hexColorApplyAlpha } from 'utils';

export const HeaderLinksStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
`;

export const HeaderLink = styled.div`
    padding: 8px;
    color: #1351b4;

    &:hover {
        background-color: ${props => hexColorApplyAlpha('#1351b4', props.theme.properties.opacity.xs)}
    }

    &:focus-visible {
        outline-color: #c2850c;
        outline-style: dashed;
        outline-width: 4px;
        outline-offset: -4px;
    }
`;