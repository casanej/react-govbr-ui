export const convertPercentageToAlpha = (value: number) => {
    const decimalValue = Math.round(value * 255);
    let hexValue = '00';

    if (value < 0.07) {
        hexValue = '0' + decimalValue.toString(16).toUpperCase();
    } else {
        hexValue = decimalValue.toString(16).toUpperCase();
    }

    return hexValue;
}