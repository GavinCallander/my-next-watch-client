import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Landing } from '../Landing';
import { Profile } from '../Profile';
import { Search } from '../Search';

import { Footer, Header } from '../Layout';

import '../../styles/main.scss';

export const App = () => {
    return (
        <div className='app'>
            <Router>
                <Header />
                {/* <Landing /> */}
                {/* <Profile /> */}
                <Search />
                <Footer />
            </Router>
        </div>
    )
};