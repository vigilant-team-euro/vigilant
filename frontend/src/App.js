import React, {useState, useEffect} from 'react'

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
    <div>
      
    </div>
    
  )
}

export default App