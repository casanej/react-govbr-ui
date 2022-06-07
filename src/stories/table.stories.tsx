/* eslint-disable camelcase */
/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { Table } from 'lib';
import { PageObj, TableColumn, TableColumnAction, TableRow } from 'models';
import React, { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

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

    console.log('[PAGE SIZE]', 1 + pageObj.pageSize * (pageObj.page - 1) - 1, Math.min(pageObj.pageSize * pageObj.page, args.rows.length))

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

const actions: TableColumnAction[] = [
    { fn: () => console.log('action 1'), label: 'Action 1', icon: 'cog' },
    { fn: () => console.log('action 2'), label: 'Action 2', icon: <div>W</div> },
    { fn: () => console.log('action 3'), label: 'Action 3', icon: 'wrench' },
    { fn: () => console.log('action 4'), label: 'Action 3', icon: 'eye', disabled: true },
]

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

const tableColumns: TableColumn[] = [
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
    { title: 'Ações', accessor: 'actions' },
]

const tableColumnsWithOrder: TableColumn[] = [
    { title: 'Coluna 1', accessor: 'column1' },
    { title: 'Coluna 2', accessor: 'column2' },
    { title: 'Coluna 3 OR', accessor: 'column3' },
    { title: 'Coluna 4 OR', accessor: 'column4' },
    { title: 'Coluna 5', accessor: 'column5' },
    { title: 'Coluna 6', accessor: 'column6' },
    { title: 'Coluna 7', accessor: 'column7' },
    { title: 'Coluna 8', accessor: 'column8' },
    { title: 'Coluna 9', accessor: 'column9' },
    { title: 'Coluna 10', accessor: 'column10' },
]

const tableColumnsCustom: TableColumn[] = [
    { title: 'COLUNA 1', accessor: 'coluna1' },
    { title: 'COLUNA 2', accessor: 'coluna2', type: 'date' },
    { title: 'COLUNA 3', accessor: 'coluna3', type: 'date_time' },
    { title: 'COLUNA 4', accessor: 'coluna4' },
    { title: 'COLUNA 5', accessor: 'coluna5', type: 'custom', renderer: (value) => <div>{value.toString()}</div> },
    { title: 'COLUNA 6', accessor: 'coluna6', type: 'number'},
]

const tableRows: TableRow[] = [
    { id: '1', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 A', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '2', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 D', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '3', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 C', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '4', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 W', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '5', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 Z', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '6', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 J', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '7', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 L', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '8', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 F', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '9', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 Y', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '10', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 U', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '11', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '12', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '13', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '14', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '15', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '16', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '17', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '18', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '19', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '20', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '21', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '22', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '23', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '24', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '25', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
]

const tableRowsTypes: TableRow[] = [
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
]

Default.args = {
    columns: tableColumns,
    rows: tableRows,
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
    rows: tableRows,
    hasSelect: false,
    hasActions: true,
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
    columns: tableColumns,
    rows: tableRows,
    hasSelect: false,
    paginated: {
        type: 'uncontrolled',
    }
}

TableWithOrder.args = {
    columns: tableColumnsWithOrder,
    rows: tableRows,
    ordering: {
        type: 'external',
        columnsOrder: ['column3', 'column4'],
        onOrderChange: (key, values) => console.log('onOrderChange(lastKeyClicked, values) =>', key, values)
    }
}

TableWithSelectPaginatedControlled.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: true,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRows.length
    }
}

TableWithSelectPaginatedUncontrolled.args = {
    columns: tableColumns,
    rows: tableRows,
    hasSelect: true,
    paginated: {
        type: 'controlled',
        initialPage: 1,
        totalItems: tableRows.length
    }
}