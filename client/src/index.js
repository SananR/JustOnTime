import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/user/login.jsx'
import Signup from "./pages/user/signup.jsx";
import ForgottenPassword from "./pages/resetPassword/forgottenPassword"
import ResetPassword from "./pages/resetPassword/resetPassword"
import ResetSuccessful from "./pages/resetPassword/resetSuccessful"
import CustomerVerifyEmail from './pages/user/verification/verifyEmail/verifyEmail.jsx'
import CustomerVerificationRequired from './pages/user/verification/verificationRequired/verificationRequired.jsx'
import CustomerInfo from './pages/user/customer/customerInfo/customerInfo.jsx'
import CustomerHome from "./pages/user/customer/home/CustomerHome";
import OrganizerMain from './pages/user/organizer/main/main.jsx'
import Header from './components/header/Header'
import { store } from './store.js'
import {Provider} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import './stylesheet.css'
import AdminDashboard from './pages/admin/dashboard'
import EventInfo from './pages/event/info/eventInfo'
import OrganizerSignup from "./pages/user/organizer/register/OrganizerSignup";

export default function App() {
  return (
  <>
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<CustomerHome />} />
            <Route path="personal-info" element={<CustomerInfo />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<CustomerHome />} />
            <Route path="forgottenpassword" element={<ForgottenPassword />} />
            <Route path="reset-successful" element={<ResetSuccessful />} />
            <Route path="resetpassword" >              
                  <Route path=":token" >
                    <Route path=":id" element={<ResetPassword />} />
                  </Route>
            </Route>
            <Route path="event">
              <Route path=":eventId" element={<EventInfo/>} />
            </Route>
            <Route path="admin">
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="customer">
              <Route path="verification-required" element={<CustomerVerificationRequired />} />
              <Route path="verifyemail">              
                <Route path=":email">
                  <Route path=":token" element={<CustomerVerifyEmail />} />
                </Route>
              </Route>
            </Route>
            <Route path="organizer">
                <Route path="signup" element={<OrganizerSignup/>} />
                <Route path="main" element={<OrganizerMain/>} />
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

