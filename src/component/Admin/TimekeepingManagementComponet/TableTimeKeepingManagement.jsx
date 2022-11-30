import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import moment from "moment";
import { render } from "@testing-library/react";

const TableTimeKeepingManagement = (props) => {
    const { listTimekeeping } = props;
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
                        <TableCell>Thời gian check-in</TableCell>
                        <TableCell>Thời gian check-out</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTimekeeping.map((item, index) =>
                        <TableRow key={item.timekeepingId}>
                            <TableCell>{index + 1}</TableCell>
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