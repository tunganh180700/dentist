import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const TimekeepingManagementContent = () => {
    const listTimekeeping = useSelector(state => state.listTimekeeping.listTimekeeping)

    console.log(listTimekeeping)
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
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Thời gian check-in</TableCell>
                        <TableCell>Thời gian check-out</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTimekeeping.map((item) =>
                        <TableRow key={item.timekeepingId}>
                            <TableCell>{item.timekeepingId}</TableCell>
                            <TableCell>{item.timekeepingId}</TableCell>
                            <TableCell>{item.timekeepingId}</TableCell>
                            <TableCell>{item.timekeepingId}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default TimekeepingManagementContent