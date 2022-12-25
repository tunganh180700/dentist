import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { Box } from "@mui/material";

const ChartIncome = ({ data }) => {
  //   const [data, setData] = useState([]);

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });
  
  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "type",
    isStack: true,
    columnStyle: {},
    legend: {
      position: "bottom",
    },
    slider:
      data.length > 12
        ? {
            start: 0,
            end: 0.5,
            trendCfg: {
              isArea: false,
            },
            height: 7,
            handlerStyle: {
              height: 10,
            },
          }
        : null,
    color: ({ type }) => {
      switch (type) {
        case "Doanh thu":
          return "#418eed";
        case "Thực thu":
          return "#59994c";
        case "Tổng chi":
          return "#e18220";
      }
    },
    meta: {
      value: {
        formatter: (val) => {
          return formatter.format(val) + " " + "VND";
        },
      },
    },
  };

  return (
    <Box className="bg-white p-3 rounded-lg shadow-md">
      <h4 className="mb-5">Biểu đồ doanh thu</h4>
      <Column {...config} />
    </Box>
  );
};
export default ChartIncome;
