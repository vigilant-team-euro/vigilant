import React from 'react'
import "./single.scss"
export default function Single(props) {
    return (
        <div className="single">
          <div className="view">
            <div className="info">
              <div className="topInfo">
                {props.img && <img src={props.img} alt="" />}
                <h1>{props.title}</h1>
              </div>
              <div className="details">
                {Object.entries(props.info).map((item) => (
                  <div className="item" key={item[0]}>
                    <span className="itemTitle">{item[0]}</span>
                    <span className="itemValue">{item[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            {props.chart && (
              <div className="chart">
                
              </div>
            )}
          </div>
          <div className="activities">
            <h2>Latest Activities</h2>
            {props.activities && (
              <ul>
                {props.activities.map((activity) => (
                  <li key={activity.text}>
                    <div>
                      <p>{activity.text}</p>
                      <time>{activity.time}</time>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
}
