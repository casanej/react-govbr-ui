import React, { ReactElement } from 'react'
import { DividerDirection, DividerStyled } from './index.style';

interface Props {
    direction?: DividerDirection
}

export const Divider = (props: Props): ReactElement => {

    return (
        <DividerStyled direction={props.direction || 'horizontal'} />
    );
};
