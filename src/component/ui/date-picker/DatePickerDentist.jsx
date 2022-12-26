import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {Box} from '@mui/material'
import './styleDatePicker.css'

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

const DatePickerDentist = ({ value, range = false, onChange }) => (
  <Box>
    {range ? (
      <RangePicker value={value} disabledDate={disabledDate} />
    ) : (
      <DatePicker
        onChange={onChange}
        presets={[
          { label: "Yesterday", value: dayjs().add(-1, "d") },
          { label: "Last Week", value: dayjs().add(-7, "d") },
          { label: "Last Month", value: dayjs().add(-1, "month") },
        ]}
        disabledDate={disabledDate}
      />
    )}
  </Box>
);

export default DatePickerDentist;
