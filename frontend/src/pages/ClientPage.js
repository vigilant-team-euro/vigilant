// ClientPage.js
import Header from "../components/Header.js";
import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import "./home.css";
import StoreComponent from "../components/StoreComponent.js";
import StoresList from "../components/StoresList.js";

export default function ClientPage() {
  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 15, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="row g-3 mx-2 mt-1 d-flex align-items-center">
      {/* 1st Column */}
      <div className="col-lg-3 d-flex flex-column">
        <ChartCard
          title="Monthly Customers"
          type="bar"
          data={chartData}
          options={chartOptions}
        />

        <ChartCard
          title="Customer Satisfaction"
          type="doughnut"
          data={chartData}
          options={chartOptions}
        />
      </div>

      {/* 2nd Column - Single Rectangle */}
      <div className="col-lg-6 d-flex flex-column">
        <StoresList
          title="My Stores"
          type="line"
          data={chartData}
          options={chartOptions}
        />

        <StoreComponent
          title="Details and Settings"
          type="line"
          data={chartData}
          options={chartOptions}
        />
      </div>

      {/* 3rd Column - Same as 1st Column */}
      <div className="col-lg-3 d-flex flex-column">
        <ChartCard
          title="Customer Satisfaction"
          type="polarArea"
          data={chartData}
          options={chartOptions}
        />
        <ChartCard
          title="Customer Demographics"
          type="line"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
