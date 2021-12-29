import styled, { css } from 'styled-components';

export const loadingSize = {
    sm: '22px',
    md: '44px',
}

export type LoadingVariant = 'primary' | 'secondary' | 'tertiary';

const handleLoadingVariant = (props: any) => {
    let foregroundColor = props.theme.colors.appScheme.button.primary.background;
    let loadingColor = 'white';

    switch (props.variant) {
    case 'primary':
        foregroundColor = props.theme.colors.appScheme.button.primary.background;
        loadingColor = 'white';
        break;
    case 'secondary':
    case 'tertiary':
        foregroundColor = props.theme.colors.appScheme.button.secondary.background;
        loadingColor = props.theme.colors.appScheme.colors.blue.warmVivid['70'];
        break;
    }

    return css`
        --fg: ${foregroundColor};
        --loadingColor: ${loadingColor};
        background: 
            radial-gradient(closest-side, var(--loadingColor) 89%, transparent 0 100%, var(--loadingColor) 0),
            conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0)
        ;
    `
}

interface LoadingStyledProps {
    variant: LoadingVariant;
    infinity: 'none' | keyof typeof loadingSize;
}

const handleLoadingSize = (props: LoadingStyledProps) => {
    if (props.infinity !== 'none') return loadingSize[props.infinity as keyof typeof loadingSize];

    return '84px';
}

export const LoadingStyled = styled.div<LoadingStyledProps>`
    @keyframes growProgressBar {
        0%, 33% { --pgPercentage: 0; }
        100% { --pgPercentage: var(--value); }
    }

    --size: ${props => handleLoadingSize(props)};
    --bg: transparent;
    --pgPercentage: var(--value);
    ${props => handleLoadingVariant(props)};
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: calc(var(--size) / 5);
    color: var(--fg);
    animation: growProgressBar 3s linear all;

    ${props => props.infinity !== 'none'
        ? css`
            @keyframes circular-loader {
                0%   { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            animation: circular-loader 2s linear infinite;
        `
        : css`
            &::before {
                counter-reset: percentage var(--value);
                content: counter(percentage) '%';
            }`

}
`;