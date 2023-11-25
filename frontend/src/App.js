import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Home from './pages/Home.js';
import LoginRouter from './pages/LoginRouter.js';
import ClientPage from './pages/ClientPage.js';
import NotFoundPage from './pages/NotFound.js';
import SignUpRouter from './pages/SignupRouter.js';
import Navbar from './components/Navbar.js';

function App() {
  const [data, setData] = useState([]);

  

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<LoginRouter/>}></Route>
        <Route path='/signup' element={<SignUpRouter/>}></Route>

        <Route path='/clientPage' element={<ClientPage/>}></Route>

        <Route path='*' element={<NotFoundPage/>}></Route>
        
      </Routes>
      
    </Router>
    
  )
}

export default App