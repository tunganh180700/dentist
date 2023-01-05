import React, { useEffect, useRef } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Box } from "@mui/material";
import "./styleDatePicker.css";
import moment from "moment";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

const DatePickerDentist = ({
  value,
  range = false,
  clearIcon,
  placeholder = "Select date",
  onChange,
}) => {
  return (
    <Box>
      {range ? (
        <RangePicker
          value={value}
          onChange={onChange}
          disabledDate={disabledDate}
          presets={[
            { label: "Yesterday", value: dayjs().add(-1, "d") },
            { label: "Last Week", value: dayjs().add(-7, "d") },
            { label: "Last Month", value: dayjs().add(-1, "month") },
          ]}
        />
      ) : (
        <DatePicker
          value={value ? moment(value) : null}
          onChange={onChange}
          placeholder={placeholder}
          disabledDate={disabledDate}
        />
      )}
    </Box>
  );
};

export default DatePickerDentist;