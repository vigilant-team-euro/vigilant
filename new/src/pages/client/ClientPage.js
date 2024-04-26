import React, { useState, useEffect, useContext } from "react";
import "./clientpage.scss";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import { ResponsiveContainer,LineChart, Treemap, Sankey, Line, Tooltip } from "recharts";
import {
  fetchAllForUser,
  fetchUserStores,
} from "../../components/fetchData/FetchDataUtils";
import { AuthContext } from "../../context/AuthContext";
import TreeMapBox from "../../components/treeMap/TreeMapBox";
import GraphSettings from "../../components/graphSettings/GraphSettings";
import OpenAPI from "../../components/openapi/OpenAPI";

function ClientPage() {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [testdata, setTestData] = useState([]);
  const dataLocation = `users/${userId}/stores`;
  const [userStores, setUserStores] = useState([]);
  const [timePeriod, setTimePeriod] = useState("All");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesLocation = dataLocation; // Replace with your actual users collection name
        const result = await fetchAllForUser(storesLocation);

        setTestData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dataLocation]);
  useEffect(() => {
    const fetchData = async () => {
      const stores = await fetchUserStores(userId);
      setUserStores(stores);
    };

    fetchData();
  }, [userId]);
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
  const sumUserFramesData = (framesData) => {
    //console.log('framesData:', framesData); // Add this line

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
    //console.log('sumData:', sumData); // Add this line

    return sumData;
  };
  const storesData = userStores.map((store) => {
    const foundData = testdata.find((data) => data.storeId === store.storeId);
    const storedata = sumUserFramesData(foundData?.userFramesData);
    console.log(storedata);
    return {
      name: store.storeName,
      storeId: store.storeId,
      storeData: storedata,
      size: 100,
    };
  });
  const sumStoresData = () => {
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

    storesData.forEach((store) => {
      const storeData = store.storeData;

      sumData.happy_count += storeData.happy_count || 0;
      sumData.surprise_count += storeData.surprise_count || 0;
      sumData.sad_count += storeData.sad_count || 0;
      sumData.customer_count += storeData.customer_count || 0;
      sumData.male_count += storeData.male_count || 0;
      sumData.fear_count += storeData.fear_count || 0;
      sumData.neutral_count += storeData.neutral_count || 0;
      sumData.average_age += storeData.average_age || 0;
      sumData.female_count += storeData.female_count || 0;
    });
    return sumData;
  };

  // Call the function
  const totalData = sumStoresData();
  //console.log(totalData);
  //instead of static data, use "testData" generated above
  const totalCustomer = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Customers",
    number: totalData.customer_count.toString(),
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
  const moodAnalysis = [
    { name: "Happy", value: totalData.happy_count, color: "#0088FE" },
    { name: "Surprise", value: totalData.surprise_count, color: "#00C49F" },
    { name: "Sad", value: totalData.sad_count, color: "#FFBB28" },
    { name: "Fear", value: totalData.fear_count, color: "#FF8042" },
    { name: "Neutral", value: totalData.neutral_count, color: "#8884d8" },
  ];
  const genderAnalysis = [
    { name: "Male", value: totalData.male_count, color: "#0088FE" },
    { name: "Female", value: totalData.female_count, color: "#00C49F" },
  ];

  const ages = [
    10, 5, 15, 18, 23, 34, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
  ];

  const ageRanges = [
    { range: "10-20", count: 0 },
    { range: "20-30", count: 0 },
    { range: "30-40", count: 0 },
    { range: "40-50", count: 0 },
    { range: "50-60", count: 0 },
    { range: "60-70", count: 0 },
    { range: "70-80", count: 0 },
  ];

  ages.forEach((age) => {
    if (age >= 10 && age < 20) ageRanges[0].count++;
    else if (age >= 20 && age < 30) ageRanges[1].count++;
    else if (age >= 30 && age < 40) ageRanges[2].count++;
    else if (age >= 40 && age < 50) ageRanges[3].count++;
    else if (age >= 50 && age < 60) ageRanges[4].count++;
    else if (age >= 60 && age < 70) ageRanges[5].count++;
    else if (age >= 70 && age < 80) ageRanges[6].count++;
  });

  const ageAnalysis = {
    title: "Customer Age",
    color: "#FF8042",
    dataKey: "count",
    chartData: ageRanges,
  };

  const customerDistributeAnalysis = {
    nodes: [
      {
        name: "Visit",
      },
      {
        name: "Direct-Favourite",
      },
      {
        name: "Page-Click",
      },
      {
        name: "Detail-Favourite",
      },
      {
        name: "Lost",
      },
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: 3728.3,
      },
      {
        source: 0,
        target: 2,
        value: 354170,
      },
      {
        source: 2,
        target: 3,
        value: 62429,
      },
      {
        source: 2,
        target: 4,
        value: 291741,
      },
    ],
  };

  return (
    <div className="client">
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
          <GraphSettings id="general" />
        </div>
      </div>
      <div className="box box4">
        <TreeMapBox storeRevenues={storesData} />
      </div>
      <div className="box box5">
        <BarChartBox {...ageAnalysis} />
      </div>
      <div className="box box7">
        <ChartBox {...totalCustomer} />
      </div>
      <div className="box box2">
        <PieChartBox data={moodAnalysis} title="Mood Analysis" />
      </div>
      <div className="box box3">
            <OpenAPI {...totalData} type="client_page"/>
      </div>
      <div className="box box6">
        <PieChartBox data={genderAnalysis} title="Gender Analysis" />
      </div>
    </div>
  );
}

export default ClientPage;
