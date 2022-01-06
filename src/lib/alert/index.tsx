import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { alertColorTypes, AlertTypes } from 'models';
import React, { ReactElement } from 'react'
import { AlertStyled } from './index.style';

interface Props {
    children: React.ReactNode;
    type: AlertTypes;
}

const alertIconTypes: { [key:string]: IconName } = {
    success: 'check-circle',
    info: 'info-circle',
    warning: 'exclamation-triangle',
    error: 'times-circle',
}

export const Alert = (props: Props): ReactElement => {

    return (
        <AlertStyled type={props.type}>
            <FontAwesomeIcon icon={alertIconTypes[props.type]} color={alertColorTypes[props.type].color} />
            {props.children}
        </AlertStyled>
    );
};
