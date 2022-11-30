import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const TableTimeKeepingManagement = (props) => {
    const { listTimekeeping } = props
    return (
        <>
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

export default TableTimeKeepingManagement;