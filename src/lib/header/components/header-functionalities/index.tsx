import React, { ReactElement, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuFunctionalities } from 'models';
import { HeaderFunctionalitiesStyled, HeaderFunctionality } from './index.style';
import { Button, MenuContext } from 'lib';
import { faSearch, faTh } from '@fortawesome/free-solid-svg-icons';

interface Props {
    functionalities?: MenuFunctionalities[];
    onSearchStart: () => void;
    minified?: boolean;
    showSearch?: boolean;
}

export const HeaderFunctionalities = (props: Props): ReactElement | null => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    if (!props.functionalities) return null;
    if (props.functionalities && props.functionalities.length === 0) return null;

    const handleClose = () => {
        if (menuIsOpen) setMenuIsOpen(false);
    }

    const buttonSearch = <Button
        circle
        label={<FontAwesomeIcon icon={faSearch} color={'#1351b4'}/>}
        variant={'tertiary'}
        onClick={() => props.onSearchStart()}
    />

    if (props.minified) {
        return <HeaderFunctionalitiesStyled>
            <Button
                circle
                label={<FontAwesomeIcon icon={faTh} color={menuIsOpen ? '#fff' : '#1351b4'}/>}
                variant={menuIsOpen ? 'primary' : 'tertiary'}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            />
            {buttonSearch}
            <MenuContext
                title='Funcionalidades do Sistema'
                items={props.functionalities}
                open={menuIsOpen}
                onClose={handleClose}
                offset={{ x: 0, y: 45 }}
            />
        </HeaderFunctionalitiesStyled>
    }

    return <HeaderFunctionalitiesStyled>
        {
            props.functionalities.map((functionality, index) => <HeaderFunctionality
                key={index}
                circle
                variant='tertiary'
                size='sm'
                label={<FontAwesomeIcon icon={functionality.icon} color='#1351b4'/>}
                onClick={functionality.onClick}
            />)
        }
        {
            props.showSearch && buttonSearch
        }
    </HeaderFunctionalitiesStyled>;
};
