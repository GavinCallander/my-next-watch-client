import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Profile = props => {

    let content;
    if (!props.user) {
        return <Redirect to='/' />
    }
    else {
        content = props.user.lists.map(list => {
            return <ProfileSection key={list._id} title={list.name} />
        })
    }

    return (
        <div className='page profile'>
            <ProfileSection
                title='My Movies'
            />
            <ProfileSection 
                title='My TV'
            />
            {content}
        </div>
    )
};

const ProfileSection = props => {

    let content;
    if (props.content) {
        content = props.content.map(item => {
            return <ProfileItem key={item} title={item} />
        })
    }

    return (
        <div className='profile profile_section'>
            <span className='profile_section_title'>
                <p className='heading heading_two'>{props.title}</p>
            </span>
            <div className='profile_section_main'>
                {content}
                <ProfileItem isAdd={true} />
            </div>
        </div>
    )
};

const ProfileItem = props => {

    let className;
    let content;
    if (props.isAdd) {
        className = 'profile profile_item profile_item_add'
        content = <Link alt='Link to search page' className='profile_item_icon' to='/search'><FontAwesomeIcon icon={faPlus} size='3x'/></Link>
    }
    else {
        className = 'profile profile_item'
        content = '';
    }

    return (
        <span className={className}>
            {content}
        </span>
    )
}