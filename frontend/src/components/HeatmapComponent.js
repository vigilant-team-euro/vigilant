import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const HeatmapComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const imageRef = ref(storage, 'images/heatmap.png');

      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        console.log("Image URL:", url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="From Firebase Storage" style={{ width: '100%', height: 'auto' }} /> : <p>Loading image...</p>}
    </div>
  );
};

export default HeatmapComponent;
