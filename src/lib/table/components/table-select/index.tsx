import React, { FC, useContext, useMemo } from 'react';
import { TableContext } from '../..';
import { TableSelectStyled } from './index.style';

export const TableSelect:FC = () => {
    const { numRowsSelected } = useContext(TableContext);

    const textSelected = useMemo(() => {
        if (numRowsSelected > 1) return `${numRowsSelected} itens selecionados`

        return `${numRowsSelected} item selecionado`
    }, [numRowsSelected]);

    if (numRowsSelected === 0) return null;

    return <TableSelectStyled>
        <div>{textSelected}</div>
        <div></div>
    </TableSelectStyled>;
};
