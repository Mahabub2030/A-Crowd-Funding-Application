import React from 'react';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

const Auth = () => {
    return (
        <div>
            <Navbar/>
            
            <Outlet/>
           
            <Footer/>
        </div>
    );
};

export default Auth;