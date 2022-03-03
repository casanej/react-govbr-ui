import { HeaderLinkProps } from 'models';
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';

export interface LinkRedirectProps extends Omit<HeaderLinkProps, 'label'> {
    children: React.ReactNode;
}

export const LinkRedirect = (props: LinkRedirectProps): ReactElement => {

    if (props.external) return <a href={props.url} target='_blank' rel='noopener noreferrer'>{props.children}</a>;

    return <Link to={props.url}>{props.children}</Link>;
};
