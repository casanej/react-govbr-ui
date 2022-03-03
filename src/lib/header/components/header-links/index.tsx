import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkRedirect } from 'components';
import { Button, MenuContext } from 'lib';
import { HeaderLinkProps } from 'models';
import React, { ReactElement, useState } from 'react'
import { HeaderLink, HeaderLinksStyled } from './index.style';

interface Props {
    links?: HeaderLinkProps[];
    minified?: boolean;
}

export const HeaderLinks = (props: Props): ReactElement | null => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    if (!props.links) return null;
    if (props.links && props.links.length === 0) return null;

    const handleClose = () => {
        if (menuIsOpen) setMenuIsOpen(false);
    }

    if (props.minified) {
        return <HeaderLinksStyled>
            <Button
                circle
                variant={menuIsOpen ? 'primary' : 'tertiary'}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            ><FontAwesomeIcon icon={faEllipsisV} color={menuIsOpen ? '#fff' : '#1351b4'}/></Button>
            <MenuContext
                title='Acesso Rápido'
                items={props.links}
                open={menuIsOpen}
                onClose={handleClose}
                offset={{ x: 0, y: 45 }}
            />
        </HeaderLinksStyled>
    }

    return (
        <HeaderLinksStyled>
            {
                props.links.map((link, index) => <LinkRedirect key={index} url={link.url} external={link.external}>
                    <HeaderLink>{link.label}</HeaderLink>
                </LinkRedirect>)
            }
        </HeaderLinksStyled>
    );
};
