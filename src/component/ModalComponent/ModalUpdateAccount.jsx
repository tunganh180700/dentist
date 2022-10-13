import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [value, setValue] = useState < Dayjs | null > (null);

    return (
        <>
            <Modal
                title="20px to Top"
                open={modalUpdateOpen}
                onOk={() => setModalUpdateOpen(false)}
                onCancel={() => setModalUpdateOpen(false)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Họ và tên"
                    name="name"
                    autoComplete="name"
                    autoFocus
                // onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Tên đăng nhập"
                    name="username"
                    autoComplete="username"
                    autoFocus
                // onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    autoFocus
                // onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Modal>
        </>
    )
}

export default ModalUpdateAccount