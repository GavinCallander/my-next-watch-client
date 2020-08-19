import React from 'react';

export const Landing = props => {
    return (
        <div className='page landing'>
            <span className='landing landing_auth'>
                <p className='heading heading_two'>Log In</p>
            </span>
            <p className='heading heading_three'>or</p>
            <span className='landing landing_auth'>
                <p className='heading heading_two'>Sign In</p>
            </span>
        </div>
    )
};