import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider } from 'lib';
import { MenuFooterProps, MenuHeaderProps, MenuItemGroup, MenuItemsProps } from 'models';
import React, { ReactElement, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuEvident, MenuExternalLink, MenuItem } from './components';
import { MenuContent, MenuFooter, MenuFooterInfo, MenuFooterLinks, MenuFooterLogos, MenuFooterSocial, MenuHeader, MenuItems, MenuStyled } from './index.style';

interface Props {
    open: boolean;
    onClose: () => void;
    footer?: MenuFooterProps;
    items: MenuItemsProps[];
    header?: MenuHeaderProps;
}

export const Menu = (props: Props): ReactElement => {
    const [evidentSubMenu, setEvidentSubMenu] = useState<MenuItemGroup[]>([]);

    const handleAddEvidentMenu = useCallback((item: MenuItemGroup) => {
        setEvidentSubMenu(oldMenus => [
            ...oldMenus,
            {
                ...item,
                groupType: 'evident',
            }
        ])
    }, []);

    const handleRemoveEvidentMenu = useCallback(() => {
        setEvidentSubMenu(oldMenus => oldMenus.slice(0, oldMenus.length - 1));
    }, [])

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { id } = e.target as HTMLDivElement;
        if (id === 'menu-backdrop') props.onClose();
    }

    return <MenuStyled id='menu-backdrop' isOpen={props.open} onClick={handleClickOutside}>
        <MenuContent>
            <MenuHeader>
                <div>
                    <div>
                        {props.header?.logo}
                    </div>
                    <div>
                        {props.header?.title}
                    </div>
                </div>
                <Button circle variant='tertiary' onClick={props.onClose}><FontAwesomeIcon icon={faTimes} /></Button>
            </MenuHeader>
            <Divider />
            <MenuItems>
                <div style={{ display: evidentSubMenu.length === 0 ? 'block' : 'none' }}>
                    {
                        props.items.map((item, itemIndex) => <MenuItem key={itemIndex} item={item} handleEvidentMenu={handleAddEvidentMenu} onClick={props.onClose}/>)
                    }
                </div>
                {
                    evidentSubMenu.length > 0 && <MenuEvident
                        item={evidentSubMenu.at(-1)!}
                        handleEvidentMenu={handleAddEvidentMenu}
                        handleRemoveEvidentMenu={handleRemoveEvidentMenu}
                        onClick={props.onClose}
                    />
                }
            </MenuItems>
            {
                props.footer && <MenuFooter>
                    {
                        props.footer.logos && <>
                            <Divider />
                            <MenuFooterLogos>
                                {
                                    props.footer.logos.map((logo, logoIndex) => <div key={logoIndex}>{logo}</div>)
                                }
                            </MenuFooterLogos>
                        </>
                    }
                    {
                        props.footer.external && <>
                            <Divider />
                            <MenuFooterLinks>
                                {
                                    props.footer?.external?.map((external, externalIndex) => <MenuExternalLink key={externalIndex} url={external.url} label={external.label} />)
                                }
                            </MenuFooterLinks>
                        </>
                    }
                    {
                        props.footer.social && <>
                            <Divider />
                            <MenuFooterSocial>
                                <p>{props.footer.social.title}</p>
                                <div>
                                    {
                                        props.footer.social.links.map((social, socialIndex) => <Link key={socialIndex} to={social.url}>
                                            <Button circle variant='tertiary'><FontAwesomeIcon icon={social.icon} color='#1351b4' size='lg' /></Button>
                                        </Link>)
                                    }
                                </div>
                            </MenuFooterSocial>
                        </>
                    }
                    {
                        props.footer.info && <>
                            <Divider />
                            <MenuFooterInfo>
                                {
                                    props.footer.info.map((info, infoIndex) => <div key={infoIndex}>{info}</div>)
                                }
                            </MenuFooterInfo>
                        </>
                    }

                </MenuFooter>
            }
        </MenuContent>
    </MenuStyled>;
};
