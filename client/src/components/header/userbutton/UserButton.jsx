import React from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'

import './userbutton.css'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/client/src/pages"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
    <div className="position-relative">
        <GiHamburgerMenu className="mt-2 pt-1 ms-2 position-absolute" color="grey" size={25}/>
        <FaUserCircle color="red" className="mt-2 ms-5 position-absolute" size={30}/>
    </div>
    </a>
  ));

function UserButton() {
    return (
        <Dropdown id="user-button" className="ms-auto me-4 rounded-pill border border-dark shadow grow">
            <Dropdown.Toggle as={CustomToggle} variant="outline-dark"/>
            <Dropdown.Menu className='me-1 mt-2 rounded-lg'>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/signup">Register</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserButton;