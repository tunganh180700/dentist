import React from "react";
import { Box, TextField, Typography } from "@mui/material";
const InputDentist = ({
  value,
  label,
  required = false,
  validate = false,
  error = { message: "", touched: false },
  id,
  isFlex,
  onChange,
}) => {
  return (
    <div>
      <Box className={`mb-2 ${isFlex && "flex items-center"}`}>
        <p className={`mb-1 font-bold ${isFlex && "w-1/3"}`}>
          {label} {required && <span className="text-red-600">*</span>}
        </p>
        <Box className="w-full">
          <TextField
            multiline
            fullWidth
            id={id}
            value={value}
            required={required}
            placeholder={label}
            onChange={onChange}
          />
          {(validate || required) && error?.touched && (
            <Typography
              style={{ color: "red", fontStyle: "italic", fontSize: "14px" }}
            >
              {error.message}
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default InputDentist;
