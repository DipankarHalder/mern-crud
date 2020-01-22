import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <section className="app-fwidth app-header">
            <div className="app-largecontainer">
                <div className="app-fwidth">
                    <div className="app-logo app-left">
                        <span>..Crudblog</span>
                    </div>
                    <div className="app-navigation app-right">
                        <Link to="/">Home</Link>
                        <Link to="/list">List</Link>
                        <Link to="/add">Add</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;