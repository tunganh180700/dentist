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
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from '../../redux/listAccountSlice';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexPhone, validationDate } from '../../config/validation';
import axios from 'axios';
import { listRoleAPI } from '../../config/baseAPI';
import moment from 'moment/moment';

const ModalAddAcount = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [roleIds, setRoleIds] = useState([]);
    const [roleId, setRoleId] = useState();

    const validationSchema = yup.object({
        fullName: yup
            .string('Enter your name')
            .required('Your name is required'),
        phone: yup
            .string("Enter your phone")
            .matches(regexPhone, "Invalid Phone")
            .required("Phone is required"),
        password: yup
            .string("Enter your password")
            .required("Password is required"),
        salary: yup
            .string('Enter your salary')
            .required('Salary is required')
    });

    const loadRole = async () => {
        try {
            const res = await axios.get(listRoleAPI)
            console.log(res)
            setRoleId(res.data[0].roleId)
            setRoleIds(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadRole();
    }, [])

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: "",
            password: "",
            salary: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.roleId = roleId;
            dispatch(addAccount(values))
            setModalAddOpen(false)
        }
    });

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
                    id="name"
                    label="Họ và tên"
                    name="fullName"
                    autoComplete="name"
                    value={formik.values.fullName}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.fullName && <Typography style={{ color: 'red' }}>{formik.errors.fullName}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Mat khau"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    value={formik.values.password}
                    type={"password"}
                    onChange={formik.handleChange}
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
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phonenumber"
                    value={formik.values.phone}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>}
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
                    id="salary"
                    label="Lương"
                    name="salary"
                    autoComplete="salary"
                    value={formik.values.salary}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.salary && <Typography style={{ color: 'red' }}>{formik.errors.salary}</Typography>}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="permisstion">Quyền hạn</InputLabel>
                        <Select
                            labelId="permisstion"
                            id="permisstionSelect"
                            label="Quyền hạn"
                            value={roleId}
                            onChange={(e)=>setRoleId(e.target.value)}
                        >
                            {roleIds?.map(item => (
                                <MenuItem key={item.roleId} value={item.roleId}>{item.roleName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}

export default ModalAddAcount;