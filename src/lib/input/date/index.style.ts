import styled from 'styled-components';

export const InputDateStyled = styled.div<{ ref: any }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
`;

export const InputDatePickerMenu = styled.div<{ activeMonths: number; isOpen: boolean; }>`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 63px;
    left: 0;
    gap: 5px;
    background-color: #fff;
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
    grid-template-columns: repeat(${ props => props.activeMonths}, 350px);
    grid-gap: 0 64px;
`;