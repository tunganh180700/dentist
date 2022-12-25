import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../../../img/ngang.png";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Avatar } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchUserProfile } from "../../../redux/ProfileSlice/userProfileSlice";
import { Link } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { useDispatch, useSelector } from "react-redux";

const styleLogo = {
  height: `100%`,
  width: `100px`,
  backgroundImage: `url(${Logo})`,
  backgroundSize: `cover`,
  backgroundRepeat: `no-repeat`,
};

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.userProfile.fullName);
  const roleName = useSelector((state) => state.userProfile.roleName);
  useEffect(() => {
    try {
      dispatch(fetchUserProfile());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="bg-transparent border-0 gap-2"
          style={{ display: "flex", alignItems: "center" }}
          drop="none"
        >
          <Avatar
            alt={fullName}
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            id="dropdown-basic"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="border-0 shadow-md">
          <Dropdown.Item>
            <Link to="/profile" className="decoration-white text-black">
              <span>Hồ sơ cá nhân</span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/" className="decoration-white text-black">
              <span>Đổi mật khẩu</span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to="/login" className="decoration-white text-black flex items-center gap-2">
              <PowerSettingsNewIcon fontSize="12px" />
              <span> Đăng xuất</span>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default HeaderAdmin;
