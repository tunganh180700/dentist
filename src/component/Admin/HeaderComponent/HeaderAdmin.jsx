import {
  Avatar,
  Badge,
  Box,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../../../img/ngang.png";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchUserProfile } from "../../../redux/ProfileSlice/userProfileSlice";
import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RoleTag from "../../ui/RoleTag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import NotiCard from "../../ui/noti";
import SockJsClient from "react-stomp";
import { getListNotifies } from "../../../redux/AccountSlice/choosenAccountSlice";
import { toast } from "react-toastify";
import { toastBottomCss } from "../../../redux/toastCss";
import { SOCKET_URL } from "../../../config/baseAPI";
import { useNavigate,  useParams } from "react-router-dom";

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullName = useSelector((state) => state.userProfile.fullName);
  const roleName = useSelector((state) => state.userProfile.roleName);
  const listNotifies = useSelector(
    (state) => state.choosenAccount.listNotifies
  );
  const [refSocket, setRefSocket] = useState(null);
  const onConnected = () => {
    console.log(listNotifies);
  };

  useEffect(() => {
    try {
      dispatch(fetchUserProfile());
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchListNoti = ({ patient, doctor }) => {
    // dispatch(getListNotifies());
    toast(
      <Box className="flex gap-3 w-[270px] p-2" onClick={()=> navigate('/waitting-room/confirm')}>
        <Avatar
          alt={patient.patientID}
          src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
        />
        <Box>
          <p className={`text-xs`}>
            Bác sĩ{" "}
            <span className="font-bold text-black">{doctor.fullName}</span> đang
            yêu cầu khám bệnh cho{" "}
            <span className="font-bold text-black">{patient.patientName}</span>
          </p>
        </Box>
      </Box>,
      toastBottomCss
    );
  };

  const listNoti = (
    <Box height="500px" overflow="scroll">
      <NotiCard message="Image avatars can be created by passing standard img" />
      <NotiCard message="Image avatars can be created by passing standard img" />
      <NotiCard message="Image avatars can be created by passing standard img" />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
      <NotiCard
        seen
        message="Image avatars can be created by passing standard img"
      />
    </Box>
  );

  return (
    <Box className="flex gap-4 items-center">
      {/* <Snackbar
        open={open}
        className="cursor-pointer hover:scale-105"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        onClick={() => console.log(123123)}
      >
        <Box className="flex gap-4 w-[270px] p-2  bg-white hover:bg-slate-100 rounded-md shadow-md">
          <Avatar
            alt={message.patientID}
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000"
          />
          <p className={` text-xs`}>{message.patientID}</p>
        </Box>
      </Snackbar> */}
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/topic/${roleName}`]}
        onConnect={onConnected}
        onDisconnect={() => console.log("Disconnected!")}
        onMessage={fetchListNoti}
        debug={false}
        ref={(client) => setRefSocket(client)}
      />
      <Box>
        <Popover placement="bottom" content={listNoti} trigger="click">
          <Badge
            color="error"
            badgeContent={4}
            max={99}
            className="cursor-pointer"
          >
            <NotificationsIcon />
          </Badge>
        </Popover>
      </Box>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="bg-transparent border-0 gap-2 relative"
          style={{ display: "flex", alignItems: "center" }}
        >
          <RoleTag className="absolute" title={fullName} role={roleName} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="border-0 shadow-md">
          <Dropdown.Item>
            <Link to="/profile" className="decoration-white text-black">
              <span>Hồ sơ cá nhân</span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/change-password" className="decoration-white text-black">
              <span>Đổi mật khẩu</span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link
              to="/login"
              className="decoration-white text-black flex items-center gap-2"
            >
              <PowerSettingsNewIcon fontSize="12px" />
              <span> Đăng xuất</span>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Box>
  );
};

export default HeaderAdmin;
