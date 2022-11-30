import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import moment from "moment";

const TableTimeKeepingManagement = (props) => {
    const { listTimekeeping, role, currentPage } = props;
    console.log(currentPage)
    const renderTime = (time) => {
        if (time === null) return ''
        return moment(time).format('DD / MM / YYYY, h:mm:ss a')
    }
    const renderStatus = (time) => {
        if (time === null) return "Check in thành công"
        else return "Check out thành công"
    }
    return (
        <>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        {role === 'Admin' && <TableCell>Tên</TableCell>}
                        <TableCell>Thời gian check-in</TableCell>
                        <TableCell>Thời gian check-out</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTimekeeping.map((item, index) =>
                        <TableRow key={item.timekeepingId}>
                            <TableCell>{parseInt(currentPage) * 10 + index + 1}</TableCell>
                            {role === 'Admin' && <TableCell>{item.fullName}</TableCell>}
                            <TableCell>{renderTime(item.timeCheckin)}</TableCell>
                            <TableCell>{renderTime(item.timeCheckout)}</TableCell>
                            <TableCell>{renderStatus(item.timeCheckout)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )

}

export default TableTimeKeepingManagement;