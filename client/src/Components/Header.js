

import React, { useEffect, useState } from 'react';
import logo from "./Main/assets/logo-removebg-preview.png";
import './header.css';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import log from "./Main/assets/download.png";
const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            <div className='parent'>
                <div className="header-content">
                    <Link to ='/'>
                    <img src={logo} alt="Project Logo" width='60' height="60" />
                    </Link>
                    <h1>EDUINNOHUB</h1>
                </div>
                <div className='nav'>
                    <nav>
                        {isLoggedIn ? (
                            <>
                             <Link to='/profile' className ="profile-link">
                             <img src={log} className = "user-img" alt="Profile Icon" width="45" height="45" />
                            </Link>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                            </>
                        ) : (
                            <>
                                <a href="/login" className="button">Login</a>
                                <a href="/register" className="button">Signup</a>
                            </>
                        )}


                        
                        <a href='/upload' className="button">Upload projects</a>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;

