import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CHECK_IN, CHECK_OUT, GET_LIST_TIMEKEEPING } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';
import TableTimeKeepingManagement from './TableTimeKeepingManagement';

const TimekeepingManagementContent = () => {
    const [listTimekeeping, setListTimekeeping] = useState([])
    const role = localStorage.getItem('role');
    const [loading, setLoading] = useState(false)
    const [isCheckin, setIsCheckin] = useState(true)
    const loadData = async () => {
        try {
            const res = await axiosInstance.get(GET_LIST_TIMEKEEPING)
            console.log(res)
            const { checkinEnable, timekeepingDTOS } = res.data
            setIsCheckin(checkinEnable)
            setListTimekeeping(timekeepingDTOS.content)
        } catch (error) {
            console.log(error)
        }
    }
    const checkInOut = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.post(isCheckin ? CHECK_IN : CHECK_OUT)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    const handleOnClick = () => {
        checkInOut()
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Chấm công
            </Typography>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                {role !== 'Admin' && <LoadingButton type='primary' onClick={handleOnClick} loading={loading}>Check {isCheckin ? "in" : "out"}</LoadingButton>}
            </div>
            <TableTimeKeepingManagement listTimekeeping={listTimekeeping} />
        </>
    )
}

export default TimekeepingManagementContent