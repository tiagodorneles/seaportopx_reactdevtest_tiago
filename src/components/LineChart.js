import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const LineChart = (chartData) => {
  const data = {
    labels: chartData.chartData.labels,
    datasets: [
      {
        label: "Amount",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: chartData.chartData.amounts,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        plugins: {
          title: {
            display: true,
            text: "SeaportOPX | Tiago Dorneles | React Development Test",
            fontSize: 20,
          },
          legend: {
            display: false
          },
      }
      }}
    />
  );
};

export default LineChart;
