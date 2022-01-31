import styled from 'styled-components';

export type InputTextLabelDirection = 'row' | 'column';

export const InputLabel = styled.label<{ direction: InputTextLabelDirection }>`
    line-height: ${props => props.theme.properties.lineHeight.medium};
    font-size: 14px;
    font-weight: 600;
    width: ${props => props.direction === 'row' ? '150px' : 'inherit'};
`