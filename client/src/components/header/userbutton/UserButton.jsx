import React from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'
import {useDispatch, useSelector} from 'react-redux';

import './userbutton.css'
import {useNavigate} from "react-router-dom";
import {logoutUser, reset} from "../../../services/auth/authSlice";

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
      const user = useSelector((state) => state.auth.user);
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const onLogout = () => {
          dispatch(logoutUser());
          dispatch(reset());
          navigate("/login");
      }

      return (
          <Dropdown id="user-button" className="ms-auto me-4 rounded-pill border border-dark shadow grow">
          <Dropdown.Toggle as={CustomToggle} variant="outline-dark"/>
          <Dropdown.Menu className='me-1 mt-2 rounded-lg'>
              {!user && <Dropdown.Item href="/login">Login</Dropdown.Item>}
              {!user && <Dropdown.Item href="/signup">Register</Dropdown.Item>}
              {user && <Dropdown.Item href="/personal-info">My Account</Dropdown.Item>}
              {user && user.userType === "Organizer" && <Dropdown.Item href="/organizer/main">My Events</Dropdown.Item>}
              {user && <Dropdown.Divider />}
              {user && <Dropdown.Item as="button" onClick={onLogout}>Logout</Dropdown.Item>}
          </Dropdown.Menu>
          </Dropdown>
      )
}

export default UserButton;