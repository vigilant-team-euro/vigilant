import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom'
import Home from './pages/Home.js';
import LoginRouter from './pages/LoginRouter.js';
import ClientPage from './pages/ClientPage.js';
import NotFoundPage from './pages/NotFound.js';
import SignUpRouter from './pages/SignupRouter.js';
import Navbar from './components/Navbar.js';
import { auth, googleAuth } from "./config/firebase";
import { AuthContext } from './AuthContext.js';
import { useContext } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const { isLoggedIn, login, logout} = useContext(AuthContext)


  const wrapperStyle = {
    backgroundColor: '#efebfa', // Set your desired background color
    minHeight: '100vh', // Ensure the background color covers the entire viewport height
  };

  return (
    <BrowserRouter>
      <div style={wrapperStyle}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginRouter />} />
            <Route path="signup" element={<SignUpRouter />} />
            <Route path="clientPage" element={<ClientPage />}/>
            <Route path="*" element={<NotFoundPage />} />
          <Route />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App