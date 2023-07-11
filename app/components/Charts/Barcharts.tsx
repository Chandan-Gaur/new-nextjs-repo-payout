import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "New Users", "FailUsers", "Pending Users"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Payyment Getway",
    subtitle: "All Users Status",
  },
};

export default function Barcharts() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="450px"
      data={data}
      options={options}
    />
  );
}
