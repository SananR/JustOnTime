import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/login.js'
import Signup from './pages/signup/signup.js'
import OrganizerRegister from './pages/organizer/register.jsx'
import Header from './components/header/Header'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="register" element={<OrganizerRegister />} />
        </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
