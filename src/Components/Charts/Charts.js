import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js/auto'; // Import necessary Chart.js components

function Chart({transactions}) {
  let labels = transactions.map((data)=>data.date)// for Date
  const data = transactions.map((data)=>data.amount);//for amount

  console.log(labels,data);

  const myData = {
    labels: labels, // Accept only array form
    datasets: [
      {
        label: 'My First Dataset',
        data: data, // Accept only array form
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Set up chart options
  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for the x-axis
        labels: labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='chart_container'>
      <h1>Your Analytics</h1>
      <Line data={myData} options={options} />
    </div>
  );
}

export default Chart;









































// import "./charts.css";
// import { Line } from '@ant-design/charts';
// function Charts() {
//     const data = [
//         { year: '1991', value: 3 },
//         { year: '1992', value: 4 },
//         { year: '1993', value: 3.5 },
//         { year: '1994', value: 5 },
//         { year: '1995', value: 4.9 },
//         { year: '1996', value: 6 },
//         { year: '1997', value: 7 },
//         { year: '1998', value: 9 },
//         { year: '1999', value: 13 },
//       ];
    
//       const config = {
//         data,
//         width: 800,
//         height: 400,
//         autoFit: false,
//         xField: 'year',
//         yField: 'value',
//         point: {
//           size: 5,
//           shape: 'diamond',
//         },
//         label: {
//           style: {
//             fill: '#aaa',
//           },
//         },
//       };
//       let chart;
//   return (
//     <div>Charts
//          <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
//     </div>
//   )
// }

// export default Charts