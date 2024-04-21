import React, { useEffect, useState, useContext } from "react";
import "./storedemographics.scss";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { fetchAllFromSingleStore,fetchImageUrl } from "../../components/fetchData/FetchDataUtils";
import { AuthContext } from "../../context/AuthContext";

import ReactSlider from "react-slider";
import { Canvas } from "react-canvas-js";
import Heatmap from "../../components/heatmap/Heatmap";
function StoreDemographics(props) {
  const [imageUrl, setImageUrl] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const { id } = useParams();
  const location = useLocation();
  const storeName = location.state.storeName;

  const [timePeriod, setTimePeriod] = useState("All");

  const [testdata, setTestData] = useState([]);
  const dataLocation = `users/${userId}/stores/${id}/data`;

  const [sliderValue, setSliderValue] = useState(0);
  const canvasData = {
    labels: ["Slider Value"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [sliderValue],
      },
    ],
  };

  function isInTimePeriod(timestamp, timePeriod) {
    const now = Date.now();
    const frameTime =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

    switch (timePeriod) {
      case "Week":
        return now - frameTime <= 7 * 24 * 60 * 60 * 1000;
      case "Month":
        return now - frameTime <= 30 * 24 * 60 * 60 * 1000;
      case "Year":
        return now - frameTime <= 365 * 24 * 60 * 60 * 1000;
      case "All":
        return true;
      default:
        return false;
    }
  }
  useEffect(() => {
    const fetchImage = async () => {
      const imagePath = `gs://vigilant-36758.appspot.com/${userId}/${storeName}/cs_fair_camera_2024-04-21 13:08:12.895000.png`; // replace with your image path
      try {
        const url = await fetchImageUrl(imagePath);
        console.log("url", url);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    fetchImage();
  }, []);
  //console.log(id); // Print storeData to console
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesLocation = dataLocation; // Replace with your actual users collection name
        const result = await fetchAllFromSingleStore(storesLocation);
        //console.log("result" ,result)
        setTestData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dataLocation]);
  const sumUserFramesData = (framesData) => {
    console.log("framesData:", framesData); // Add this line

    let sumData = {
      happy_count: 0,
      surprise_count: 0,
      sad_count: 0,
      customer_count: 0,
      male_count: 0,
      fear_count: 0,
      neutral_count: 0,
      average_age: 0,
      female_count: 0,
    };

    if (framesData === undefined) {
      return sumData;
    }
    framesData.forEach((frame) => {
      frame.framesData.forEach((frameData) => {
        if (isInTimePeriod(frameData.start_date, timePeriod)) {
          sumData.happy_count += frameData.happy_count || 0;
          sumData.surprise_count += frameData.surprise_count || 0;
          sumData.sad_count += frameData.sad_count || 0;
          sumData.customer_count += frameData.customer_count || 0;
          sumData.male_count += frameData.male_count || 0;
          sumData.fear_count += frameData.fear_count || 0;
          sumData.neutral_count += frameData.neutral_count || 0;
          sumData.average_age += frameData.average_age || 0;
          sumData.female_count += frameData.female_count || 0;
        }
      });
    });

    return sumData;
  };
  const storeData = sumUserFramesData(testdata);
  const genderAnalysis = [
    { name: "Male", value: storeData.male_count, color: "#0088FE" },
    { name: "Female", value: storeData.female_count, color: "#00C49F" },
  ];
  const moodAnalysis = [
    { name: "Happy", value: storeData.happy_count, color: "#0088FE" },
    { name: "Surprise", value: storeData.surprise_count, color: "#00C49F" },
    { name: "Sad", value: storeData.sad_count, color: "#FFBB28" },
    { name: "Fear", value: storeData.fear_count, color: "#FF8042" },
    { name: "Neutral", value: storeData.neutral_count, color: "#8884d8" },
  ];
  const ageAnalysis = {
    title: "Customer Age",
    color: "#FF8042",
    dataKey: "visit",
    chartData: [
      {
        name: "Sun",
        visit: 4000,
      },
      {
        name: "Mon",
        visit: 3000,
      },
      {
        name: "Tue",
        visit: 2000,
      },
      {
        name: "Wed",
        visit: 2780,
      },
      {
        name: "Thu",
        visit: 1890,
      },
      {
        name: "Fri",
        visit: 2390,
      },
      {
        name: "Sat",
        visit: 3490,
      },
    ],
  };
  const totalCustomer = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Customers",
    number: storeData.customer_count.toString(),
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };
  return (
    <div className="storeview">
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
        <div className="half">
          <GraphSettings id={id} />
        </div>
      </div>

      <div className="box box4">
        <h1>Store: {storeName.toUpperCase()}</h1>{" "}
      </div>
      <div className="box box5">
        <BarChartBox {...ageAnalysis} />
      </div>

      <div className="box box7">
        <ChartBox {...totalCustomer} />
      </div>
      <div className="box box3">
      <img src={imageUrl} alt="store" />
      </div>
      <div className="box box6">
        <PieChartBox data={genderAnalysis} title="Gender Analysis" />
      </div>
      <div className="box box2">
        <PieChartBox data={moodAnalysis} title="Mood Analysis" />
      </div>
    </div>
  );
}

export default StoreDemographics;
