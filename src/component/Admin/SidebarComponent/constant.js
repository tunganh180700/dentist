import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export const menu = [
  {
    icon: <MeetingRoomIcon />,
    title: " Quản lý chấm công",
    href: "/timekeeping",
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Bệnh nhân",
    href: "/patient-management",
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý phòng chờ",
    href: "/meetingroom",
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý tài khoản",
    href: "/accmanagement",
    permissionDeny: ["LeaderNurse", "Doctor", "Receptionist", "Nurse"],
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý lịch hẹn",
    href: "/schedule",
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý vật liệu",
    href: "",
    permissionDeny: ["Doctor", "Receptionist", "Nurse"],
    subItem: [
      {
        icon: <MeetingRoomIcon />,
        title: "Vật liệu",
        href: "/materialmanagement",
      },
      {
        icon: <MeetingRoomIcon />,
        title: "Nhập vật liệu",
        href: "/materialimport",
      },
      {
        icon: <MeetingRoomIcon />,
        title: "Xuất vật liệu",
        href: "/materialexport",
      },
    ],
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Mẫu vật",
    href: "/specimen",
    permissionDeny: ["Admin", "Doctor", "Nurse", "LeaderNurse"],
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý Labo",
    href: "/labo",
    permissionDeny: ["Receptionist", "Doctor", "Nurse"],
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Thu nhập",
    href: "/income",
    permissionDeny: ["Doctor", "Receptionist", "Nurse", "LeaderNurse"],
  },
  {
    icon: <MeetingRoomIcon />,
    title: "Quản lý hoá đơn",
    href: "/bill",
    permissionDeny: ["Doctor", "Receptionist", "Nurse"],
  },
];
