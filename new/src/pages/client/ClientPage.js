import React, { useState, useEffect, useContext } from "react";
import "./clientpage.scss";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import { ResponsiveContainer, Treemap, Sankey } from "recharts";
import { fetchAllForUser } from "../../components/fetchData/FetchDataUtils";
import { AuthContext } from "../../context/AuthContext";
import TreeMapBox from "../../components/treeMap/TreeMapBox";

function ClientPage() {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [testdata, setTestData] = useState([]);
  const dataLocation = `users/${userId}/stores`;

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

  //instead of static data, use "testData" generated above
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
  const moodAnalysis = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
  ];
  const genderAnalysis = [
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
  const storeRevenues = [
    {
      name: "Store1",
      color: "#1f77b4", // Blue
      children: [{ name: "Revenue", size: 58000 }],
    },
    {
      name: "Store2",
      children: [{ name: "Revenue", size: 40000 }],
    },
    {
      name: "Store3",
      children: [{ name: "Revenue", size: 48000 }],
    },
    {
      name: "Store4",
      children: [{ name: "Revenue", size: 24000 }],
    },
    {
      name: "Store5",
      children: [{ name: "Revenue", size: 32000 }],
    },
    {
      name: "Store6",
      children: [{ name: "Revenue", size: 18000 }],
    },
    {
      name: "Store7",
      children: [{ name: "Revenue", size: 28000 }],
    },
    {
      name: "Store8",
      children: [{ name: "Revenue", size: 19000 }],
    },
  ];
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
        Time Period Buttons to Add
      </div>
      <div className="box box4">
        <TreeMapBox storeRevenues={storeRevenues}/>
      </div>
      <div className="box box5">
        <BarChartBox {...ageAnalysis} />
      </div>
      <div className="box box7">
        <ChartBox {...totalCustomer} />
      </div>
      <div className="box box2">
        <PieChartBox
          data={moodAnalysis}
          title="Mood Analysis"
        />
      </div>
      <div className="box box3">
        <ResponsiveContainer>
          <Sankey
            data={customerDistributeAnalysis}
            node={{ stroke: "#77c878", strokeWidth: 2 }}
            nodePadding={111}
            link={{ stroke: "#fff" }}
          ></Sankey>
        </ResponsiveContainer>
      </div>
      <div className="box box6">
        <PieChartBox data={genderAnalysis} title="Gender Analysis" />
      </div>
    </div>
  );
}

export default ClientPage;
