import styled, { css } from 'styled-components';

export type DayTypeSelect = 'none' | 'selected_start_or_end' | 'selected_between' | 'selecting_hover' | 'disabled' | 'holiday' | 'busy';

const handleTypesSelect = (type: DayTypeSelect) => {
    if (type === 'disabled') return css`
        color: #333;
        background-color: #fff;
        cursor: not-allowed;
    `;

    if (type === 'selected_start_or_end') return css`
        color: #fff;
        background-color: #2670e8;
    `;

    if (type === 'selected_between' || type === 'selecting_hover') return css`
        color: #fff;
        background-color: #92b7f3;
    `;

    return css`
        color: #1351b4;
        background-color: #fff;

        &:hover {
            background-color: rgba(19, 81, 180, .16);
        }
    `;
}

export const DayButton = styled.button<{ typeSelect: DayTypeSelect }>`
    padding: 8px;
    border: 0;
    font-weight: bold;
    font-size: 1.1em;
    cursor: pointer;
    
    ${props => handleTypesSelect(props.typeSelect)}        
`;