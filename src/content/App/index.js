import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Landing } from '../Landing';
import { Profile } from '../Profile';
import { Search } from '../Search';

import { Footer, Header } from '../Layout';

import '../../styles/main.scss';

export const App = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        decodeToken();
    }, []);

    const updateUser = newToken => {
        if (newToken) {
            localStorage.setItem('mernToken', newToken);
            decodeToken(newToken);
        }
        else {
            setUser(null);
        };
    };
    const decodeToken = existingToken => {
        let token = existingToken || localStorage.getItem('mernToken');
        if (token) {
            let decoded = jwtDecode(token);
            if (!decoded || Date.now() >= decoded.exp * 1000) {
                setUser(null);
            }
            else {
                setUser(decoded);
            }
        }
        else {
            setUser(null);
        };
    };

    return (
        <div className='app'>
            <Router>
                <Header />
                <Route exact path='/' render={() => 
                    <Landing 
                        updateUser={updateUser}
                        user={user}
                    />
                } />
                <Route path='/profile' render={() => 
                    <Profile 
                        user={user} 
                    />
                } />
                <Route path='/search' render={() => 
                    <Search />
                } />
                <Footer />
            </Router>
        </div>
    )
};