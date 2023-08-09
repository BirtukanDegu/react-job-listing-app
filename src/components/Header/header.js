import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <div className="header">
            <Link to="/" className="header__logo">FINDJOB</Link>
        </div>
    )
}

export default Header