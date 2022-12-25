import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
export const menu = [
  {
    icon: <CalendarMonthIcon />,
    iconActive: <CalendarMonthIcon color="info" />,
    title: " Quản lý chấm công",
    href: "/timekeeping",
  },
  {
    icon: <GroupsIcon />,
    iconActive: <GroupsIcon color="info" />,
    title: "Bệnh nhân",
    href: "/patient-management",
  },
  {
    icon: <AddHomeWorkIcon />,
    iconActive: <AddHomeWorkIcon color="info" />,
    title: "Quản lý phòng chờ",
    href: "/meetingroom",
  },
  {
    icon: <ManageAccountsIcon />,
    iconActive: <ManageAccountsIcon color="info" />,
    title: "Quản lý tài khoản",
    href: "/accmanagement",
    permissionDeny: ["LeaderNurse", "Doctor", "Receptionist", "Nurse"],
  },
  {
    icon: <ScheduleIcon />,
    iconActive: <ScheduleIcon color="info" />,
    title: "Quản lý lịch hẹn",
    href: "/schedule",
  },
  {
    icon: <RoomPreferencesIcon />,
    title: "Quản lý vật liệu",
    href: "",
    permissionDeny: ["Doctor", "Receptionist", "Nurse"],
    subItem: [
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,

        title: "Vật liệu",
        href: "/materialmanagement",
      },
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,
        title: "Nhập vật liệu",
        href: "/materialimport",
      },
      {
        icon: <RoomPreferencesIcon />,
        iconActive: <RoomPreferencesIcon color="info" />,
        title: "Xuất vật liệu",
        href: "/materialexport",
      },
    ],
  },
  {
    icon: <MeetingRoomIcon />,
    iconActive: <MeetingRoomIcon color="info" />,
    title: "Mẫu vật",
    href: "/specimen",
    permissionDeny: ["Admin", "Doctor", "Nurse", "LeaderNurse"],
  },
  {
    icon: <Diversity2Icon />,
    iconActive: <Diversity2Icon color="info" />,
    title: "Quản lý Labo",
    href: "/labo",
    permissionDeny: ["Receptionist", "Doctor", "Nurse"],
  },
  {
    icon: <CurrencyExchangeIcon />,
    iconActive: <CurrencyExchangeIcon color="info" />,
    title: "Thu nhập",
    href: "/income",
    permissionDeny: ["Doctor", "Receptionist", "Nurse", "LeaderNurse"],
  },
  {
    icon: <ReceiptLongIcon />,
    iconActive: <ReceiptLongIcon color="info" />,
    title: "Quản lý hoá đơn",
    href: "/bill",
    permissionDeny: ["Doctor", "Receptionist", "Nurse"],
  },
];
