import React from 'react';

const Title = ({ title, boxSize }) => {
  const titleStyle = {
    position: 'relative', // Needed for absolute positioning of pseudo-element
    marginBottom: '10px',
  };

  const lineStyle = {
    content: "''",
    position: 'absolute',
    left: '0',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    borderBottom: '3px dotted #1d1d1d', // Adjust thickness and color as needed
    zIndex: '1', // Set z-index to bring the line behind the title container
  };

  const titleContainerStyle = {
    backgroundColor: '#1d1d1d',
    padding: '10px', // You can adjust the padding as needed
    borderRadius: '5px', // Optional: Add rounded corners
    color: 'white', // Optional: Set text color
    fontSize: '16px', // Optional: Set font size
    fontWeight: 'bold', // Make the title bold
    width: boxSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto', // Center horizontally
    position: 'relative', // Set position to establish stacking context
    zIndex: '2', // Set z-index to bring the title container to the front
  };

  return (
    <div style={titleStyle}>
      <div style={lineStyle}></div>
      <div style={titleContainerStyle}>
        {title}
      </div>
    </div>
  );
};

export default Title;
