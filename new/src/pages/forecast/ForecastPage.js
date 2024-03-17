import React, { useState, useEffect} from 'react'
import "./forecastpage.scss"
function ForecastPage() {
  let  [forecast, setForecast] = useState([])
  useEffect(()=>{
          getData()
      }, [forecast])
      let getData = async ()=>{
          let response = await  fetch('http://127.0.0.1:5000/get_store_data',{
              method:'GET',
              headers:{
                  'Content-Type':'application/json',
                
              }
          })
          let data = await response.json()
          setForecast(data)
  }
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