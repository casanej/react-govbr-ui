import { alertColorTypes, AlertTypes } from 'models';
import styled from 'styled-components';

export const AlertStyled = styled.div<{ type: AlertTypes }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    width: fit-content;
    min-width: 150px;
    padding: 5px;
    background-color: ${props => alertColorTypes[props.type].background};
    color: ${props => alertColorTypes[props.type].color};
    font-style: italic;
    font-weight: 500;
    font-size: 14px;
`;