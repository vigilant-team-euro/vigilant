import React from "react";
import "./storedemographics.scss";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function StoreDemographics(props) {
  const { id } = useParams();
  const location = useLocation();
  const storeName = location.state.storeName;
  const storeData = location.state.storeData;

  console.log(storeData); // Print storeData to console

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
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
          <button>All</button>
        </div>
        <div className="half">
          <GraphSettings id={id}/>
        </div>
      </div>

      <div className="box box4">
      <h1>Store: {storeName.toUpperCase()}</h1>      </div>
      <div className="box box5">
        <BarChartBox {...ageAnalysis} />
      </div>

      <div className="box box7">
        <ChartBox {...totalCustomer} />
      </div>
      <div className="box box3">heatmap</div>
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
