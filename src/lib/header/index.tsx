import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from 'hooks';
import { Button, Divider, InputText, Menu } from 'lib';
import { HeaderLinkProps, HeaderLoginProps, HeaderLogoProps, MenuFooterProps, MenuFunctionalities, MenuHeaderProps, MenuItemsProps } from 'models';
import React, { ReactElement, useEffect, useState } from 'react';
import { HeaderFunctionalities, HeaderLinks, HeaderLogin, HeaderLogo } from './components';
import { HeaderActionButtons, HeaderContent, HeaderSearching, HeaderStyled, HeaderSubTitle, HeaderTitle, HeaderTitleContent, HeaderTitleMenu } from './index.style';

interface Props {
    title: string;
    compact?: boolean;
    logo?: HeaderLogoProps;
    functionalities?: MenuFunctionalities[];
    logged?: HeaderLoginProps;
    links?: HeaderLinkProps[];
    menuItems?: {
        header?: MenuHeaderProps;
        items?: MenuItemsProps[];
        footer?: MenuFooterProps;
    };
    onSearch?: (value: string) => void;
    subTitle?: string;
}

export const Header = (props: Props): ReactElement => {
    const { width } = useWindowSize();
    const isCompact = props.compact || false;
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [menuMinified, setMenuMinified] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        if (width !== 0 && width < 1200) {
            if (!menuMinified) setMenuMinified(true);
        } else {
            if (menuMinified) setMenuMinified(false);
        }
    }, [width])

    const handleOnSearch = (value?: string) => {
        const inputValue = value || searchValue;

        if (props.onSearch) props.onSearch(inputValue);
    }

    console.log('[HMMMMM]', props)

    return <HeaderStyled>
        <HeaderContent compact={isCompact}>
            {
                props.logo && !isSearching && <HeaderLogo compact={isCompact} logo={props.logo} />
            }
            {
                isSearching
                    ? <HeaderSearching>
                        <InputText
                            placeholder='O que você procura'
                            onChange={(value) => setSearchValue(value.normal)}
                            action={{
                                icon: 'search',
                                onClick: handleOnSearch
                            }}
                        />
                        <Button variant='tertiary' circle onClick={() => setIsSearching(false)}><FontAwesomeIcon icon={faTimes} /></Button>
                    </HeaderSearching>
                    : <>
                        <HeaderTitleMenu compact={isCompact}>
                            <div>
                                {
                                    props.menuItems?.items && props.menuItems?.items.length > 0 && <Button
                                        circle
                                        variant='tertiary'
                                        onClick={() => setMenuIsOpen(true)}
                                    ><FontAwesomeIcon icon={faBars} /></Button>
                                }
                                <HeaderTitleContent>
                                    <HeaderTitle>{props.title}</HeaderTitle>
                                    <HeaderSubTitle>{props.subTitle}</HeaderSubTitle>
                                </HeaderTitleContent>
                            </div>
                            {
                                !menuMinified && !isCompact && <div>
                                    <InputText
                                        placeholder='O que você procura'
                                        onChange={(value) => setSearchValue(value.normal)}
                                        action={{
                                            icon: 'search',
                                            onClick: handleOnSearch
                                        }}
                                    />
                                </div>
                            }
                        </HeaderTitleMenu>
                        <HeaderActionButtons compact={isCompact}>
                            <div>
                                <HeaderLinks links={props.links} minified={menuMinified} />
                                <Divider direction='vertical' />
                                <HeaderFunctionalities functionalities={props.functionalities} minified={menuMinified} showSearch={isCompact} onSearchStart={() => setIsSearching(true)} />
                                <HeaderLogin logged={props.logged} />
                            </div>
                        </HeaderActionButtons>
                    </>
            }
        </HeaderContent>
        {
            props.menuItems?.items && props.menuItems?.items.length > 0 && <Menu
                open={menuIsOpen}
                items={props.menuItems.items}
                header={props.menuItems.header}
                onClose={() => setMenuIsOpen(false)} />
        }
    </HeaderStyled>;
};
