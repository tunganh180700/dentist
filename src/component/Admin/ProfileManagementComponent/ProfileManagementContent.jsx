import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { fetchUserProfile } from "../../../redux/ProfileSlice/userProfileSlice";

import { useDispatch, useSelector } from "react-redux"

const ProfileManagementContent = () => {
    const dispatch = useDispatch();
    const fullName = useSelector(state => state.userProfile.fullName)
    const roleName = useSelector(state => state.userProfile.roleName)
    const birthdate = useSelector(state => state.userProfile.birthdate)
    const phone = useSelector(state => state.userProfile.phone)
    const email = useSelector(state => state.userProfile.email)

    useEffect(() => {

        try {

            dispatch(fetchUserProfile())


        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Hồ sơ 
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                {roleName}:{fullName}
            </Typography>


            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Ngày sinh: {birthdate}
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Số điện thoại: {phone}
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Email: {email}
            </Typography>

        </>
    )
}

export default ProfileManagementContent;
