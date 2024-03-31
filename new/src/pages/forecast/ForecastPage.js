import React, { useState, useEffect} from 'react'
import "./forecastpage.scss"
import { MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import GraphSettings from "../../components/graphSettings/GraphSettings"; 
function ForecastPage() {
  let  [forecast, setForecast] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch('http://127.0.0.1:5000/get_store_data/', {
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
  const [timePeriod, setTimePeriod] = useState("All");

  console.log(forecast)
  const handleExportPDF = () => {
    // Implement PDF export logic here
  };

  const handleExportCSV = () => {
    // Implement CSV export logic here
  };
  return (
    
    <div className="forecast">
      <div className="box box1">
      <div className="half">
          <button
            style={
              timePeriod === "Week"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setTimePeriod("Week")}
          >
            Week
          </button>
          <button
            style={
              timePeriod === "Month"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setTimePeriod("Month")}
          >
            Month
          </button>
          <button
            style={
              timePeriod === "Year"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setTimePeriod("Year")}
          >
            Year
          </button>
          <button
            style={
              timePeriod === "All"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setTimePeriod("All")}
          >
            All
          </button>
        </div>
  
      </div>
      <div className="box box2">2
      
      </div>
      <div className="box box5">
      <button onClick={handleExportPDF}><MdPictureAsPdf /></button>
        <button onClick={handleExportCSV}><MdInsertDriveFile /></button>
      </div>
      <div className="box box4">Detailed Explanation of Chart
      
      </div>
      <div className="box box3">Charts
      
      </div>
      
    </div>
    
  )
}

export default ForecastPage