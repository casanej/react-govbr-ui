import React, { ReactElement } from 'react'
import { MenuItem } from '..';
import { LinkStyled, MenuExternalLinkStyled } from './index.style';

interface Props {
    url: string;
    label: string;
}

export const MenuExternalLink = (props: Props): ReactElement => {

    return (
        <MenuExternalLinkStyled>
            <LinkStyled to={props.url}>
                <MenuItem
                    item={{
                        label: props.label,
                        groupType: 'item_external',
                        url: props.url,
                    }}
                    density='sm'
                />
            </LinkStyled>
        </MenuExternalLinkStyled>
    );
};
