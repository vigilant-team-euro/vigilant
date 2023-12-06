import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ type, data, options }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      // If a Chart instance already exists, destroy it before creating a new one
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: type || 'bar',
        data: {
          ...data,
          datasets: data.datasets.map((dataset) => ({
            ...dataset,
            borderColor: 'white', // Set line color to white
          })),
        },
        options: {
          ...options,
          scales: {
            ...options.scales,
            x: {
              ...options.scales?.x,
              ticks: {
                ...options.scales?.x?.ticks,
                color: 'white', // Set label color to white
              },
            },
            y: {
              ...options.scales?.y,
              ticks: {
                ...options.scales?.y?.ticks,
                color: 'white', // Set label color to white
              },
            },
          },
          animation: {
            duration: 2000, // Adjust animation duration as needed
            easing: 'easeInOutQuart', // Adjust easing function as needed
          },
        },
      });
    }

    // Cleanup: destroy the Chart instance when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
