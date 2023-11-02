import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      
  }, []);

  return (
    <Router>
      <div>
      
      </div>
    </Router>
    
  )
}

export default App