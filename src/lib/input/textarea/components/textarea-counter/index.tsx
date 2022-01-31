import React, { ReactElement } from 'react'
import { TextAreaCounterStyled } from './index.style';

interface Props {
    charsLen?: any;
    maxLength?: number;
}

export const TextAreaCounter = (props: Props): ReactElement => {
    return <TextAreaCounterStyled>{
        props.maxLength && props.maxLength !== 0
            ? <>
                {
                    props.maxLength > 0 && props.charsLen === 0
                        ? <div>Limite máximo de <span>{props.maxLength}</span> caracteres</div>
                        : <div>Restam <span>{props.maxLength - props.charsLen}</span> caracteres</div>
                }
            </>
            : <div><span>{props.charsLen}</span> caracteres digitados</div>
    }</TextAreaCounterStyled>;
};
