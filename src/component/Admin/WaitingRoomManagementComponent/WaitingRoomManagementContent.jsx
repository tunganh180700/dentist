import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "./style.css"

const WaitingRoomManagementContent = () => {
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                fontWeight="bold"
            >
                QUẢN LÝ PHÒNG CHỜ
            </Typography>
            <IconButton aria-label="add">
                <AddIcon /> Thêm mới
            </IconButton>
            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><div className='attibute'>STT</div></TableCell>
                        <TableCell>
                            <div className='attibute'>Tên khách hàng</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="searchRoom"
                                    label="Tìm kiếm"
                                    name="searchRoom"
                                    autoComplete="searchRoom"
                                    // value={fullName}
                                    autoFocus
                                // onChange={handleChange}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>MSKH</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="searchRoom"
                                    label="Tìm kiếm"
                                    name="searchRoom"
                                    autoComplete="searchRoom"
                                    // value={fullName}
                                    autoFocus
                                // onChange={handleChange}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='attibute'>Trạng thái</div>
                            <div style={{ width: "160px" }}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="searchRoom"
                                    label="Tìm kiếm"
                                    name="searchRoom"
                                    autoComplete="searchRoom"
                                    // value={fullName}
                                    autoFocus
                                // onChange={handleChange}
                                />
                            </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <IconButton aria-label="edit"
                            // onClick={() => {
                            //     setModalUpdateOpen(true)
                            // }}
                            >
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={3}
                    defaultPage={1}
                // onChange={(e, pageNumber) => {
                //     setCurrentPage(pageNumber - 1)
                // }}
                />
            </div>
            {/* <div>

                <ModalUpdateAccount modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div> */}

        </>
    )
}

export default WaitingRoomManagementContent;