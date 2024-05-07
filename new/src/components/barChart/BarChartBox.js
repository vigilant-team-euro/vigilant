import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, Cell } from "recharts";
import "./barchart.scss"
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f7a400'];

export default function BarChartBox(props) {
    return (
        <div className="barChartBox">
          <h1>{props.title}</h1>
          <div className="chart">
            <ResponsiveContainer width="99%" height={180}>
              <BarChart data={props.chartData}>
                <XAxis dataKey="range" stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                  cursor={{fill:"none"}}
                />
                <Bar dataKey={props.dataKey} fill="#8884d8">
                  {
                    props.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}