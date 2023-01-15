import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BiotechIcon from "@mui/icons-material/Biotech";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
export const menu = [
  {
    icon: <GroupsIcon />,
    iconActive: <GroupsIcon color="info" />,
    title: "Bệnh nhân",
    href: "/patient-management",
    permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
  },
  {
    icon: <AddHomeWorkIcon />,
    iconActive: <AddHomeWorkIcon color="info" />,
    title: "Quản lý phòng chờ",
    href: "/meetingroom",
    permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
  },
  {
    icon: <ManageAccountsIcon />,
    iconActive: <ManageAccountsIcon color="info" />,
    title: "Quản lý tài khoản",
    href: "/accmanagement",
    permission: ["Admin"],
  },
  {
    icon: <ScheduleIcon />,
    iconActive: <ScheduleIcon color="info" />,
    title: "Quản lý lịch hẹn",
    href: "/schedule",
    permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
  },
  {
    icon: <RoomPreferencesIcon />,
    title: "Quản lý vật liệu",
    href: "",
    permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],

    subItem: [
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,
        title: "Vật liệu",
        href: "/materialmanagement",
        permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
      },
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,
        title: "Nhập vật liệu",
        href: "/materialimport",
        permission: ["Admin", "LeaderNurse"],
      },
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,
        title: "Xuất vật liệu",
        href: "/materialexport",
        permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
      },
    ],
  },
  {
    icon: <MeetingRoomIcon />,
    iconActive: <MeetingRoomIcon color="info" />,
    title: "Mẫu vật",
    href: "/specimen",
    permission: ["Admin", "Doctor", "Nurse", "LeaderNurse"],
  },
  {
    icon: <BiotechIcon />,
    iconActive: <BiotechIcon color="info" />,
    title: "Quản lý Labo",
    href: "/labo",
    permission: ["Admin", "LeaderNurse"],
  },
  {
    icon: <ScheduleIcon />,
    iconActive: <ScheduleIcon color="info" />,
    title: "Quản lý dịch vụ",
    href: "/serviceandcategory",
    permission: ["Admin"],
  },
  {
    icon: <CurrencyExchangeIcon />,
    iconActive: <CurrencyExchangeIcon color="info" />,
    title: "Thu nhập",
    href: "/income",
    permission: ["Admin"],
  },
  {
    icon: <ReceiptLongIcon />,
    iconActive: <ReceiptLongIcon color="info" />,
    title: "Quản lý hoá đơn",
    href: "/bill",
    permission: ["Admin", "LeaderNurse", "Receptionist"],
  },
  {
    icon: <CalendarMonthIcon />,
    iconActive: <CalendarMonthIcon color="info" />,
    title: " Quản lý chấm công",
    href: "/timekeeping",
    permission: ["Admin", "Doctor", "LeaderNurse", "Nurse", "Receptionist"],
  },
];
