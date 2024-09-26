import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsLineChart = ({ analytics }) => {
  // Extracting dates and visits for the chart
  const labels = analytics?.map(item => item.date);
  
  const visitsData = analytics?.map(item => item.visits);
  console.log(labels);
  console.log(visitsData);


  const data = {
    labels: labels, // X-axis labels (dates)
    datasets: [
      {
        label: 'Visits',
        data: visitsData, // Y-axis data (visits)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3, // Makes the line smooth
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        // X-axis formatting for date
        type: 'category',
        title: {
          display: true,
          text: 'Date', // You can change this to 'Month' if needed
        },
      },
      y: {
        title: {
          display: true,
          text: 'Visits',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AnalyticsLineChart;