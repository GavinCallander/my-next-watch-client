import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

export const Footer = props => {
    return (
        <div className='layout footer'>
            <FontAwesomeIcon className='layout_icon' icon={faSearch} size='1x' />
            <FontAwesomeIcon className='layout_icon' icon={faHome} size='1x' />
            <FontAwesomeIcon className='layout_icon' icon={faCog} size='1x' />
        </div>
    )
};