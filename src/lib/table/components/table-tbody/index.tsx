import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox } from 'lib';
import { TableActions } from 'models';
import React, { ReactElement } from 'react'
import { TableBody, TableBodyTr, TableTd, TableTdActions } from './index.style';

interface Props {
    rows: Array<any>;
    actions?: TableActions[];
    hasSelect?: boolean;
    onSelectRow?: (e: any) => void;
}

export const TableTBody = (props: Props): ReactElement => {

    return <TableBody>
        {
            props.rows.map((row: any, index) => <TableBodyTr key={`table-row-${index}`}>
                {
                    props.hasSelect && <TableTd width={'50px'}>
                        <Checkbox name={`table-row-${index}`} onChange={props.onSelectRow} />
                    </TableTd>
                }
                {
                    Object.keys(row).map((key: string) => <TableTd key={key}>{row[key].value}</TableTd>)
                }
                {
                    props.actions && <TableTd>
                        <TableTdActions>
                            {
                                props.actions.map(action => <Button key={action.label} variant='tertiary' circle onClick={action.fn}><FontAwesomeIcon icon={action.icon} /></Button>)
                            }
                        </TableTdActions>
                    </TableTd>
                }
            </TableBodyTr>)
        }
    </TableBody>;
};
