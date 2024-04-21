import React, { useState, useEffect, useContext} from 'react'
import "./forecastpage.scss"
import { MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import GraphSettings from "../../components/graphSettings/GraphSettings"; 
import { AuthContext } from '../../context/AuthContext';
import { useParams } from "react-router-dom";

function ForecastPage() {
  let  [forecast, setForecast] = useState([])
  const {currentUser} = useContext(AuthContext)
  const userId = currentUser.uid
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[pathArray.length - 1];
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:5000/get_store_data?user_id=${userId}&store_id=${id}`, {
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
  console.log(`http://127.0.0.1:5000/get_store_data?user_id=${userId}&store_id=${id}`)
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