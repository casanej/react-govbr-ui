import React, { ReactElement } from 'react'
import { HeaderLogoProps } from 'models';
import { HeaderLogoImg, HeaderLogoSignature, HeaderLogoStyled } from './index.style';
import { Divider } from 'lib';
import { useWindowSize } from 'hooks';

interface Props {
    logo: HeaderLogoProps;
    compact?: boolean;
}

export const HeaderLogo = (props: Props): ReactElement => {
    const { width } = useWindowSize();
    return <HeaderLogoStyled to={props.logo.url} compact={props.compact || false}>
        <HeaderLogoImg>{props.logo.image}</HeaderLogoImg>
        {
            !props.compact && props.logo.signature && width >= 672 && <>
                <Divider direction='vertical' />
                <HeaderLogoSignature>{props.logo.signature}</HeaderLogoSignature>
            </>
        }
    </HeaderLogoStyled>;
};
