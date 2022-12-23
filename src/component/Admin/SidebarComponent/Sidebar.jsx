import React, { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaidIcon from "@mui/icons-material/Paid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import StarBorder from "@mui/icons-material/StarBorder";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useState } from "react";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Logo from "../../../img/logo.png";
import { menu } from "./constant";

const Sidebar = ({ isOpenSideBar = true }) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(true);
  const [role, setRole] = useState(null);
  const handleClickCollapse = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <div className="decoration-white text-black">
      <img
        src={Logo}
        width={130}
        style={{ margin: "auto", borderRadius: "10px" }}
        alt=""
        className="mb-5"
      />
      {menu.map((item) => (
        <Box>
          {!item?.subItem && (
            <Link to={item.href} className="decoration-white text-black">
              <ListItemButton className="flex justify-center">
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.title}
              </ListItemButton>
            </Link>
          )}
          {item?.subItem && (
            <Box>
              <ListItemButton onClick={handleClickCollapse}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                Quản lý vật liệu
                {isOpenCollapse ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isOpenCollapse} timeout="auto" unmountOnExit>
                {item.subItem.map((sub) => (
                  <Box className="ml-8">
                    <Link to={sub.href} className="decoration-white text-black">
                      <ListItemButton className="flex justify-center ml-3">
                        <ListItemIcon>{sub.icon}</ListItemIcon>
                        {sub.title}
                      </ListItemButton>
                    </Link>
                  </Box>
                ))}
              </Collapse>
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};

export default Sidebar;
// //  {role === "Receptionist" ? (
//     <></>
//     ) : (
//       <ListItemButton>
//         <Link
//           to={"/patient-management"}
//           className="decoration-white text-black flex justify-center"
//         >
//           <ListItemIcon>
//             <StarBorder />
//           </ListItemIcon>
//           Bệnh nhân
//         </Link>
//       </ListItemButton>
//       //      <Box className="flex justify-center gap-3">
//       //      <MeetingRoomIcon />
//       //      {isOpenSideBar && (
//       //        <Link to={"/timekeeping"} className="decoration-white text-black">
//       //          Bệnh nhân
//       //        </Link>
//       //      )}
//       //    </Box>
//     )}

//     {/* <ListItemButton>
//       <ListItemIcon>
//         <MeetingRoomIcon />
//       </ListItemIcon>
//       <Link to={"/meetingroom"} className="decoration-white text-black">
//         Quản lý phòng chờ
//       </Link>
//     </ListItemButton> */}

//     {role === "LeaderNurse" ||
//     role === "Doctor" ||
//     role === "Receptionist" ||
//     role === "Nurse" ? (
//       <></>
//     ) : (
//       <ListItemButton>
//         <ListItemIcon>
//           <MeetingRoomIcon />
//         </ListItemIcon>
//         <Link to={"/accmanagement"} className="decoration-white text-black">
//           Quản lý tài khoản
//         </Link>
//       </ListItemButton>
//     )}
//     <ListItemButton>
//       <ListItemIcon>
//         <ScheduleIcon />
//       </ListItemIcon>
//       <Link to={"/schedule"} className="decoration-white text-black">
//         Quản lý lịch hẹn
//       </Link>
//     </ListItemButton>

//     {role === "Doctor" || role === "Receptionist" ? (
//       <></>
//     ) : (
//       <ListItemButton onClick={handleClickCollapse}>
//         <ListItemIcon>
//           <CategoryIcon />
//         </ListItemIcon>
//         Quản lý vật liệu
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//     )}

//     {role === "Doctor" || role === "Receptionist" ? (
//       <></>
//     ) : (
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           {role === "Nurse" ? (
//             <></>
//           ) : (
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <StarBorder />
//               </ListItemIcon>

//               <Link
//                 to={"/materialmanagement"}
//                 className="decoration-white text-black"
//               >
//                 Vật liệu
//               </Link>
//             </ListItemButton>
//           )}

//           {role === "Nurse" ? (
//             <></>
//           ) : (
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <StarBorder />
//               </ListItemIcon>

//               <Link
//                 to={"/materialimport"}
//                 className="decoration-white text-black"
//               >
//                 Nhập vật liệu
//               </Link>
//             </ListItemButton>
//           )}

//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>

//             <Link
//               to={"/materialexport"}
//               className="decoration-white text-black"
//             >
//               Xuất vật liệu
//             </Link>
//           </ListItemButton>
//         </List>
//       </Collapse>
//     )}

//     {role === "Admin" ||
//     role === "Doctor" ||
//     role === "Nurse" ||
//     role === "LeaderNurse" ? (
//       <ListItemButton>
//         <ListItemIcon>
//           <CategoryIcon />
//         </ListItemIcon>

//         <Link to={"/specimen"} className="decoration-white text-black">
//           Mẫu vật
//         </Link>
//       </ListItemButton>
//     ) : (
//       <></>
//     )}

//     {role === "Doctor" || role === "Receptionist" || role === "Nurse" ? (
//       <></>
//     ) : (
//       <ListItemButton>
//         <ListItemIcon>
//           <AccountCircleIcon />
//         </ListItemIcon>

//         <Link to={"/labo"} className="decoration-white text-black">
//           Quản lý Labo
//         </Link>
//       </ListItemButton>
//     )}

//     {role === "Doctor" ||
//     role === "Receptionist" ||
//     role === "Nurse" ||
//     role === "LeaderNurse" ? (
//       <></>
//     ) : (
//       <ListItemButton>
//         <ListItemIcon>
//           <AccountCircleIcon />
//         </ListItemIcon>
//         <Link
//           to={"/serviceandcategory"}
//           className="decoration-white text-black"
//         >
//           Quản lý dịch vụ
//         </Link>
//       </ListItemButton>
//     )}

//     {role === "Doctor" ||
//     role === "Receptionist" ||
//     role === "Nurse" ||
//     role === "LeaderNurse" ? (
//       <></>
//     ) : (
//       <ListItemButton>
//         <ListItemIcon>
//           <PointOfSaleIcon />
//         </ListItemIcon>
//         <Link to={"/income"} className="decoration-white text-black">
//           Thu nhập
//         </Link>
//       </ListItemButton>
//     )}

//     {role === "Doctor" || role === "Receptionist" || role === "Nurse" ? (
//       <></>
//     ) : (
//       <ListItemButton>
//         <ListItemIcon>
//           <ReceiptLongIcon />
//         </ListItemIcon>
//         <Link to={"/bill"} className="decoration-white text-black">
//           Quản lý hoá đơn
//         </Link>
//       </ListItemButton>
//     )}
