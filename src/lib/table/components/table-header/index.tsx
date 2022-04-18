import React, { FC, useContext } from 'react';
import { TableHeaderContent } from '..';
import { TableContext } from '../..';
import { TableHeaderStyled, TableTitle } from './index.style';

export const TableHeader:FC = () => {
    const { hasSearch, title } = useContext(TableContext);

    if (hasSearch && title) return null;

    return <TableHeaderStyled>
        { title && <TableTitle>{title}</TableTitle> }
        { hasSearch && <TableHeaderContent hasSearch={hasSearch} /> }
    </TableHeaderStyled>;
};
