import styled from 'styled-components';

export const HeaderLoginStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const HeaderMenuLoggedIn = styled.div<{ ref: any; open: boolean; }>`
    display: ${props => props.open ? 'block' : 'none'};
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.14), 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 12px 12px 0 rgba(0, 0, 0, 0.10);
    padding: 15px;
    width: fit-content;
    min-width: 200px;
`;