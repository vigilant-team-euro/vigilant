import Header from "../components/Header.js";
import { useEffect, useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import "./home.css";
import StoreComponent from "../components/StoreComponent.js";
import StoresList from "../components/StoresList.js";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

export default function ClientPage() {
  const [count, setCount] = useState([]);
  const [genders, setGenders] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [ages, setAges] = useState([]);

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': 'gulpa_nut' })
  };
    fetch('http://localhost:5000/getEmotions', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = [data["happy"], data["sad"],data["neutral"],data["surprise"],data["fear"],data["angry"]];
        setEmotions(items)
      })
  },[])

  const chartDataEmotion = {
    labels: ["happy", "sad", "neutral", "surprise", "fear", "angry"],
    datasets: [
      {
        label: "Customer Satisfaction",
        data: emotions,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': 'gulpa_nut' })
  };
    fetch('http://localhost:5000/getGenders', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = [data["male"], data["female"]];
        
        setGenders(items)
      })
  },[])

  const chartDataGender = {
    labels: ["male", "female"],
    datasets: [
      {
        label: "Customer Demographics",
        data: genders,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': 'gulpa_nut' })
  };
    fetch('http://localhost:5000/getCustomerDaily', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = data;
        
        setCount(items)
      })
  },[])
  
  const chartDataDaily = {
    labels: ["feb", "mar","apr","may", "jun"],
    datasets: [
      {
        label: "Customer Demographics",
        data: count,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': 'gulpa_nut' })
  };
    fetch('http://localhost:5000/getCustomerDaily', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = data;
        
        setCount(items)
      })
  },[])
  
  const chartDataAge = {
    labels: ["0-20", "20-30","30-40","40-50", "50-60", "60+"],
    datasets: [
      {
        label: "Customer Demographics",
        data: count,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
    <div className="row g-3 mx-2 mt-1">
      {/* 1st Column */}
      <div className="col-lg-3">
        <ChartCard
          title="Daily Customers"
          type="line"
          data={chartDataDaily}
          options={chartOptions}
        />

        <ChartCard
          title="Customer Satisfaction"
          type="bar"
          data={chartDataEmotion}
          options={chartOptions}
        />

        <ChartCard
          title="Customer Demographics"
          type="bar"
          data={chartDataGender}
          options={chartOptions}
        />
      </div>

      {/* 2nd Column - Single Rectangle */}
      <div className="col-lg-6">
        <StoresList
          title="My Stores"
          type="line"
          height="17.7vh"
          data={chartDataDaily}
          options={chartOptions}
        />

        <StoreComponent
          title="Details and Settings"
          type="line"
          height="70vh"

          data={chartDataDaily}
          options={chartOptions}
        />
      </div>

      {/* 3rd Column - Same as 1st Column */}
      <div className="col-lg-3">
        <ChartCard
          title="Customer Satisfaction"
          type="bar"
          data={chartDataEmotion}
          options={chartOptions}
        />
        <ChartCard
          title="Customer Ages"
          type="bar"
          data={chartDataAge}
          options={chartOptions}
        />
        <ChartCard
          title="Monthly Customers"
          type="line"
          data={chartDataDaily}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
