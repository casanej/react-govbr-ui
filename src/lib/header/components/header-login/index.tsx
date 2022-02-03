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

    if (!props.logged) return <Link to='/login'>
        <Button label={<>
            <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <FontAwesomeIcon icon={faUser} />
                <div>Entrar</div>
            </div>
        </>} variant='quaternary' />
    </Link>

    return <HeaderLoginStyled>
        <Avatar image={props.logged.avatar} />
        <Button label={<FontAwesomeIcon icon={faChevronDown} />} circle variant='tertiary' size='sm' onClick={() => setIsOpen(true)} />
        <HeaderMenuLoggedIn ref={menuRef} open={isOpen}>
            {props.logged.menuContent}
        </HeaderMenuLoggedIn>
    </HeaderLoginStyled>;
};
