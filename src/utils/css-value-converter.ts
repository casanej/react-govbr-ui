export const hexColorApplyAlpha = (color: string, percentage: number): string => {
    const decimalValue = Math.round(percentage * 255);
    let hexValue = '00';

    if (percentage < 0.07) {
        hexValue = '0' + decimalValue.toString(16).toUpperCase();
    } else {
        hexValue = decimalValue.toString(16).toUpperCase();
    }

    return `${color}${hexValue}`;
}