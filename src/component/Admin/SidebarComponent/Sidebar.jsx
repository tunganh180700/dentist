import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaidIcon from '@mui/icons-material/Paid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';

const Sidebar = () => {
    return (
        <>
            <React.Fragment>
                <ListItemButton>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý danh mục" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý phòng chờ" />
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
                    <ListItemText primary="Quản lý tài khoản" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý hóa đơn" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default Sidebar;
