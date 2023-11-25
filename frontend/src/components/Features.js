// Features.js
import React from "react";
import Card from "./Card";
import image from "../images/heatmap.png";
import image2 from "../images/emotion.jpeg";
import image3 from "../images/statistics.jpeg";
import image4 from "../images/featuremap.jpeg";


function Features() {
  return (
    <div className="card-group">
      <Card
        title="Heat-Map"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageSrc={image}
      />
      <Card
        title="Emotion Detection"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageSrc={image2}
      />
      <Card
        title="Detailed Demographics"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageSrc={image3}
      />
      <Card
        title="Forecasting"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageSrc={image4}
      />
      <Card
        title="Emotion Detection"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        imageSrc={image2}
      />
    </div>
  );
}

export default Features;