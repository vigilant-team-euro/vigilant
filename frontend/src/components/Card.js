import React from 'react';

function Card({ text }) {
  const cardStyle = {
    backgroundColor: 'white',
    padding: '10px', // Add padding for better visual appearance
    border: '1px solid #ccc', // Add border for better visibility
    display: 'inline-block', // Make the card inline
  };

  return (
    <div style={cardStyle}>
      {text}
    </div>
  );
}

export default Card;