import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to include the Bootstrap CSS
import StoreComponent from '../components/StoreComponent';
import CameraComponent from '../components/CameraComponent';
import VideoComponent from '../components/VideoComponent';

function CameraPage() {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6">
          <VideoComponent
            title="Video Settings"
            type="line"
            height="36vh"
          />
        </div>
        <div className="col-md-6 ">
          <CameraComponent
            title="Camera Settings"
            type="line"
            height="86vh"
          />
        </div>
      </div>
    </div>
  );
}

export default CameraPage;
