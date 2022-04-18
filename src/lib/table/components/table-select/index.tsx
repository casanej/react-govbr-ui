import React, { FC, useContext } from 'react';
import { TableContext } from '../..';

export const TableSelect:FC = () => {
    const { numRowsSelected } = useContext(TableContext);

    return <div>TableSelect - {numRowsSelected}</div>;
};
