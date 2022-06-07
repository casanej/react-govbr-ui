/* eslint-disable camelcase */
/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Table } from 'lib';
import { PageObj } from 'models';
import React, { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { tableColumns, tableColumnsCustom, tableColumnsWithOrder, tableRowsData1, tableRowsTypes } from 'utils';

interface LoadingExport extends ComponentMeta<typeof Table> {}
interface LoadingStory extends ComponentStory<typeof Table> {}

export default {
    title: 'Exibição de Dados/Table',
    component: Table,
    argTypes: {
        onPaginationChange: { action: 'onPaginationChange({ page, pageSize })' },
        onSelectChange: { action: 'onSelectChange(rows)' },
    },
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const isSmall = useMemo((): boolean => {
        const { search } = window.location;
        if (search.indexOf('table-small') > -1 || search.indexOf('table-with-select') > -1) return true;

        return false;
    }, [window.location.search])
    const [pageObj, setPageObj] = useState<PageObj>({ page: 1, pageSize: 10 });

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        {/* <button onClick={() => setPageObj(old => ({ ...old, page: old.page + 1 }))}>NEXT PAGE</button> */}
        {/* <button onClick={() => setPageObj(old => ({ ...old, page: old.page - 1 }))}>BACK PAGE</button> */}
        <div style={{height: '200vh', width: '100%', maxWidth: isSmall ? 1400 : 'auto', margin: '0 auto'}}>
            <Table
                columns={args.columns}
                rows={args.paginated && args.paginated.type === 'controlled'
                    ? args.rows.slice(1 + pageObj.pageSize * (pageObj.page - 1) - 1, Math.min(pageObj.pageSize * pageObj.page, args.rows.length))
                    : args.rows
                }
                isLoading={args.isLoading}
                hasActions={args.hasActions}
                hasSelect={args.hasSelect}
                ordering={args.ordering && {
                    ...args.ordering,
                    onOrderChange: args.ordering.onOrderChange
                }}
                onPaginationChange={(pageObj: PageObj) => { args.onPaginationChange && args.onPaginationChange(pageObj); setPageObj(pageObj) }}
                onSelectChange={args.onSelectChange}
                paging={pageObj}
                paginated={args.paginated}
                selectedItems={args.selectedItems}
                title={args.title}
            />
        </div>
    </ThemeProvider>
}

export const Default = Template.bind({});
export const TableEmpty = Template.bind({});
export const TableLoading = Template.bind({});
export const TablePaginatedControlled = Template.bind({});
export const TablePaginatedUncontrolled = Template.bind({});
export const TableSmall = Template.bind({});
export const TableCustom = Template.bind({});
export const TableWithActions = Template.bind({});
export const TableWithOrder = Template.bind({});
export const TableWithSelectPaginatedControlled = Template.bind({});
export const TableWithSelectPaginatedUncontrolled = Template.bind({});

Default.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: false,
}

TableCustom.args = {
    columns: tableColumnsCustom,
    rows: tableRowsTypes,
    hasSelect: false,
}

TableEmpty.args = {
    columns: tableColumns,
    rows: [],
    hasSelect: false
}

TableLoading.args = {
    columns: tableColumns,
    rows: [],
    isLoading: true,
    hasSelect: false
}

TableWithActions.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: false,
    hasActions: true,
}

TablePaginatedControlled.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: false,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRowsData1.length
    }
}

TablePaginatedUncontrolled.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
}

TableSmall.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
}

TableWithOrder.args = {
    columns: tableColumnsWithOrder,
    rows: tableRowsData1,
    ordering: {
        type: 'external',
        columnsOrder: ['column3', 'column4'],
        onOrderChange: (key, values) => console.log('onOrderChange(lastKeyClicked, values) =>', key, values)
    }
}

TableWithSelectPaginatedControlled.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: true,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRowsData1.length
    }
}

TableWithSelectPaginatedUncontrolled.args = {
    columns: tableColumns,
    rows: tableRowsData1,
    hasSelect: true,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRowsData1.length
    }
}