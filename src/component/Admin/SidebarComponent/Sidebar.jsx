import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaidIcon from '@mui/icons-material/Paid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import StarBorder from '@mui/icons-material/StarBorder';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useState } from 'react';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <React.Fragment>
                <ListItemButton>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <Link to={'/timekeeping'}>
                        <ListItemText primary="Chấm công" />
                    </Link>
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý danh mục" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <Link to={'/patient-management'}>
                                <ListItemText primary="Bệnh nhân" />
                            </Link>
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <Link to={'/meetingroom'}>
                        <ListItemText primary="Quản lý phòng chờ" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <PaidIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý doanh thu" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/accmanagement'}>
                        <ListItemText primary="Quản lý tài khoản" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý hóa đơn" />
                </ListItemButton>

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý vật liệu" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <Link to={'/materialmanagement'}>
                                <ListItemText primary="Vật liệu" />
                            </Link>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <Link to={'/materialimport'}>
                                <ListItemText primary="Vật liệu nhập khẩu" />
                            </Link>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <Link to={'/materialexport'}>
                                <ListItemText primary="Vật liệu xuất khẩu" />
                            </Link>
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/labo'}>
                        <ListItemText primary="Quản lý Labo" />
                    </Link>
                </ListItemButton>


                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Link to={'/serviceandcategory'}>
                        <ListItemText primary="Quản lý Dịch vụ" />
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <PointOfSaleIcon />
                    </ListItemIcon>
                    <Link to={'/income'}>
                        <ListItemText primary="Thu nhập" />
                    </Link>
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default Sidebar;
