import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <header>
                <ul><li><Link to='/'>Main</Link></li></ul>
                <ul><li><Link to='/user'>User</Link></li></ul>
                <ul><li><Link to='/update'>update</Link></li></ul>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;