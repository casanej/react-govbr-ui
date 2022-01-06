export type AlertTypes = 'success' | 'info' | 'warning' | 'error';

export const alertColorTypes: { [key: string]: { background: string; color: string; } } = {
    success: {
        background: '#168821',
        color: '#fff'
    },
    info: {
        background: '#155bcb',
        color: '#fff'
    },
    warning: {
        background: '#ffcd07',
        color: '#000'
    },
    error: {
        background: '#e52207',
        color: '#fff'
    },
}