import React from "react";
import StoresList from "../components/StoresList";
import VideoComponent from "../components/VideoComponent";
import HeatmapComponent from "../components/HeatmapComponent";

function Heatmap() {
  return (
    <div className="container-fluid">
      <div className="p-1">
        <StoresList />
      </div>
      <div className="row d-flex justify-content-between p-1">
        <div className="col-md-8 rounded">
          <div className="m-2">
            <HeatmapComponent />
          </div>
        </div>
        <div className="col-md-4 rounded">
          <VideoComponent />
        </div>
      </div>
    </div>
  );
}

export default Heatmap;
