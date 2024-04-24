import React, { useState, useEffect, useContext} from 'react'
import "./forecastpage.scss"
import { MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings"; 
import { AuthContext } from '../../context/AuthContext';
import { ResponsiveContainer,LineChart, Treemap, Sankey, Line, Tooltip } from "recharts";
import { useParams } from "react-router-dom";
import OpenAPI from "../../components/openapi/OpenAPI";
const API_KEY = "sk-proj-NM7EApOZLK7KuWBcWEfBT3BlbkFJErnFFbEp22wS15gYTH6X"; // secure -> environment variable

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
  console.log(forecast[id])
  console.log(forecast[id]?.grouped_data)
  console.log("fartand balls")
  const forecastData = forecast[id]?.grouped_data || []; // Use an empty array if forecastData is undefined
  const chartData = forecastData.map((item) => ({
    date: item.date,
    femaleCount: item["female_count"] // Assuming "0-15_age_count" is the key for the age count data
  }));
  
  const weekly_fifteen_forecast = {
    title: "Female Count",
    color: "#FF8042",
    dataKey: "femaleCount",
    chartData: chartData,
  };
  console.log(weekly_fifteen_forecast.chartData)
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
      <div className="box box4">
      
        <OpenAPI type="forecast_page" />

      </div>
      <div className="box box3">CHARTS
        <div>
          <h2>Weekly Female Customer Number Forecast</h2>
          <ResponsiveContainer width="100%" height={400}> {/* Adjust dimensions as needed */}
            <LineChart data={weekly_fifteen_forecast.chartData}>
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
                labelStyle={{ color: "#333", fontSize: "14px" }}
                position={{ x: 30, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey={weekly_fifteen_forecast.dataKey}
                stroke={weekly_fifteen_forecast.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    
  )
}

export default ForecastPage