import React, { useState, useEffect, useContext} from 'react'
import "./forecastpage.scss"
import { MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings"; 
import OpenAPI from "../../components/openapi/OpenAPI";
import { AuthContext } from '../../context/AuthContext';
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
const API_KEY = "sk-proj-NM7EApOZLK7KuWBcWEfBT3BlbkFJErnFFbEp22wS15gYTH6X"; // secure -> environment variable

function ForecastPage() {
  let  [forecast, setForecast] = useState([])
  const {currentUser} = useContext(AuthContext)
  const userId = currentUser.uid
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[pathArray.length - 1];
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"
  const [combinedData, setCombinedData] = useState([]); 


  // async function callOpenAIAPI() {
  //   console.log("Calling the OpenAI API");

  //   const APIBody = {
  //       "model": "gpt-3.5-turbo",
  //       "messages": [{ "role": "user", "content": "with given data estimate recep's balls weight" + tweet }],
  //       "temperature": 0,
  //       "max_tokens": 60,
  //       "top_p": 1.0,
  //       "frequency_penalty": 0.0,
  //       "presence_penalty": 0.0
  //   }

  //   await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": "Bearer " + API_KEY
  //       },
  //       body: JSON.stringify(APIBody)
  //   }).then((response) => response.json()).then((data) => {
  //       console.log(data);
  //       // Assuming the sentiment is returned as the text in the response
  //       setSentiment(data.choices[0].message.content.trim());
  //   });
  // }

  // console.log(tweet);

  // console.log(tweet);
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
  console.log(forecast[id]?.forecast_female_count)
  console.log("hello")
  const existingData = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    femaleCount: item["female_count"]
  })) || [];
  
  // Calculate additional forecast data
  const additionalData = forecast[id]?.forecast_female_count?.map((item) => ({
    date: item.date,
    femaleForecastCount: item["forecast_female_visitor"]
  })) || [];
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
      {/* <div className="box box4">Detailed Explanation of Chart
      <button onClick={callOpenAIAPI}>Get The Tweet Sentiment From OpenAI API</button>
        {sentiment !== "" ?
          <h3>This Tweet Is: {sentiment}</h3>  
          :
          null
        }
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          placeholder='Paste your tweet here!'
          cols={50}
          rows={10}
        />
      </div> */}
      <div className="box box3">CHARTS
        <div>
          <h2>Weekly Female Customer Number Forecast</h2>
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...existingData, ...additionalData]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing data (female count) */}
            {existingData.length > 0 && (
              <Line
                type="monotone"
                dataKey="femaleCount"
                stroke="#FFFF42" // Color for existing data
                strokeWidth={2}
                dot={false}
              />
            )}
            {/* Render line for additional forecast data */}
            {additionalData.length > 0 && (
              <Line
                type="monotone"
                dataKey="femaleForecastCount"
                stroke="#FF00FF" // Color for additional forecast data
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>

    
  )
}

export default ForecastPage