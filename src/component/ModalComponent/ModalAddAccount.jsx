import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Pagination, Typography, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ModalAddAcount = ({modalAddOpen, setModalAddOpen}) => {
    const [value, setValue] = useState();
    return (
        <>
           <Modal
                title="Thêm tài khoản"
                open={modalAddOpen}
                onOk={() => setModalAddOpen(false)}
                onCancel={() => setModalAddOpen(false)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Họ và tên"
                    name="name"
                    autoComplete="name"
                    // value={fullName}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    disabled
                    label="Tên đăng nhập"
                    name="username"
                    autoComplete="username"
                    // value={userName}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    // value={phone}
                    autoFocus
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        value={value}
                        onChange={(newValue) => {
                           setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="salary"
                    label="Lương"
                    name="salary"
                    autoComplete="salary"
                    // value={phone}
                    autoFocus
                />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="permisstion">Quyền hạn</InputLabel>
                        <Select
                            labelId="permisstion"
                            id="permisstionSelect"
                            // value={permisstion}
                            label="Quyền hạn"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}

export default ModalAddAcount;