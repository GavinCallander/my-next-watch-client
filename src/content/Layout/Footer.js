import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

export const Footer = props => {
    return (
        <div className='layout footer'>
            <Link className='layout_link' to='/profile'>
                <FontAwesomeIcon className='layout_icon' icon={faHome} size='1x' />
            </Link>
            <Link className='layout_link' to='/search'>
                <FontAwesomeIcon className='layout_icon' icon={faSearch} size='1x' />
            </Link>
            <FontAwesomeIcon className='layout_icon' icon={faCog} size='1x' />
        </div>
    )
};