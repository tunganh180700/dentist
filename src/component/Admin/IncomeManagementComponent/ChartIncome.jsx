import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { Box } from "@mui/material";
import DatePickerDentist from "../../ui/date-picker/DatePickerDentist";

const ChartIncome = ({ data, onChangeDateRange }) => {
  //   const [data, setData] = useState([]);

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });

  const config = useMemo(
    () => ({
      data,
      xField: "date",
      yField: "value",
      seriesField: "type",
      isStack: true,
      columnStyle: {},
      legend: {
        position: "bottom",
      },
      color: ({ type }) => {
        switch (type) {
          case "Doanh thu":
            return "#418eed";
          case "Thực thu":
            return "#59994c";
          default:
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
    }),
    [data]
  );

  return (
    <Box className="bg-white p-3 rounded-lg shadow-md">
      <Box className="flex items-center justify-between mb-5">
        <h4>Biểu đồ doanh thu</h4>
        <Box className="flex items-center gap-3">
          <h5>Doanh thu ngày</h5>
          <DatePickerDentist placeholder={["Ngày bắt đầu","Ngày kết thúc"]} range onChange={onChangeDateRange} />
        </Box>
      </Box>
      <Column {...config} />
    </Box>
  );
};
export default ChartIncome;