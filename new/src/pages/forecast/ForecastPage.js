import React, { useState, useEffect} from 'react'
import "./forecastpage.scss"
function ForecastPage() {
  let  [forecast, setForecast] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch('http://127.0.0.1:5000/get_store_data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let data = await response.json();
        setForecast(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    getData();
  }, []);
  console.log(forecast)
  return (
    
    <div className="forecast">
      <div className="box box1">Graph Settings
      </div>
      <div className="box box2">2
      
      </div>
      <div className="box box5">Pdf Gen
      
      </div>
      <div className="box box4">Detailed Explanation of Chart
      
      </div>
      <div className="box box3">Charts
      
      </div>
      
    </div>
  )
}

export default ForecastPage