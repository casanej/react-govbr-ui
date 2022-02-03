const boundary = {
    xs: 599,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800
}

type BoundaryKeys = keyof typeof boundary;

export const maxSizeBoundary = (boundary: BoundaryKeys, rule: any) => {
    if (boundary === 'xs') return rule;
    else if (boundary === 'sm') return rule;
    else if (boundary === 'md') return rule;
    else if (boundary === 'lg') return rule;
    else if (boundary === 'xl') return rule;

    return '';
}