import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/login/login.js'
import Signup from './pages/customer/signup/signup.jsx'
import OrganizerRegister from './pages/organizer/register.jsx'
import OrgVerifyEmail from './pages/organizer/verifyEmail/verifyEmail.jsx'
import OrgVerificationRequired from './pages/organizer/verificationRequired/verificationRequired.jsx'
import CustomerVerifyEmail from './pages/customer/verifyEmail/verifyEmail.jsx'
import CustomerVerificationRequired from './pages/customer/verificationRequired/verificationRequired.jsx'
import OrganizerMain from './pages/organizer/main/main.jsx'
import Header from './components/header/Header'
import { store } from './store.js'
import {Provider} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'

export default function App() {
  return (
  <>
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="register" element={<OrganizerRegister />} />
            <Route path="organizer">
              <Route path="verification-required" element={<OrgVerificationRequired />} />
              <Route path="verifyemail">              
                <Route path=":email">
                  <Route path=":token" element={<OrgVerifyEmail />} />
                </Route>
              </Route>
              <Route path="main" element={<OrganizerMain/>} />
            </Route>
            <Route path="customer">
              <Route path="verification-required" element={<CustomerVerificationRequired />} />
              <Route path="verifyemail">              
                <Route path=":email">
                  <Route path=":token" element={<CustomerVerifyEmail />} />
                </Route>
              </Route>
            </Route>
        </Routes>
    </Router>
  </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
