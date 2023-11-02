import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import ClientPage from './pages/ClientPage.js';
import NotFoundPage from './pages/NotFound.js';
import SignIn from './pages/SignIn.js';

function App() {
  const [data, setData] = useState([]);

  

  return (
    <Router>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/clientPage' element={<ClientPage/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>

        <Route path='*' element={<NotFoundPage/>}></Route>

      </Routes>
    </Router>
    
  )
}

export default App