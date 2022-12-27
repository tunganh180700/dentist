import React from "react";
import { Box, TextField, Typography } from "@mui/material";
const InputDentist = ({
  value,
  label,
  required = false,
  error,
  id,
  onChange,
}) => {
  return (
    <div>
      <Box className="mb-2">
        <p className="mb-1 font-bold">
          {label} {required && <span className="text-red-600">*</span>}
        </p>
        <TextField
          multiline
          fullWidth
          id={id}
          value={value}
          required={required}
          placeholder={label}
          onChange={onChange}
        />
        {error && (
          <Typography
            style={{ color: "red", fontStyle: "italic", fontSize: "14px" }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default InputDentist;
