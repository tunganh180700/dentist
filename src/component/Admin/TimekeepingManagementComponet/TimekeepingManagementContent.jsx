import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import TableTimeKeepingManagement from './TableTimeKeepingManagement';

const TimekeepingManagementContent = () => {
    const [listTimekeeping, setListTimekeeping] = useState([])
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
            <TableTimeKeepingManagement listTimekeeping={listTimekeeping} />
        </>
    )
}

export default TimekeepingManagementContent