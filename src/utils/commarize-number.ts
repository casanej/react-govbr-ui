export const formatNumber = (normalValue: number | string, format = 'text', min = 1e3) => {
    const formattedValue = typeof normalValue === 'number' ? normalValue : parseFloat(normalValue);

    if (format === 'number') return [new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2}).format(formattedValue)]
    if (format === 'money') return [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(formattedValue)]

    if (normalValue >= min) {
        const units = ['k', 'M', 'B', 'T']

        const order = Math.floor(Math.log(formattedValue) / Math.log(1000))

        const unitName = units[order - 1]
        const num = formattedValue / 1000 ** order

        if (format === 'money_min') {
            const numFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(parseFloat(num.toFixed(2)))
            return `${numFormatted} ${unitName}`
        }

        return `${num.toFixed(formattedValue % 1 === 0 ? 0 : 2)} ${unitName}`
    }

    return [formattedValue]
}