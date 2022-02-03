import styled from 'styled-components';
import { cssDefaultActions } from 'utils';

export const MenuContextItemStyled = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    text-align: center;
    cursor: pointer;

    color: #1351b4;

    ${cssDefaultActions('#1351B4')}
`;