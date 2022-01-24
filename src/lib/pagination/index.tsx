import React, { ReactElement, useEffect, useReducer, useState } from 'react'
import { Divider, InputSelect } from 'lib';
import { PaginationLeftSide, PaginationRightSide, PaginationStyled } from './index.style';
import { paginationInitialState, paginationReducer } from 'hooks'

interface Props { }

export const Pagination = (props: Props): ReactElement => {
    const [state, dispatch] = useReducer(paginationReducer, paginationInitialState);

    return (
        <PaginationStyled>
            <PaginationLeftSide>
                <InputSelect
                    items={[]}
                />
                <Divider direction='vertical' />
                <div>SET LIST</div>
                <Divider direction='vertical' />
                <div>PÁGINA</div>
            </PaginationLeftSide>
            <PaginationRightSide></PaginationRightSide>
        </PaginationStyled>
    );
};
