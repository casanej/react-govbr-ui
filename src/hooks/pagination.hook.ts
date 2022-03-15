/* eslint-disable no-case-declarations */
interface PaginationReduceState {
    page: number;
    maxPages: number;
    totalItems: number;
    initialItem: number;
    finalItem: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type PaginationReduceActions =
    | { type: 'setPage'; payload: { page: number } }
    | { type: 'nextPage'; }
    | { type: 'previousPage'; }
    | { type: 'setPageSize'; payload: { pageSize: number } }
    | { type: 'setMaxPages'; payload: { pageSize: number } }
    | { type: 'setTotalItems'; payload: { totalItems: number } }

export const paginationInitialState: PaginationReduceState = {
    page: 1,
    pageSize: 10,
    maxPages: 1,
    totalItems: 1,
    initialItem: 1,
    finalItem: 10,
    total: 0,
    hasNext: false,
    hasPrev: false,
}

export const paginationReducer = (state: PaginationReduceState, action: PaginationReduceActions):PaginationReduceState => {
    switch (action.type) {
    case 'setPage':
        const newPage = action.payload.page;
        const newInitialItem = 1 + state.pageSize * (newPage - 1);
        const newFinalItem = state.pageSize * newPage > state.totalItems ? state.totalItems : state.pageSize * newPage;

        return {
            ...state,
            page: newPage,
            initialItem: newInitialItem,
            finalItem: newFinalItem,
            hasNext: newPage < state.maxPages,
            hasPrev: newPage > 1,
        }
    case 'nextPage':
        const nextPage = state.page + 1;

        if (nextPage > state.maxPages) return state;

        return paginationReducer(state, { type: 'setPage', payload: { page: nextPage } });
    case 'previousPage':
        const previousPage = state.page - 1;

        if (previousPage < 1) return state;

        return paginationReducer(state, { type: 'setPage', payload: { page: previousPage } });
    case 'setPageSize':
        const newPageSize = action.payload.pageSize;
        return {
            ...state,
            page: 1,
            initialItem: 1,
            finalItem: newPageSize > state.totalItems ? state.totalItems : newPageSize,
            pageSize: newPageSize,
            maxPages: Math.ceil(state.totalItems / newPageSize),
        }
    case 'setMaxPages':
        return {
            ...state,
            maxPages: Math.ceil(state.totalItems / state.pageSize),
        }
    case 'setTotalItems':
        const maxPages = Math.ceil(state.totalItems / state.pageSize);
        const totalItems = action.payload?.totalItems;
        return {
            ...state,
            totalItems,
            maxPages,
            hasNext: state.pageSize < totalItems,
            finalItem: totalItems < state.pageSize ? totalItems : state.pageSize,
        }
    default:
        return state
    }
}