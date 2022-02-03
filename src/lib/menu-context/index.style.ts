import styled from 'styled-components';

export interface OffsetPosition {
    x: number;
    y: number;
}

export const MenuContextStyled = styled.div<{ isOpen: boolean; offset: OffsetPosition; ref: any }>`
    position: absolute;
    top: ${props => props.offset.y}px;
    right: ${props => props.offset.x}px;
    display: ${props => props.isOpen ? 'inline-block' : 'none'};
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    width: max-content;
    max-width: 200px;
    box-shadow: 0px 0px 6px 2px lightgrey;
`;

export const MenuContextTitle = styled.div`
    font-weight: bold;
    min-width: 150px;
    padding: 10px;
    text-align: center;
`;