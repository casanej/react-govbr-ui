import React, { ReactElement, useEffect, useMemo, useReducer } from 'react'
import { Divider, InputSelect } from 'lib';
import { PaginationContentInput, PaginationLeftSide, PaginationRightSide, PaginationStyled } from './index.style';
import { paginationInitialState, paginationReducer } from 'hooks'
import { PageObj, SelectItemProps } from 'models';
import { PaginationSizeSelect } from './components';

interface Props {
    initialPage: number;
    totalItems: number;
    onChange?: (pageObj: PageObj) => void;
}

export const Pagination = (props: Props): ReactElement => {
    const [state, dispatch] = useReducer(paginationReducer, paginationInitialState);

    useEffect(() => {
        dispatch({ type: 'setTotalItems', payload: { totalItems: props.totalItems } });
        dispatch({ type: 'setPageSize', payload: { pageSize: 10 } });
    }, []);

    useEffect(() => {
        if (props.onChange) props.onChange({
            page: state.page,
            pageSize: state.pageSize,
            initialItem: state.initialItem,
            finalItem: state.finalItem,
        });
    }, [state.page, state.pageSize]);

    const mountedMaxPages = useMemo(() => {
        return Array.from(Array(state.maxPages).keys())
    }, [state.maxPages]);

    const handleChangePage = (item: SelectItemProps[]) => {
        const page: string = item[0]?.value || '1';
        dispatch({ type: 'setPage', payload: { page: parseInt(page) } });
    }

    return (
        <PaginationStyled>
            <PaginationLeftSide>
                <PaginationContentInput>
                    <PaginationSizeSelect
                        selectedItem={{ label: state.pageSize.toString(), value: state.pageSize.toString() }}
                        onChange={(item) => dispatch({ type: 'setPageSize', payload: { pageSize: parseInt(item.value || '10') } })}
                    />
                </PaginationContentInput>
                <Divider direction='vertical' />
                <div>{state.initialItem}-{state.finalItem} de {state.totalItems} itens</div>
                <Divider direction='vertical' />
                <div>Página</div>
                <PaginationContentInput>
                    <InputSelect
                        items={mountedMaxPages.map(i => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                        selectedItems={[{ label: state.page.toString(), value: state.page.toString() }]}
                        onChange={handleChangePage}
                    />
                </PaginationContentInput>
            </PaginationLeftSide>
            <PaginationRightSide></PaginationRightSide>
        </PaginationStyled>
    );
};
