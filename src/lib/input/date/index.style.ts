import styled from 'styled-components';
import { InputText } from 'lib';

export const InputDateStyled = styled.div<{ activeMonths: number }>`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 5px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
    width: calc(350px * ${ props => props.activeMonths} + 68px * (${ props => props.activeMonths} - 1));
`;

export const InputDateActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    gap: 10px;
`;

export const InputDateYearSelect = styled.div`
    width: 150px;
`;

export const InputDateMenu = styled.div<{ activeMonths: number }>`
    display: grid;
    margin: 32px 0 0;
    grid-template-columns: repeat(${ props => props.activeMonths}, 350px);
    grid-gap: 0 64px;
`;