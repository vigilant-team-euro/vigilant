// SliderComponent.js
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import "./heatmap.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
const Heatmap = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const handlePlay = () => {
    // Implement play functionality here
  };

  const handleStop = () => {
    // Implement stop functionality here
  };
  return (
    <div className='parent'>
    <div className='canvas'>
      <iframe title="My Frame" src="https://example.com" className="my-iframe"></iframe>
    </div>
    <div className="controls">
      <div className="slider-controls">
        <ReactSlider
          className="react-slider"
          thumbClassName="thumb"
          trackClassName="track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          renderTrack={(props, state) => <div {...props} />}
          defaultValue={sliderValue}
          onAfterChange={(value) => setSliderValue(value)}
          min={0}
          max={100}
        />
        <button onClick={handlePlay}><FontAwesomeIcon icon={faPlay} /></button>
        <button onClick={handleStop}><FontAwesomeIcon icon={faStop} /></button>
      </div>
    </div>
  </div>
  );
};

export default Heatmap;