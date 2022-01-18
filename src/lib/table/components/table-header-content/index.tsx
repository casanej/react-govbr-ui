import { faEllipsisV, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputText } from 'lib';
import React, { ReactElement, useState } from 'react'
import { TableHeaderContentStyled } from './index.style';

interface Props {
    title?: string;
    actions?: Array<{
        text: React.ReactNode;
        function: () => void;
    }>
}

export const TableHeaderContent = (props: Props): ReactElement => {
    const [isSearching, setIsSearching] = useState<boolean>(false);

    if (isSearching) {
        return <TableHeaderContentStyled>
            <div>
                <InputText placeholder='Buscar na tabela' />
            </div>
            <div>
                <Button
                    circle
                    variant='tertiary'
                    label={<FontAwesomeIcon icon={faTimes} />}
                    onClick={() => setIsSearching(false)}
                />
            </div>
        </TableHeaderContentStyled>;
    }

    return <TableHeaderContentStyled>
        <div>{props.title}</div>
        <div>
            <Button
                circle
                variant='tertiary'
                label={<FontAwesomeIcon icon={faSearch} />}
                onClick={() => setIsSearching(true)}
            />
            {
                props.actions && <Button
                    circle
                    variant='tertiary'
                    label={<FontAwesomeIcon icon={faEllipsisV} />}
                />
            }
        </div>
    </TableHeaderContentStyled>;
};
