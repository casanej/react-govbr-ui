import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';
import { PageObj, TableActions } from 'models';

interface LoadingExport extends ComponentMeta<typeof Table> {}
interface LoadingStory extends ComponentStory<typeof Table> {}

export default {
    title: 'Exibição de Dados/Table',
    component: Table,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const [pageObj, setPageObj] = useState<PageObj>({ page: 1, pageSize: 10, initialItem: 1, finalItem: 10 });

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <div style={{height: '200vh'}}>
            <Table
                columns={args.columns}
                rows={args.paginated && args.paginated.type === 'controlled'
                    ? args.rows.slice(pageObj.initialItem - 1, pageObj.finalItem)
                    : args.rows
                }
                actions={args.actions}
                hasSelect={args.hasSelect}
                paginated={args.paginated}
                onPaginationChange={(pageObj: PageObj) => setPageObj(pageObj)}
            />
        </div>
    </ThemeProvider>
}

const actions: TableActions[] = [
    { fn: () => console.log('action 1'), label: 'Action 1', icon: 'cog' },
    { fn: () => console.log('action 2'), label: 'Action 2', icon: 'wrench' },
    { fn: () => console.log('action 3'), label: 'Action 3', icon: 'cog' },
]

export const Default = Template.bind({});
export const TablePaginatedControlled = Template.bind({});
export const TablePaginatedUncontrolled = Template.bind({});
export const TableWithActions = Template.bind({});

const tableColumns = [
    { title: 'Coluna 1', accessor: 'column1' },
    { title: 'Coluna 2', accessor: 'column2' },
    { title: 'Coluna Muito Muito Grande 3', accessor: 'column3' },
    { title: 'Coluna 4', accessor: 'column4' },
    { title: 'Coluna Muito Grande 5', accessor: 'column5' },
    { title: 'Coluna Grande 6', accessor: 'column6' },
    { title: 'Coluna 7', accessor: 'column7' },
    { title: 'Coluna 8', accessor: 'column8' },
    { title: 'Coluna 9', accessor: 'column9' },
    { title: 'Coluna Final Muito Muito Grande 10', accessor: 'column10' },
]

const tableRows = [
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
    {
        column1: { value: 'Valor 1' },
        column2: { value: 'Valor 2' },
        column3: { value: 'Valor 3' },
        column4: { value: 'Valor 4' },
        column5: { value: 'Valor 5' },
        column6: { value: 'Valor 6' },
        column7: { value: 'Valor 7' },
        column8: { value: 'Valor 8' },
        column9: { value: 'Valor 9' },
        column10: { value: 'Valor 10' },
    },
]

Default.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: false,
}

TableWithActions.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: false,
    actions
}

TablePaginatedControlled.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: false,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRows.length
    }
}

TablePaginatedUncontrolled.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
}