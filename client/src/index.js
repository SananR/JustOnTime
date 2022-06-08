import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/login.js'
import Signup from './components/signup/signup.js'
import CustomerMain from './components/customer/main.js'
import OrganizerMain from './components/organizer/main.js'
import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="customer/main" element={<CustomerMain />} />
          <Route path="organizer/main" element={<OrganizerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
