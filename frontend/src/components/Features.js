// Features.js
import React from "react";
import Card from "./Card";
import image from "../images/heatmap.png";
import image2 from "../images/emotion.jpeg";
import image3 from "../images/statistics.jpeg";
import image4 from "../images/featuremap.jpeg";
import image5 from "../images/6884036.jpg";

function  Features() {
  return (
    <div className="card-group">
      <Card
        title="Heat-Map"
        text="Visualize customer engagement hotspots in real-time with our Heat-Map feature, optimizing your store layout for maximum impact."
        imageSrc={image}
      />
      <Card
        title="Emotion Detection"
        text="Elevate customer experiences by detecting emotions, allowing personalized interactions and a deeper understanding of your clientele."
        imageSrc={image2}
      />
      <Card
        title="Detailed Demographics"
        text="Tailor your product offerings precisely to your customer base with detailed demographic insights for targeted marketing strategies."
        imageSrc={image3}
      />
      <Card
        title="Forecasting"
        text="Stay ahead of the curve with our Forecasting module, leveraging AI for data analysis to make informed decisions and drive business success."
        imageSrc={image4}
      />
      <Card
        title="Financial Integration"
        text="Seamlessly integrate financial data into your decision-making process, providing a comprehensive view of your store's performance for strategic planning."
        imageSrc={image5}
      />
    </div>
  );
}

export default Features;