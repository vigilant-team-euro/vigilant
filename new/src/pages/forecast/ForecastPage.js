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
  console.log(forecast)
  const [timePeriod, setTimePeriod] = useState("All");
  const [forecasttype, setForecastType] = useState("Gender");
  console.log("hello")







  //graph datas
  //gender weekly
  const existingDataFemaleWeekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    femaleCount: item["female_count"]
  })) || [];
  const additionalDataFemaleWeekly = forecast[id]?.forecast_female_count?.map((item) => ({
    date: item.date,
    femaleForecastCount: item["forecast_female_visitor"]
  })) || [];
  const existingDataMaleWeekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    maleCount: item["male_count"]
  })) || [];
  const additionalDataMaleWeekly = forecast[id]?.forecast_male_count?.map((item) => ({
    date: item.date,
    maleForecastCount: item["forecast_male_visitor"]
  })) || [];
  const combinedDataGenderWeekly = existingDataFemaleWeekly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleCount: femaleItem.femaleCount,
    maleCount: existingDataMaleWeekly[index]?.maleCount || 0,
  }));
  const combinedForecastDataGenderWeekly = additionalDataFemaleWeekly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleForecastCount: femaleItem.femaleForecastCount,
    maleForecastCount: additionalDataMaleWeekly[index]?.maleForecastCount || 0,
  }));
  //gender monthly
  const existingDataFemaleMonthly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    femaleCount: item["female_count"]
  })) || [];
  const additionalDataFemaleMonthly = forecast[id]?.forecast_female_count_thirty?.map((item) => ({
    date: item.date,
    femaleForecastCount: item["forecast_female_visitor"]
  })) || [];
  const existingDataMaleMonthly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    maleCount: item["male_count"]
  })) || [];
  const additionalDataMaleMonthly = forecast[id]?.forecast_male_count_thirty?.map((item) => ({
    date: item.date,
    maleForecastCount: item["forecast_male_visitor"]
  })) || [];
  const combinedDataGenderMonthly = existingDataFemaleMonthly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleCount: femaleItem.femaleCount,
    maleCount: existingDataMaleMonthly[index]?.maleCount || 0,
  }));
  const combinedForecastDataGenderMonthly = additionalDataFemaleMonthly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleForecastCount: femaleItem.femaleForecastCount,
    maleForecastCount: additionalDataMaleMonthly[index]?.maleForecastCount || 0,
  }));
  //gender yearly
  const existingDataFemaleYearly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    femaleCount: item["female_count"]
  })) || [];
  const additionalDataFemaleYearly = forecast[id]?.forecast_female_count_yearly?.map((item) => ({
    date: item.date,
    femaleForecastCount: item["forecast_female_visitor"]
  })) || [];
  const existingDataMaleYearly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    maleCount: item["male_count"]
  })) || [];
  const additionalDataMaleYearly = forecast[id]?.forecast_male_count_yearly?.map((item) => ({
    date: item.date,
    maleForecastCount: item["forecast_male_visitor"]
  })) || [];
  const combinedDataGenderYearly = existingDataFemaleYearly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleCount: femaleItem.femaleCount,
    maleCount: existingDataMaleYearly[index]?.maleCount || 0,
  }));
  const combinedForecastDataGenderYearly = additionalDataFemaleYearly.map((femaleItem, index) => ({
    date: femaleItem.date,
    femaleForecastCount: femaleItem.femaleForecastCount,
    maleForecastCount: additionalDataMaleYearly[index]?.maleForecastCount || 0,
  }));


  //age weekly
  const existingDataAge0Weekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    ZerotoFifteenAgeCount: item["0-15_age_count"]
  })) || [];
  const additionalDataAge0Weekly = forecast[id]?.forecast_age_zero?.map((item) => ({
    date: item.date,
    ForecastZerotoFifteenAgeCount: item["forecast_age_zero"]
  })) || [];
  const existingDataAge15Weekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    FifteentoThirtyAgeCount: item["15-30_age_count"]
  })) || [];
  const additionalDataAge15Weekly = forecast[id]?.forecast_age_fifteen?.map((item) => ({
    date: item.date,
    ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"]
  })) || [];
  const existingDataAge30Weekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    ThirtytoFourtyfiveAgeCount: item["30-45_age_count"]
  })) || [];
  const additionalDataAge30Weekly = forecast[id]?.forecast_age_thirty?.map((item) => ({
    date: item.date,
    ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"]
  })) || [];
  const existingDataAge45Weekly = forecast[id]?.grouped_data?.map((item) => ({
    date: item.date,
    FourtyfivetoSixtyAgeCount: item["45-60_age_count"]
  })) || [];
  const additionalDataAge45Weekly = forecast[id]?.forecast_age_fourtyfive?.map((item) => ({
    date: item.date,
    ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"]
  })) || [];
  const combinedDataAgeWeekly = existingDataAge0Weekly.map((ageItem, index) => ({
    date: ageItem.date,
    ZerotoFifteenAgeCount: ageItem.ZerotoFifteenAgeCount,
    FifteentoThirtyAgeCount: existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount || 0,
    ThirtytoFourtyfiveAgeCount: existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount || 0,
    FourtyfivetoSixtyAgeCount: existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount || 0,
  }));
  const combinedForecastDataAgeWeekly = additionalDataAge0Weekly.map((ageItem, index) => ({
    date: ageItem.date,
    ForecastZerotoFifteenAgeCount: ageItem.ForecastZerotoFifteenAgeCount,
    ForecastFifteentoThirtyAgeCount: additionalDataAge15Weekly[index]?.ForecastFifteentoThirtyAgeCount || 0,
    ForecastThirtytoFourtyfiveAgeCount: additionalDataAge30Weekly[index]?.ForecastThirtytoFourtyfiveAgeCount || 0,
    ForecastFourtyfivetoSixtyAgeCount: additionalDataAge45Weekly[index]?.ForecastFourtyfivetoSixtyAgeCount || 0,
  }));

  //age monthly
  const additionalDataAge0Monthly = forecast[id]?.forecast_age_zero_thirty?.map((item) => ({
    date: item.date,
    ForecastZerotoFifteenAgeCount: item["forecast_age_zero"]
  })) || [];
  const additionalDataAge15Monthly = forecast[id]?.forecast_age_fifteen_thirty?.map((item) => ({
    date: item.date,
    ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"]
  })) || [];
  const additionalDataAge30Monthly = forecast[id]?.forecast_age_thirty_thirty?.map((item) => ({
    date: item.date,
    ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"]
  })) || [];
  const additionalDataAge45Monthly = forecast[id]?.forecast_age_fourtyfive_thirty?.map((item) => ({
    date: item.date,
    ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"]
  })) || [];
  const combinedDataAgeMonthly = existingDataAge0Weekly.map((ageItem, index) => ({
    date: ageItem.date,
    ZerotoFifteenAgeCount: ageItem.ZerotoFifteenAgeCount,
    FifteentoThirtyAgeCount: existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount || 0,
    ThirtytoFourtyfiveAgeCount: existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount || 0,
    FourtyfivetoSixtyAgeCount: existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount || 0,
  }));
  const combinedForecastDataAgeMonthly = additionalDataAge0Monthly.map((ageItem, index) => ({
    date: ageItem.date,
    ForecastZerotoFifteenAgeCount: ageItem.ForecastZerotoFifteenAgeCount,
    ForecastFifteentoThirtyAgeCount: additionalDataAge15Monthly[index]?.ForecastFifteentoThirtyAgeCount || 0,
    ForecastThirtytoFourtyfiveAgeCount: additionalDataAge30Monthly[index]?.ForecastThirtytoFourtyfiveAgeCount || 0,
    ForecastFourtyfivetoSixtyAgeCount: additionalDataAge45Monthly[index]?.ForecastFourtyfivetoSixtyAgeCount || 0,
  }));
  //age yearly
  const additionalDataAge0Yearly = forecast[id]?.forecast_age_zero_yearly?.map((item) => ({
    date: item.date,
    ForecastZerotoFifteenAgeCount: item["forecast_age_zero"]
  })) || [];
  const additionalDataAge15Yearly = forecast[id]?.forecast_age_fifteen_yearly?.map((item) => ({
    date: item.date,
    ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"]
  })) || [];
  const additionalDataAge30Yearly = forecast[id]?.forecast_age_thirty_yearly?.map((item) => ({
    date: item.date,
    ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"]
  })) || [];
  const additionalDataAge45Yearly = forecast[id]?.forecast_age_fourtyfive_thirty?.map((item) => ({
    date: item.date,
    ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"]
  })) || [];
  const combinedDataAgeYearly = existingDataAge0Weekly.map((ageItem, index) => ({
    date: ageItem.date,
    ZerotoFifteenAgeCount: ageItem.ZerotoFifteenAgeCount,
    FifteentoThirtyAgeCount: existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount || 0,
    ThirtytoFourtyfiveAgeCount: existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount || 0,
    FourtyfivetoSixtyAgeCount: existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount || 0,
  }));
  const combinedForecastDataAgeYearly = additionalDataAge0Yearly.map((ageItem, index) => ({
    date: ageItem.date,
    ForecastZerotoFifteenAgeCount: ageItem.ForecastZerotoFifteenAgeCount,
    ForecastFifteentoThirtyAgeCount: additionalDataAge15Yearly[index]?.ForecastFifteentoThirtyAgeCount || 0,
    ForecastThirtytoFourtyfiveAgeCount: additionalDataAge30Yearly[index]?.ForecastThirtytoFourtyfiveAgeCount || 0,
    ForecastFourtyfivetoSixtyAgeCount: additionalDataAge45Yearly[index]?.ForecastFourtyfivetoSixtyAgeCount || 0,
  }));
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
          <button
            style={
              forecasttype === "Age"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setForecastType("Age")}
          >
            Age
          </button>

          <button
            style={
              forecasttype === "Gender"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setForecastType("Gender")}
          >
            Gender
          </button>

          <button
            style={
              forecasttype === "Total"
                ? { backgroundColor: "#008CBA", color: "white" }
                : {}
            }
            onClick={() => setForecastType("Total")}
          >
            Total
          </button>
        </div>
  
      </div>
      <div className="box box2">2
      
      </div>
      <div className="box box5">
      <button onClick={handleExportPDF}><MdPictureAsPdf /></button>
        <button onClick={handleExportCSV}><MdInsertDriveFile /></button>
      </div>
      <div className='box box4' >
      <OpenAPI type="forecast_page" />
      </div>
      <div className="box box3">CHARTS
      
        <div>
          <h2>{timePeriod} {forecasttype} Number Forecast</h2>
          {timePeriod === "Week" && forecasttype === "Gender" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataGenderWeekly, ...combinedForecastDataGenderWeekly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="femaleCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="maleCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="femaleForecastCount"
              stroke="#FF00FF" // Color for additional female forecast data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional male forecast data */}
            <Line
              type="monotone"
              dataKey="maleForecastCount"
              stroke="#FFFFFF" // Color for additional male forecast data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        {timePeriod === "Month" && forecasttype === "Gender" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataGenderMonthly, ...combinedForecastDataGenderMonthly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="femaleCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="maleCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="femaleForecastCount"
              stroke="#FF00FF" // Color for additional female forecast data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional male forecast data */}
            <Line
              type="monotone"
              dataKey="maleForecastCount"
              stroke="#FFFFFF" // Color for additional male forecast data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        {timePeriod === "Year" && forecasttype === "Gender" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataGenderYearly, ...combinedForecastDataGenderYearly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="femaleCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="maleCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="femaleForecastCount"
              stroke="#FF00FF" // Color for additional female forecast data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional male forecast data */}
            <Line
              type="monotone"
              dataKey="maleForecastCount"
              stroke="#FFFFFF" // Color for additional male forecast data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        {timePeriod === "Week" && forecasttype === "Age" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataAgeWeekly, ...combinedForecastDataAgeWeekly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="FifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="FourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ForecastZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="ForecastFifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastFourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        {timePeriod === "Month" && forecasttype === "Age" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataAgeMonthly, ...combinedForecastDataAgeMonthly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="FifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="FourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ForecastZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="ForecastFifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastFourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        {timePeriod === "Year" && forecasttype === "Age" && (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[...combinedDataAgeMonthly, ...combinedForecastDataAgeYearly]}>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
              labelStyle={{ color: "#333", fontSize: "14px" }}
              position={{ x: 30, y: 40 }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="FifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="FourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing female data */}
            <Line
              type="monotone"
              dataKey="ForecastZerotoFifteenAgeCount"
              stroke="#FFFF42" // Color for existing female data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for existing male data */}
            <Line
              type="monotone"
              dataKey="ForecastFifteentoThirtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastThirtytoFourtyfiveAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
            {/* Render line for additional female forecast data */}
            <Line
              type="monotone"
              dataKey="ForecastFourtyfivetoSixtyAgeCount"
              stroke="#FF0000" // Color for existing male data
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
        </div>
      </div>
    </div>

    
  )
}

export default ForecastPage