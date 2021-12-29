import React, { ReactElement, useEffect, useState } from 'react'
import { loadingSize, LoadingStyled, LoadingVariant } from './index.style';

interface Props {
    infinity?: 'none' | keyof typeof loadingSize;
    variant?: LoadingVariant;
    value?: number;
}

interface LoadingCSSProps extends React.CSSProperties {
    '--value': number;
}

export const Loading = (props: Props): ReactElement => {
    const [value, setValue] = useState<number>(0);
    const [infinity, setInfinity] = useState<'none' | keyof typeof loadingSize>('none')

    useEffect(() => {
        if (props.value && props.infinity === 'none') {
            if (props.value > 100) {
                setValue(100);
            } else if (props.value < 0) {
                setValue(0);
            } else {
                setValue(props.value);
            }
            setInfinity('none');
        } else {
            if (props.infinity) {
                setInfinity(props.infinity);

                if (props.infinity !== 'none') setValue(75);
            }
        }
    }, [props.value, props.infinity]);

    return (
        <LoadingStyled
            infinity={infinity}
            variant={props.variant || 'primary'}
            style={{
                '--value': value
            } as LoadingCSSProps}
        />
    );
};
