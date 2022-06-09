import React from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'

import './userbutton.css'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
    <Nav className="row align-items-center justify-content-center mt-1">
        <GiHamburgerMenu className="col-5" color="grey" size={30}/>
        <FaUserCircle className="col-5" color="red" size={40}/>
    </Nav>
    </a>
  ));

function UserButton() {
    return (
        <Dropdown id="user-button" className="pull-left ms-auto align-items-center me-4 rounded-pill border border-dark shadow grow">
            <Dropdown.Toggle as={CustomToggle} variant="outline-dark" />
            <Dropdown.Menu className='me-1 mt-2 rounded-lg'>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/signup">Register</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserButton;