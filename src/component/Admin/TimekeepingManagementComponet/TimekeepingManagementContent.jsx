import { LoadingButton } from '@mui/lab';
import { Button, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CHECK_IN, CHECK_OUT, GET_LIST_TIMEKEEPING } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';
import { toastCss } from '../../../redux/toastCss';
import TableTimeKeepingManagement from './TableTimeKeepingManagement';

const TimekeepingManagementContent = () => {
    const [listTimekeeping, setListTimekeeping] = useState([])
    const role = localStorage.getItem('role');
    const [loading, setLoading] = useState(false)
    const [isCheckin, setIsCheckin] = useState(true)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const loadData = async () => {
        try {
            const res = await axiosInstance.get(GET_LIST_TIMEKEEPING + currentPage)
            const { checkinEnable, timekeepingDTOS } = res.data
            setIsCheckin(checkinEnable)
            setListTimekeeping(timekeepingDTOS.content)
            setCurrentPage(timekeepingDTOS.number)
            setTotalPages(timekeepingDTOS.totalPages)
        } catch (error) {
            console.log(error)
        }
    }
    const checkInOut = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.post(isCheckin ? CHECK_OUT : CHECK_IN )
            if(res.status === 200) setCount(prevCount => prevCount + 1)
        } catch (error) {
            if (!isCheckin) toast.error('Chỉ có thể checkout sau 3 tiếng!', toastCss)
        }
        setLoading(false)
    }
    const handleOnClick = () => {
        checkInOut()
    }
    useEffect(() => {
        loadData()
    }, [count])
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
            <TableTimeKeepingManagement listTimekeeping={listTimekeeping} role={role} currentPage={currentPage} />
            <div style={{ display: 'flex', justifyContent: 'center', padding: "14px 16px" }}>
                <Pagination
                    count={totalPages}
                    defaultPage={1}
                    onChange={(e, pageNumber) => {
                        setCurrentPage(pageNumber - 1)
                    }}
                />
            </div>
        </>
    )
}

export default TimekeepingManagementContent