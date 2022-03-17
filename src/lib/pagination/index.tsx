import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paginationInitialState, paginationReducer } from 'hooks';
import { Button, Divider, InputSelect } from 'lib';
import { PageObj, SelectItemProps } from 'models';
import React, { ReactElement, useEffect, useMemo, useReducer } from 'react';
import { PaginationSizeSelect } from './components';
import { PaginationActionsButtons, PaginationContentInput, PaginationLeftSide, PaginationRightSide, PaginationStyled } from './index.style';

interface Props {
    initialPage: number;
    totalItems: number;
    onChange?: (pageObj: PageObj) => void;
    variant?: 1 | 2 | 3;
}

export const Pagination = (props: Props): ReactElement => {
    const [state, dispatch] = useReducer(paginationReducer, paginationInitialState);

    useEffect(() => {
        dispatch({ type: 'setTotalItems', payload: { totalItems: props.totalItems } });
        dispatch({ type: 'setPageSize', payload: { pageSize: 10 } });
    }, [props.totalItems]);

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

    const handlePreviousPage = () => { dispatch({ type: 'previousPage' }) };
    const handleNextPage = () => { dispatch({ type: 'nextPage' }) };

    if (props.variant === 2) return <PaginationStyled>
        <PaginationLeftSide>
            <div>Exibir</div>
            <PaginationContentInput>
                <PaginationSizeSelect
                    selectedItem={{ label: state.pageSize.toString(), value: state.pageSize.toString() }}
                    onChange={(item) => dispatch({ type: 'setPageSize', payload: { pageSize: parseInt(item.value || '10') } })}
                />
            </PaginationContentInput>
            <Divider direction='vertical' />
            <div>{state.initialItem}-{state.finalItem} de {state.totalItems} itens</div>
        </PaginationLeftSide>
        <PaginationRightSide>
            <div>Página</div>
            <PaginationContentInput>
                <InputSelect
                    inputVariant='tertiary'
                    items={mountedMaxPages.map(i => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                    selectedItems={[{ label: state.page.toString(), value: state.page.toString() }]}
                    onChange={handleChangePage}
                />
            </PaginationContentInput>
            <Divider direction='vertical' />
            <PaginationActionsButtons>
                <Button variant='tertiary' circle onClick={handlePreviousPage}><FontAwesomeIcon icon={faChevronLeft} color='#1351B4' /></Button>
                <Button variant='tertiary' circle onClick={handleNextPage}><FontAwesomeIcon icon={faChevronRight} color='#1351B4' /></Button>
            </PaginationActionsButtons>
        </PaginationRightSide>
    </PaginationStyled>;

    return (
        <PaginationStyled>
            <PaginationLeftSide>
                <div>Exibir</div>
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
                        inputVariant='tertiary'
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
