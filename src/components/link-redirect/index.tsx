import { HeaderLinkProps } from 'models';
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';

export interface LinkRedirectProps extends HeaderLinkProps {}

export const LinkRedirect = (props: LinkRedirectProps): ReactElement => {

    if (props.external) return <a href={props.url} target='_blank' rel='noopener noreferrer'>{props.label}</a>;

    return <Link to={props.url}>{props.label}</Link>;
};
