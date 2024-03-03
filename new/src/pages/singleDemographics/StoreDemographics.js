import React from "react";
import "./storedemographics.scss";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import GraphSettings from "../../components/graphSettings/GraphSettings";

function StoreDemographics(props) {
  const genderAnalysis = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
  ];
  const moodAnalysis = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
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
    number: "11.238",
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
      <div className="box box1"><GraphSettings id={"Store1"}/></div>

      <div className="box box4">Store Name?</div>
      <div className="box box5">
        <BarChartBox {...ageAnalysis} />
      </div>

      <div className="box box7">
        <ChartBox {...totalCustomer} />
      </div>
      <div className="box box3">Put Heatmap?</div>
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
