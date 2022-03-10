import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'lib';
import { HeaderLoginProps } from 'models';
import { HeaderLoginStyled, HeaderMenuLoggedIn } from './index.style';
import { useOnClickOutside } from 'hooks';

interface Props {
    logged?: HeaderLoginProps;
}

export const HeaderLogin = (props: Props): ReactElement => {
    const menuRef = useRef<HTMLDivElement>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useOnClickOutside(menuRef, () => setIsOpen(false));

    const toggleMenu = () => setIsOpen(oldOpen => !oldOpen);

    if (!props.logged) return <Link to='/login'>
        <Button variant='quaternary'>
            <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <FontAwesomeIcon icon={faUser} />
                <div>Entrar</div>
            </div>
        </Button>
    </Link>

    return <HeaderLoginStyled>
        <Avatar image={props.logged.avatar} onClick={toggleMenu} />
        <Button circle variant='tertiary' size='sm' onClick={toggleMenu}><FontAwesomeIcon icon={faChevronDown} /></Button>
        <HeaderMenuLoggedIn ref={menuRef} open={isOpen}>
            {props.logged.menuContent}
        </HeaderMenuLoggedIn>
    </HeaderLoginStyled>;
};
