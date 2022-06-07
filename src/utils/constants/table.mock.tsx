/* eslint-disable no-console */
import { TableColumn, TableColumnAction, TableRow } from 'models';
import React from 'react';

const actions: TableColumnAction[] = [
    { fn: () => console.log('action 1'), label: 'Action 1', icon: 'cog' },
    { fn: () => console.log('action 2'), label: 'Action 2', icon: <div>W</div> },
    { fn: () => console.log('action 3'), label: 'Action 3', icon: 'wrench' },
    { fn: () => console.log('action 4'), label: 'Action 3', icon: 'eye', disabled: true },
]

export const tableColumns: TableColumn[] = [
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

export const tableColumnsWithOrder: TableColumn[] = [
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

export const tableColumnsCustom: TableColumn[] = [
    { title: 'COLUNA 1', accessor: 'coluna1' },
    { title: 'COLUNA 2', accessor: 'coluna2', type: 'date' },
    { title: 'COLUNA 3', accessor: 'coluna3', type: 'date_time' },
    { title: 'COLUNA 4', accessor: 'coluna4' },
    { title: 'COLUNA 5', accessor: 'coluna5', type: 'custom', renderer: (value) => <div>{value.toString()}</div> },
    { title: 'COLUNA 6', accessor: 'coluna6', type: 'number'},
]

export const tableRowsData1: TableRow[] = [
    { id: '1', column1: 'Valor 1', column2: 'Valor 2', column3: 'Valor 3 A', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '2', column1: 'Valor 2', column2: 'Valor 2', column3: 'Valor 3 D', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '3', column1: 'Valor 3', column2: 'Valor 2', column3: 'Valor 3 C', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '4', column1: 'Valor 4', column2: 'Valor 2', column3: 'Valor 3 W', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '5', column1: 'Valor 5', column2: 'Valor 2', column3: 'Valor 3 Z', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '6', column1: 'Valor 6', column2: 'Valor 2', column3: 'Valor 3 J', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '7', column1: 'Valor 7', column2: 'Valor 2', column3: 'Valor 3 L', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '8', column1: 'Valor 8', column2: 'Valor 2', column3: 'Valor 3 F', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '9', column1: 'Valor 9', column2: 'Valor 2', column3: 'Valor 3 Y', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '10', column1: 'Valor 10', column2: 'Valor 2', column3: 'Valor 3 U', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '11', column1: 'Valor 11', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '12', column1: 'Valor 12', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '13', column1: 'Valor 13', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '14', column1: 'Valor 14', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '15', column1: 'Valor 15', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '16', column1: 'Valor 16', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '17', column1: 'Valor 17', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '18', column1: 'Valor 18', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '19', column1: 'Valor 19', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '20', column1: 'Valor 20', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '21', column1: 'Valor 21', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '22', column1: 'Valor 22', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '23', column1: 'Valor 23', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '24', column1: 'Valor 24', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
    { id: '25', column1: 'Valor 25', column2: 'Valor 2', column3: 'Valor 3', column4: 'Valor 4', column5: 'Valor 5', column6: 'Valor 6', column7: 'Valor 7', column8: 'Valor 8', column9: 'Valor 9', column10: 'Valor 10', actions },
]

export const tableRowsTypes: TableRow[] = [
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
    { coluna5: ['teste/22', true, undefined], coluna2: '2022-02-22T12:22:39.036846', coluna3: '2022-02-22T00:00:00', coluna6: 4, coluna4: 0, coluna1: 'XXXXX/22' },
]