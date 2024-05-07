import React, { useState, useEffect, useContext } from "react";
import "./forecastpage.scss";
import { MdPictureAsPdf, MdInsertDriveFile } from "react-icons/md";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings";
import OpenAPI from "../../components/openapi/OpenAPI";
import { AuthContext } from "../../context/AuthContext";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";
const API_KEY = "sk-proj-NM7EApOZLK7KuWBcWEfBT3BlbkFJErnFFbEp22wS15gYTH6X"; // secure -> environment variable

function ForecastPage() {
  const [isLoading, setIsLoading] = useState(false); // add a loading state
  const colors = [
    "#845EC2",
    "#D65DB1",
    "#FF6F91",
    "#FF9671",
    "#FFC75F",
    "#F9F871",
    "#008E9B",
    "#008F7A",
  ];
  let [forecast, setForecast] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  let pathArray = window.location.pathname.split("/");
  let id = pathArray[pathArray.length - 1];
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"
  const [activeSeries, setActiveSeries] = useState([]);

  const handleLegendClick = (dataKey) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey));
    } else {
      setActiveSeries((prev) => [...prev, dataKey]);
    }
  };
  

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(
          `http://127.0.0.1:5000/get_store_data?user_id=${userId}&store_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        setForecast(data);
        setIsLoading(false); // also set loading state to false if an error occurs
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false); // also set loading state to false if an error occurs
      }
    };
    getData();
  }, []);
  console.log(forecast);
  const [timePeriod, setTimePeriod] = useState("Week");
  const [forecasttype, setForecastType] = useState("Gender");
  console.log("hello");
  function round(item) {
    return Math.round(item * 100) / 100;
  }
  //graph datas
  //gender weekly
  const existingDataFemaleWeekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      femaleCount: item["female_count"],
    })) || [];
  const additionalDataFemaleWeekly =
    forecast[id]?.forecast_female_count?.map((item) => ({
      date: item.date,
      femaleForecastCount: item["forecast_female_visitor"],
    })) || [];
  const existingDataMaleWeekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      maleCount: item["male_count"],
    })) || [];
  const additionalDataMaleWeekly =
    forecast[id]?.forecast_male_count?.map((item) => ({
      date: item.date,
      maleForecastCount: item["forecast_male_visitor"],
    })) || [];
  const combinedDataGenderWeekly = existingDataFemaleWeekly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleCount: Math.round(femaleItem.femaleCount),
      maleCount: Math.round(existingDataMaleWeekly[index]?.maleCount) || 0,
    })
  );
  const combinedForecastDataGenderWeekly = additionalDataFemaleWeekly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleForecastCount: round(femaleItem.femaleForecastCount),
      maleForecastCount:
        round(additionalDataMaleWeekly[index]?.maleForecastCount) || 0,
    })
  );
  //gender monthly
  const existingDataFemaleMonthly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      femaleCount: item["female_count"],
    })) || [];
  const additionalDataFemaleMonthly =
    forecast[id]?.forecast_female_count_thirty?.map((item) => ({
      date: item.date,
      femaleForecastCount: item["forecast_female_visitor"],
    })) || [];
  const existingDataMaleMonthly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      maleCount: item["male_count"],
    })) || [];
  const additionalDataMaleMonthly =
    forecast[id]?.forecast_male_count_thirty?.map((item) => ({
      date: item.date,
      maleForecastCount: item["forecast_male_visitor"],
    })) || [];
  const combinedDataGenderMonthly = existingDataFemaleMonthly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleCount: Math.round(femaleItem.femaleCount),
      maleCount: Math.round(existingDataMaleMonthly[index]?.maleCount) || 0,
    })
  );
  const combinedForecastDataGenderMonthly = additionalDataFemaleMonthly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleForecastCount: round(femaleItem.femaleForecastCount),
      maleForecastCount:
        round(additionalDataMaleMonthly[index]?.maleForecastCount) || 0,
    })
  );
  //gender yearly
  const existingDataFemaleYearly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      femaleCount: item["female_count"],
    })) || [];
  const additionalDataFemaleYearly =
    forecast[id]?.forecast_female_count_yearly?.map((item) => ({
      date: item.date,
      femaleForecastCount: item["forecast_female_visitor"],
    })) || [];
  const existingDataMaleYearly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      maleCount: item["male_count"],
    })) || [];
  const additionalDataMaleYearly =
    forecast[id]?.forecast_male_count_yearly?.map((item) => ({
      date: item.date,
      maleForecastCount: item["forecast_male_visitor"],
    })) || [];
  const combinedDataGenderYearly = existingDataFemaleYearly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleCount: Math.round(femaleItem.femaleCount),
      maleCount: Math.round(existingDataMaleYearly[index]?.maleCount) || 0,
    })
  );
  const combinedForecastDataGenderYearly = additionalDataFemaleYearly.map(
    (femaleItem, index) => ({
      date: femaleItem.date,
      femaleForecastCount: round(femaleItem.femaleForecastCount),
      maleForecastCount:
        round(additionalDataMaleYearly[index]?.maleForecastCount) || 0,
    })
  );

  //age weekly
  const existingDataAge0Weekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      ZerotoFifteenAgeCount: item["0-15_age_count"],
    })) || [];
  const additionalDataAge0Weekly =
    forecast[id]?.forecast_age_zero?.map((item) => ({
      date: item.date,
      ForecastZerotoFifteenAgeCount: item["forecast_age_zero"],
    })) || [];
  const existingDataAge15Weekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      FifteentoThirtyAgeCount: item["15-30_age_count"],
    })) || [];
  const additionalDataAge15Weekly =
    forecast[id]?.forecast_age_fifteen?.map((item) => ({
      date: item.date,
      ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"],
    })) || [];
  const existingDataAge30Weekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      ThirtytoFourtyfiveAgeCount: item["30-45_age_count"],
    })) || [];
  const additionalDataAge30Weekly =
    forecast[id]?.forecast_age_thirty?.map((item) => ({
      date: item.date,
      ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"],
    })) || [];
  const existingDataAge45Weekly =
    forecast[id]?.grouped_data?.map((item) => ({
      date: item.date,
      FourtyfivetoSixtyAgeCount: item["45-60_age_count"],
    })) || [];
  const additionalDataAge45Weekly =
    forecast[id]?.forecast_age_fourtyfive?.map((item) => ({
      date: item.date,
      ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"],
    })) || [];
  const combinedDataAgeWeekly = existingDataAge0Weekly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ZerotoFifteenAgeCount: Math.round(ageItem.ZerotoFifteenAgeCount),
      FifteentoThirtyAgeCount:
        Math.round(existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount) ||
        0,
      ThirtytoFourtyfiveAgeCount:
        Math.round(
          existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount
        ) || 0,
      FourtyfivetoSixtyAgeCount:
        Math.round(existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount) ||
        0,
    })
  );
  const combinedForecastDataAgeWeekly = additionalDataAge0Weekly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ForecastZerotoFifteenAgeCount: round(ageItem.ForecastZerotoFifteenAgeCount),
      ForecastFifteentoThirtyAgeCount:
        round(additionalDataAge15Weekly[index]?.ForecastFifteentoThirtyAgeCount) || 0,
      ForecastThirtytoFourtyfiveAgeCount:
        round(additionalDataAge30Weekly[index]?.ForecastThirtytoFourtyfiveAgeCount) ||
        0,
      ForecastFourtyfivetoSixtyAgeCount:
        round(additionalDataAge45Weekly[index]?.ForecastFourtyfivetoSixtyAgeCount) ||
        0,
    })
  );

  //age monthly
  const additionalDataAge0Monthly =
    forecast[id]?.forecast_age_zero_thirty?.map((item) => ({
      date: item.date,
      ForecastZerotoFifteenAgeCount: item["forecast_age_zero"],
    })) || [];
  const additionalDataAge15Monthly =
    forecast[id]?.forecast_age_fifteen_thirty?.map((item) => ({
      date: item.date,
      ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"],
    })) || [];
  const additionalDataAge30Monthly =
    forecast[id]?.forecast_age_thirty_thirty?.map((item) => ({
      date: item.date,
      ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"],
    })) || [];
  const additionalDataAge45Monthly =
    forecast[id]?.forecast_age_fourtyfive_thirty?.map((item) => ({
      date: item.date,
      ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"],
    })) || [];
  const combinedDataAgeMonthly = existingDataAge0Weekly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ZerotoFifteenAgeCount:Math.round( ageItem.ZerotoFifteenAgeCount),
      FifteentoThirtyAgeCount:
        Math.round(existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount )|| 0,
      ThirtytoFourtyfiveAgeCount:
        Math.round(existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount) || 0,
      FourtyfivetoSixtyAgeCount:
        Math.round( existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount) || 0,
    })
  );
  const combinedForecastDataAgeMonthly = additionalDataAge0Monthly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ForecastZerotoFifteenAgeCount:round( ageItem.ForecastZerotoFifteenAgeCount),
      ForecastFifteentoThirtyAgeCount:
       round( additionalDataAge15Monthly[index]?.ForecastFifteentoThirtyAgeCount) || 0,
      ForecastThirtytoFourtyfiveAgeCount:
       round( additionalDataAge30Monthly[index]?.ForecastThirtytoFourtyfiveAgeCount) ||
        0,
      ForecastFourtyfivetoSixtyAgeCount:
        round(additionalDataAge45Monthly[index]?.ForecastFourtyfivetoSixtyAgeCount) ||
        0,
    })
  );
  //age yearly
  const additionalDataAge0Yearly =
    forecast[id]?.forecast_age_zero_yearly?.map((item) => ({
      date: item.date,
      ForecastZerotoFifteenAgeCount: item["forecast_age_zero"],
    })) || [];
  const additionalDataAge15Yearly =
    forecast[id]?.forecast_age_fifteen_yearly?.map((item) => ({
      date: item.date,
      ForecastFifteentoThirtyAgeCount: item["forecast_age_fifteen"],
    })) || [];
  const additionalDataAge30Yearly =
    forecast[id]?.forecast_age_thirty_yearly?.map((item) => ({
      date: item.date,
      ForecastThirtytoFourtyfiveAgeCount: item["forecast_age_thirty"],
    })) || [];
  const additionalDataAge45Yearly =
    forecast[id]?.forecast_age_fourtyfive_thirty?.map((item) => ({
      date: item.date,
      ForecastFourtyfivetoSixtyAgeCount: item["forecast_age_fourtyfive"],
    })) || [];
  const combinedDataAgeYearly = existingDataAge0Weekly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ZerotoFifteenAgeCount: Math.round(ageItem.ZerotoFifteenAgeCount),
      FifteentoThirtyAgeCount:
        Math.round(existingDataAge15Weekly[index]?.FifteentoThirtyAgeCount) || 0,
      ThirtytoFourtyfiveAgeCount:
      Math.round(existingDataAge30Weekly[index]?.ThirtytoFourtyfiveAgeCount) || 0,
      FourtyfivetoSixtyAgeCount:
      Math.round(existingDataAge45Weekly[index]?.FourtyfivetoSixtyAgeCount) || 0,
    })
  );
  const combinedForecastDataAgeYearly = additionalDataAge0Yearly.map(
    (ageItem, index) => ({
      date: ageItem.date,
      ForecastZerotoFifteenAgeCount: round(ageItem.ForecastZerotoFifteenAgeCount),
      ForecastFifteentoThirtyAgeCount:
        round(additionalDataAge15Yearly[index]?.ForecastFifteentoThirtyAgeCount )|| 0,
      ForecastThirtytoFourtyfiveAgeCount:
        round(additionalDataAge30Yearly[index]?.ForecastThirtytoFourtyfiveAgeCount) ||
        0,
      ForecastFourtyfivetoSixtyAgeCount:
        round(additionalDataAge45Yearly[index]?.ForecastFourtyfivetoSixtyAgeCount) ||
        0,
    })
  );
  const handleExportPDF = () => {
    const input1 = document.getElementById('divToPrint1');
    const input2 = document.getElementById('divToPrint2');
  
    const originalBackgroundColor1 = input1.style.backgroundColor;
    const originalBackgroundColor2 = input2.style.backgroundColor;
  
    input1.style.backgroundColor = '#2a3447'; // Set the background color you want
    input2.style.backgroundColor = '#2a3447'; // Set the background color you want
  
    const pdf = new jsPDF();
    let imgHeight = 0;
  
    html2canvas(input1)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        imgHeight = canvas.height * 208 / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, 208, imgHeight);
        return html2canvas(input2);
      })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'JPEG', 0, imgHeight, 208, canvas.height * 208 / canvas.width);
        pdf.save("download.pdf");
      })
      .finally(() => {
        input1.style.backgroundColor = originalBackgroundColor1; // Restore the original background color
        input2.style.backgroundColor = originalBackgroundColor2; // Restore the original background color
      });
  };
  const handleExportCSV = () => {
    // Implement CSV export logic here
  };

  return (
    <div className="forecast">
      <div className="box box1">
        <div className="half">
          <h2>Choose Timeframe</h2>
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
         
        </div>
      </div>
      <div className="box box1">
        <div className="half">
          <h2>Choose Category</h2>
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

         
        </div>
      </div>
      <div className="box box2"></div>
      <div className="box box5">
        <button onClick={handleExportPDF}>
          <MdPictureAsPdf />
        </button>
        <button onClick={handleExportCSV}>
          <MdInsertDriveFile />
        </button>
      </div>
      <div className="box box4" id="divToPrint2">
        <OpenAPI type="forecast_page" {...combinedDataAgeMonthly} />
      </div>
      <div className="box box3" id="divToPrint1">
        CHARTS
        <div>
          {isLoading ? (
            <div className="centered">
              <RingLoader
                color="#ffff"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div>
              <h2>
                {forecasttype} Forecast for {timePeriod}{" "}
              </h2>
              {timePeriod === "Week" && forecasttype === "Gender" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataGenderWeekly,
                      ...combinedForecastDataGenderWeekly,
                    ]}
                  >
                    <Tooltip
                      contenLineCharttStyle={{
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        border: "1px solid #fff",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#fff", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    {/* Render line for existing female data */}
                    <Line
                      hide={activeSeries.includes("femaleCount")}
                      type="monotone"
                      name="Female Count"
                      dataKey="femaleCount"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes("maleCount")}
                      type="monotone"
                      name="Male Count"
                      dataKey="maleCount"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("femaleForecastCount")}
                      type="monotone"
                      name="Forcested Female Count"
                      dataKey="femaleForecastCount"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional male forecast data */}
                    <Line
                      hide={activeSeries.includes("maleForecastCount")}
                      type="monotone"
                      name="Forcested Male Count"
                      dataKey="maleForecastCount"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {timePeriod === "Month" && forecasttype === "Gender" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataGenderMonthly,
                      ...combinedForecastDataGenderMonthly,
                    ]}
                  >
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#333", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    <Line
                      hide={activeSeries.includes("femaleCount")}
                      type="monotone"
                      name="Female Count"
                      dataKey="femaleCount"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes("maleCount")}
                      type="monotone"
                      name="Male Count"
                      dataKey="maleCount"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("femaleForecastCount")}
                      type="monotone"
                      name="Forcested Female Count"
                      dataKey="femaleForecastCount"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional male forecast data */}
                    <Line
                      hide={activeSeries.includes("maleForecastCount")}
                      type="monotone"
                      name="Forcested Male Count"
                      dataKey="maleForecastCount"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {timePeriod === "Year" && forecasttype === "Gender" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataGenderYearly,
                      ...combinedForecastDataGenderYearly,
                    ]}
                  >
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#333", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    <Line
                      hide={activeSeries.includes("femaleCount")}
                      type="monotone"
                      name="Female Count"
                      dataKey="femaleCount"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes("maleCount")}
                      type="monotone"
                      name="Male Count"
                      dataKey="maleCount"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("femaleForecastCount")}
                      type="monotone"
                      name="Forcested Female Count"
                      dataKey="femaleForecastCount"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional male forecast data */}
                    <Line
                      hide={activeSeries.includes("maleForecastCount")}
                      type="monotone"
                      name="Forcested Male Count"
                      dataKey="maleForecastCount"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {timePeriod === "Week" && forecasttype === "Age" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataAgeWeekly,
                      ...combinedForecastDataAgeWeekly,
                    ]}
                  >
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#333", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    {/* Render line for existing female data */}
                    <Line
                      hide={activeSeries.includes("ZerotoFifteenAgeCount")}
                      type="monotone"
                      dataKey="ZerotoFifteenAgeCount"
                      name="0-15"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastZerotoFifteenAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastZerotoFifteenAgeCount"
                      name="Forecasted 0-15"
                      stroke={colors[4]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes("FifteentoThirtyAgeCount")}
                      type="monotone"
                      dataKey="FifteentoThirtyAgeCount"
                      name="15-30"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFifteentoThirtyAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastFifteentoThirtyAgeCount"
                      name="Forecasted 15-30"
                      stroke={colors[5]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("ThirtytoFourtyfiveAgeCount")}
                      type="monotone"
                      dataKey="ThirtytoFourtyfiveAgeCount"
                      name="30-45"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastThirtytoFourtyfiveAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastThirtytoFourtyfiveAgeCount"
                      name="Forecasted 30-45"
                      stroke={colors[6]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("FourtyfivetoSixtyAgeCount")}
                      type="monotone"
                      dataKey="FourtyfivetoSixtyAgeCount"
                      name="45-60"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing female data */}
                    {/* Render line for existing male data */}
                    {/* Render line for additional female forecast data */}
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFourtyfivetoSixtyAgeCount"
                      )}
                      type="monotone"
                      name="Forecasted 45-60"
                      dataKey="ForecastFourtyfivetoSixtyAgeCount"
                      stroke={colors[7]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {timePeriod === "Month" && forecasttype === "Age" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataAgeMonthly,
                      ...combinedForecastDataAgeMonthly,
                    ]}
                  >
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#333", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    {/* Render line for existing female data */}
                    <Line
                      hide={activeSeries.includes("ZerotoFifteenAgeCount")}
                      type="monotone"
                      dataKey="ZerotoFifteenAgeCount"
                      name="0-15"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastZerotoFifteenAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastZerotoFifteenAgeCount"
                      name="Forecasted 0-15"
                      stroke={colors[4]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes("FifteentoThirtyAgeCount")}
                      type="monotone"
                      dataKey="FifteentoThirtyAgeCount"
                      name="15-30"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFifteentoThirtyAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastFifteentoThirtyAgeCount"
                      name="Forecasted 15-30"
                      stroke={colors[5]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("ThirtytoFourtyfiveAgeCount")}
                      type="monotone"
                      dataKey="ThirtytoFourtyfiveAgeCount"
                      name="30-45"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastThirtytoFourtyfiveAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastThirtytoFourtyfiveAgeCount"
                      name="Forecasted 30-45"
                      stroke={colors[6]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("FourtyfivetoSixtyAgeCount")}
                      type="monotone"
                      dataKey="FourtyfivetoSixtyAgeCount"
                      name="45-60"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing female data */}
                    {/* Render line for existing male data */}
                    {/* Render line for additional female forecast data */}
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFourtyfivetoSixtyAgeCount"
                      )}
                      type="monotone"
                      name="Forecasted 45-60"
                      dataKey="ForecastFourtyfivetoSixtyAgeCount"
                      stroke={colors[7]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {timePeriod === "Year" && forecasttype === "Age" && (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={[
                      ...combinedDataAgeMonthly,
                      ...combinedForecastDataAgeYearly,
                    ]}
                  >
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      labelStyle={{ color: "#333", fontSize: "14px" }}
                      position={{ x: 30, y: 40 }}
                    />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis stroke="white" />
                    {/* Render line for existing female data */}
                    <Line
                      hide={activeSeries.includes("ZerotoFifteenAgeCount")}
                      type="monotone"
                      dataKey="ZerotoFifteenAgeCount"
                      name="0-15"
                      stroke={colors[0]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing male data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastZerotoFifteenAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastZerotoFifteenAgeCount"
                      name="Forecasted 0-15"
                      stroke={colors[4]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes("FifteentoThirtyAgeCount")}
                      type="monotone"
                      dataKey="FifteentoThirtyAgeCount"
                      name="15-30"
                      stroke={colors[1]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFifteentoThirtyAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastFifteentoThirtyAgeCount"
                      name="Forecasted 15-30"
                      stroke={colors[5]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("ThirtytoFourtyfiveAgeCount")}
                      type="monotone"
                      dataKey="ThirtytoFourtyfiveAgeCount"
                      name="30-45"
                      stroke={colors[2]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      hide={activeSeries.includes(
                        "ForecastThirtytoFourtyfiveAgeCount"
                      )}
                      type="monotone"
                      dataKey="ForecastThirtytoFourtyfiveAgeCount"
                      name="Forecasted 30-45"
                      stroke={colors[6]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes("FourtyfivetoSixtyAgeCount")}
                      type="monotone"
                      dataKey="FourtyfivetoSixtyAgeCount"
                      name="45-60"
                      stroke={colors[3]}
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Render line for existing female data */}
                    {/* Render line for existing male data */}
                    {/* Render line for additional female forecast data */}
                    {/* Render line for additional female forecast data */}
                    <Line
                      hide={activeSeries.includes(
                        "ForecastFourtyfivetoSixtyAgeCount"
                      )}
                      type="monotone"
                      name="Forecasted 45-60"
                      dataKey="ForecastFourtyfivetoSixtyAgeCount"
                      stroke={colors[7]}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Legend
                      onClick={(data) => handleLegendClick(data.dataKey)}
                    />{" "}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForecastPage;
