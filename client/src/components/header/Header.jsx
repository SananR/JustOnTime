import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import UserButton from './userbutton/UserButton'
import Search from './search/search'

import logo from '../../logo_cropped.png'

import './header.css'

function Header() {
    return (
        <Navbar bg="light" expand="lg" className='p-2'>
            <a href="/">
                <Navbar.Brand className='logo ms-4 link-light'>
                    <img
                    src={logo}
                    width='200'
                    height='50'
                    className='d-inline-block align-top'
                    alt='JustOnTime'
                    />
                </Navbar.Brand>
            </a>
            <Search/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <a className="position-absolute start-50 ms-5 ps-5" href="/organizer/signup">Interested In Selling?</a>
            <Navbar.Collapse id="basic-navbar-nav">
            <UserButton />
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;