import React from 'react';
import { Redirect } from 'react-router-dom';

export const Profile = props => {

    if (!props.user) {
        return <Redirect to='/' />
    }

    const movies = ['The Godfather', 'Saving Private Ryan', 'Gladiator', 'The Shawshank Redemption', 'The Dark Knight'];

    return (
        <div className='page profile'>
            <ProfileSection 
                content={movies}
                title='My Movies'
            />
            <ProfileSection 
                title='My TV'
            />
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
            </div>
        </div>
    )
};

const ProfileItem = props => {
    return (
        <span className='profile profile_item'>
            <span className='profile_item_poster'>
                
            </span>
            <p className='content content_two'>{props.title}</p>
        </span>
    )
}