/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';
import { PageObj, TableActions, TableColumn, TableRow } from 'models';

interface LoadingExport extends ComponentMeta<typeof Table> {}
interface LoadingStory extends ComponentStory<typeof Table> {}

export default {
    title: 'Exibição de Dados/Table',
    component: Table,
} as LoadingExport;

const Template: LoadingStory = (args) => {
    const isSmall = useMemo((): boolean => {
        const { search } = window.location;
        if (search.indexOf('table-small') > -1) return true;

        return false;
    }, [window.location.search])
    const [pageObj, setPageObj] = useState<PageObj>({ page: 1, pageSize: 10, initialItem: 1, finalItem: 10 });

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <div style={{height: '200vh', width: '100%', maxWidth: isSmall ? 1400 : 'auto', margin: '0 auto'}}>
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
export const TableSmall = Template.bind({});
export const TableCustom = Template.bind({});
export const TableWithActions = Template.bind({});

const tableColumns: TableColumn[] = [
    { title: 'Coluna 1', accessor: 'column1', type: 'custom', renderer: (value: string | number) => <div style={{backgroundColor: 'red'}}>{value}</div> },
    { title: 'Coluna 2', accessor: 'column2', type: 'money' },
    { title: 'Coluna Muito Muito Grande 3', accessor: 'column3', type: 'number' },
    { title: 'Coluna 4', accessor: 'column4', type: 'money_min' },
    { title: 'Coluna Muito Grande 5', accessor: 'column5', type: 'number_min' },
    { title: 'Coluna Grande 6', accessor: 'column6' },
    { title: 'Coluna 7', accessor: 'column7' },
    { title: 'Coluna 8', accessor: 'column8' },
    { title: 'Coluna 9', accessor: 'column9' },
    { title: 'Coluna Final Muito Muito Grande 10', accessor: 'column10' },
]

const tableColumnsCustom: TableColumn[] = [
    { title: 'TABLE_NUM_SOLICITATION', accessor: 'column1'},
    { title: 'TABLE_DATE_CREATION', accessor: 'column2'},
    { title: 'TABLE_DATE_SOLICITATION', accessor: 'column3'},
    { title: 'TABLE_GENERATED_ORDERS', accessor: 'column4'},
    { title: 'TABLE_REQUESTED_BENEFITS', accessor: 'column5'},
    { title: 'TABLE_SITUATION', accessor: 'column6'},
]

const tableRows: TableRow[] = [
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

const tableRowsTypes: TableRow[] = [
    {
        column1: { value: 'Valor 1' },
        column2: { value: '1000000' },
        column3: { value: '333333.99' },
        column4: { value: '333333.66' },
        column5: { value: '1000000' },
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

TableCustom.args = {
    columns: tableColumns,
    rows: tableRowsTypes,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
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

TableSmall.args = {
    columns: tableColumnsCustom,
    rows: tableRows,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
}