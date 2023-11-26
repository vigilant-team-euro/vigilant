import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Home from './pages/Home.js';
import LoginRouter from './pages/LoginRouter.js';
import ClientPage from './pages/ClientPage.js';
import NotFoundPage from './pages/NotFound.js';
import SignUpRouter from './pages/SignupRouter.js';
import Navbar from './components/Navbar.js';
import { auth, googleAuth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    
      const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          // User logged in
          setUser(userAuth);
        } else {
          // User logged out
          setUser(null);
        }
      });

      return unsubscribe;
    }, []);


  const wrapperStyle = {
    backgroundColor: '#efebfa', // Set your desired background color
    minHeight: '100vh', // Ensure the background color covers the entire viewport height
  };

  return (
    <Router>
      <div style={wrapperStyle}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginRouter />} />
            <Route path="signup" element={<SignUpRouter />} />
            <Route path="clientPage" element={<ClientPage />} />
            <Route path="*" element={<NotFoundPage />} />
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App