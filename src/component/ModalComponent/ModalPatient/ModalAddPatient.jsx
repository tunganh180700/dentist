import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";

const ModalAddPatient = ({ modalAddOpen, setModalAddOpen }) => {
    const [value, setValue] = useState(null);

    const formik = () => {

    }
    return (
        <>
            <Modal
                title="Thêm tài khoản"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Họ và tên"
                    name="fullName"
                    autoComplete="fullName"
                    // value={formik.values.fullName}
                    autoFocus
                // onChange={formik.handleChange}
                />
                {/* {formik.errors.fullName && <Typography style={{ color: 'red' }}>{formik.errors.fullName}</Typography>} */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        name="birthdate"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            console.log(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phonenumber"
                    // value={formik.values.phone}
                    autoFocus
                // onChange={formik.handleChange}
                />
                {/* {formik.errors.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>} */}
                <FormControl style={{ display: 'flex' }}>
                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: "80%" }}>Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{ marginRight: "30%" }}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Địa chỉ"
                    name="address"
                    autoComplete="address"
                    // value={formik.values.salary}
                    autoFocus
                // onChange={formik.handleChange}
                />
                {/* {formik.errors.salary && <Typography style={{ color: 'red' }}>{formik.errors.salary}</Typography>} */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    // value={formik.values.salary}
                    autoFocus
                // onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalAddPatient