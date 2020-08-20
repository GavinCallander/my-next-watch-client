import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const Landing = props => {


    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState('');

    
    const handleModalShow = e => {
        if (!modalActive) {
            setModalType(e.currentTarget.getAttribute('name'));
            setModalActive(true);
        }
        else {
            setModalType('');
            setModalActive(false);
        };
    };

    let modalClass = modalActive ? 'auth_active' : 'auth'

    if (props.user) {
        return <Redirect to='/profile' />
    };

    return (
        <div className='page landing'>
            <AuthModal 
                class={modalClass} 
                handleModalShow={handleModalShow} 
                type={modalType} 
                updateUser={props.updateUser}
                />
            <span className='landing landing_auth' name='login' onClick={handleModalShow}>
                <p className='heading heading_two'>Log In</p>
            </span>
            <p className='heading heading_three'>or</p>
            <span className='landing landing_auth' name='signup' onClick={handleModalShow}>
                <p className='heading heading_two'>Sign Up</p>
            </span>
        </div>
    )
};

const AuthModal = props => {
    
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleFormSubmit = e => {
        e.preventDefault();
        if (props.type === 'signup' && password !== passwordConfirm) {
            setMessage('Passwords do not match.');
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/${props.type}`, {
            method: 'POST',
            body: JSON.stringify({
                password,
                username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                setMessage(`${res.status}: ${res.statusText}`);
                return;
            }
            res.json().then(result => {
                props.updateUser(result.token);
            })
        })
        .catch(err => {
            setMessage(`${err.toString}`);
        });
    };

    let additionalField = props.type === 'signup' ? 
        <span className='auth_input'>
            <p className='content content_one'>Confirm Password: </p>
            <input className='content content_one auth_input_field' type='password' onChange={e => setPasswordConfirm(e.target.value)} />
        </span> :
        null;
    let callToAction = props.type === 'signup' ? 'Sign Up' : 'Log In'

    return (
        <div className={props.class}>
            <form className='auth_form' onSubmit={handleFormSubmit}>
                <p className='heading heading_two auth_header'>{callToAction}</p>
                <span className='auth_input'>
                    <p className='content content_one'>Username: </p>
                    <input className='content content_one auth_input_field' type='text' onChange={e => setUsername(e.target.value)} />
                </span>
                <span className='auth_input'>
                    <p className='content content_one'>Password: </p>
                    <input className='content content_one auth_input_field' type='password' onChange={e => setPassword(e.target.value)} />
                </span>
                {additionalField}
                <span className='auth_input'>
                    <input className='heading heading_two auth_submit' type='submit' value={callToAction} />
                </span>
            </form>
        </div>
    )
};