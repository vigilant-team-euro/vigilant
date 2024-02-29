import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./piechartbox.scss";
function PieChartBox(props) {

      
    return (
        <div className="pieChartBox">
          <h1>{props.title}</h1>
          <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                />
                <Pie
                  data={props.data}
                  innerRadius={"70%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {props.data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="options">
            {props.data.map((item) => (
              <div className="option" key={item.name}>
                <div className="title">
                  <div className="dot" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          {props.moodOnly ? (<div className='mood'>
            Our analysis shows that your customer exists happier than before

          </div>): (<></>)}
        </div>
      );
}

export default PieChartBox