import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import UserButton from './userbutton/UserButton'

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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <UserButton />
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;