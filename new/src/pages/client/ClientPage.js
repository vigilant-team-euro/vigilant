import React from "react";
import "./clientpage.scss";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BarChartBox from "../../components/barChart/BarChartBox";
import { ResponsiveContainer, Treemap, Sankey } from "recharts";
import { PureComponent } from "react";
const COLORS = [
  "#2196F3",
  "#FFC107",
  "#2196F3",
  "#FF5722",
  "#9C27B0",
  "#E91E63",
];
class CustomizedContent extends PureComponent {
  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      payload,
      colors,
      rank,
      name,
    } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : "#ffffff00",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

function ClientPage() {
  // all const data below needs to be fetched from the database
  const chartBoxCustomer = {
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
  const data = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
  ];
  const barChartBoxAge = {
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
  const storeData = [
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
  const data0 = {
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
        <ChartBox {...chartBoxCustomer} />
      </div>
      <div className="box box4">
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            data={storeData}
            dataKey="size"
            stroke="#ddd"
            fill="#4d5b77"
          />
        </ResponsiveContainer>
      </div>
      <div className="box box5">
        <BarChartBox {...barChartBoxAge} />
      </div>
      <div className="box box2">
        <PieChartBox data={data} title="Mood Analysis" moodOnly="true" />
      </div>
      <div className="box box3">
        
        <ResponsiveContainer>
          <Sankey
            data={data0}
            node={{stroke: "#77c878", strokeWidth: 2}}
            nodePadding={111}
            link={{ stroke: "#fff" }}
            
          ></Sankey>
        </ResponsiveContainer>
        
      </div>
      <div className="box box6">
        <PieChartBox data={data} title="Gender Analysis" />
      </div>
    </div>
  );
}

export default ClientPage;
