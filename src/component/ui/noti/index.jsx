import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function NotiCard({ message, seen }) {
  return (
    <Box
      className={`${
        !seen ? "bg-sky-100 hover:bg-slate-100" : "bg-white hover:bg-slate-100"
      } flex gap-2 w-[270px] p-2 shadow-md cursor-pointer`}
    >
      <Avatar
        alt={message}
        src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
      />
      <Box>
        <p className={`${!seen ? "font-bold" : ""} text-xs mb-1`}>{message}</p>
        <p className={`text-xs mb-0`}>Vừa xong</p>
      </Box>
    </Box>
  );
}

export default NotiCard;
