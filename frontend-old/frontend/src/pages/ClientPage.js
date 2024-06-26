// ClientPage.js
import Header from "../components/Header.js";
import { useEffect, useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import "./home.css";
import StoreComponent from "../components/StoreComponent.js";
import StoresList from "../components/StoresList.js";

export default function ClientPage() {
  const [count, setCount] = useState([]);
  const [genders, setGenders] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [ages, setAges] = useState([]);
  const [selectedStore, setSelectedStore] = useState('store2');
  
  const [errorEmotion, setErrorEmotion] = useState(null);
  const [errorGender, setErrorGender] = useState(null);
  const [errorDaily, setErrorDaily] = useState(null);
  const [errorAge, setErrorAge] = useState(null);


  function getDates(){
    var dates = []
    const today = new Date()
    var a = 4
    while (a >= 0){
      dates.push((today.getDate() - a) +"/"+ (today.getMonth() +1))
      a = a - 1;
    }

    return dates;
  }

  const changeStoreName = (storeName) => {
    setSelectedStore(storeName)
  }

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': selectedStore })
  };
    fetch('http://localhost:5000/getEmotions', myParams)
      .then((response) => response.json())
      .then((data) => {
        const items = [data["happy"], data["sad"], data["neutral"], data["surprise"], data["fear"], data["angry"]];
        setEmotions(items);
        setErrorEmotion(null);
      })
      .catch((error) => {
        setErrorEmotion(error.message);
      });
  },[selectedStore])

  const chartDataEmotion = {
    labels: ["happy", "sad", "neutral", "surprise", "fear", "angry"],
    datasets: [
      {

        label: "Dataset 1",
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(58, 77, 255, 1)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(58, 77, 255, 1)',
        ],

        label: "Customer Satisfaction",
        data: emotions,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': selectedStore })
  };
    fetch('http://localhost:5000/getGenders', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = [data["male"], data["female"]];
        
        setGenders(items)
      })
      .catch((error)=>{
        setErrorGender(error.message);
      })
  },[selectedStore])

  const chartDataGender = {
    labels: ["male", "female"],
    datasets: [
      {
        label: "Customer Demographics",
        data: genders,
        backgroundColor: [
          'rgba(58, 77, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderColor: [
          'rgba(58, 77, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var myParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'branch_name': selectedStore })
  };
    fetch('http://localhost:5000/getCustomerDaily', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = data;
        setCount(items)
      })
      .catch((error)=>{
        setErrorDaily(error.message);
      })
  },[selectedStore])


  const chartDataDaily = {
    labels: getDates(),
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
      body: JSON.stringify({ 'branch_name': selectedStore })
  };
    fetch('http://localhost:5000/getAges', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = data;
        
        setAges(items)
      })
      .catch((error)=>{
        setErrorAge(error.message);
      })
  },[selectedStore])
  
  const chartDataAge = {
    labels: ["0-20", "20-30","30-40","40-50", "50-60", "60+"],
    datasets: [
      {
        label: "Customer Demographics",
        data: ages,
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
          title="Daily Customers"
          type="line"
          data={chartDataDaily}
          options={chartOptions}
          error={errorDaily}
        />
        <ChartCard
          title="Customer Demographics"
          type="pie"
          data={chartDataGender}
          options={chartOptions}
          error = {errorGender}
        />
      </div>

      {/* 2nd Column - Single Rectangle */}
      <div className="col-lg-6 d-flex flex-column">
        <StoresList
          title={"My Stores (" + selectedStore + ")"}
          type="line"

          height="17.7vh"
          data={chartDataDaily}
          options={chartOptions}
          getStoreName={changeStoreName}
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
      <div className="col-lg-3 d-flex flex-column">
      <ChartCard
          title="Customer Satisfaction"
          type="doughnut"
          data={chartDataEmotion}
          options={chartOptions}
          error={errorEmotion}
        />
      <ChartCard
          title="Customer Ages"
          type="bar"
          data={chartDataAge}
          options={chartOptions}
          error={errorAge}
        />
      </div>
    </div>
  );
}
