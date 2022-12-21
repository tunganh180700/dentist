import { Typography } from '@mui/material';
import React, { useState,useEffect } from 'react';
import Logo from '../../../img/ngang.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchUserProfile } from "../../../redux/ProfileSlice/userProfileSlice";

import { useDispatch, useSelector } from "react-redux"


const styleLogo = {
    height: `100%`,
    width: `100px`,
    backgroundImage: `url(${Logo})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`
}

const HeaderAdmin = ({ title }) => {

    const dispatch = useDispatch();
    const fullName = useSelector(state => state.userProfile.fullName)
    const roleName = useSelector(state => state.userProfile.roleName)
    useEffect(() => {

        try {

            dispatch(fetchUserProfile())


        } catch (error) {
            console.log(error)
        }

    }, [])
    
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", width: '100%', }}>
                <div>
                    <img src={Logo} style={{ height: '130px', position: 'absolute', top:"-35px"  }} />
                </div>
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                >
                    {title}
                </Typography>

                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                       {roleName}: {fullName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Hồ sơ cá nhân</Dropdown.Item>
                        <Dropdown.Item href="">Đổi mật khẩu</Dropdown.Item>
                         <Dropdown.Divider />
                        <Dropdown.Item href="/login" style={{ textDecoration: "none", }} >Đăng xuất</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}

export default HeaderAdmin;