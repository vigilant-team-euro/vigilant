import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip,XAxis} from "recharts";
import "./barchart.scss"
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
                <Bar dataKey={props.dataKey} fill={props.color} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}
