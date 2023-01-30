import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function NotiCard({ message, seen }) {
  return (
    <Box className="flex gap-4 w-[270px] p-2  bg-white hover:bg-slate-100 rounded-md shadow-md">
      <Avatar
        alt={message}
        src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
      />
      <p className={`${!seen ? "font-bold" : ""} text-xs`}>{message}</p>
    </Box>
  );
}

export default NotiCard;
