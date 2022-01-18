interface PaginationReduceState {
    page: number;
    limit: number;
    limits: number[];
    total: number;
    pages: number;
    next: number;
    prev: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export enum PaginationReduceActions {
    NEXT_PAGE = 'NEXT_PAGE',
    PREVIOUS_PAGE = 'PREVIOUS_PAGE',
    SET_LIMITS = 'SET_LIMITS',
}

export const paginationInitialState: PaginationReduceState = {
    page: 1,
    limit: 10,
    limits: [10, 20, 30],
    total: 0,
    pages: 0,
    next: 1,
    prev: 1,
    hasNext: false,
    hasPrev: false,
}

export const paginationReducer = (state: PaginationReduceState, action: PaginationReduceActions) => {
    switch (action) {
    case PaginationReduceActions.NEXT_PAGE:
        return {
            ...state,
            page: state.next,
            hasNext: state.next < state.pages,
        }
    case PaginationReduceActions.PREVIOUS_PAGE:
        return {
            ...state,
            page: state.prev,
            hasPrev: state.prev > 1,
        }
    case PaginationReduceActions.SET_LIMITS:
        return {
            ...state,
            limits: state.limits,
        }
    default:
        return state
    }
}