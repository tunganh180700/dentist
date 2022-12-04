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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { regexEmail, regexNumber, regexPhone, validationDate } from '../../../config/validation';
import axios from 'axios';
import { listRoleAPI } from '../../../config/baseAPI';
import moment from 'moment/moment';
import { addAccount } from '../../../redux/AccountSlice/listAccountSlice';
import axiosInstance from '../../../config/customAxios';

const ModalAddAcount = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [roleIds, setRoleIds] = useState([]);
    const [roleId, setRoleId] = useState();
    const [error, setError] = useState([])

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
        email: yup
            .string("Enter your email")
            .matches(regexEmail, "Invalid email")
            .required("Email is required"),
        salary: yup
            .string('Enter your salary')
            .matches(regexNumber, "Only number")
            .required('Salary is required')
    });


    const loadRole = async () => {
        try {
            const res = await axiosInstance.get(listRoleAPI)
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
            email: "",
            password: "",
            salary: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.roleId = roleId;
            dispatch(addAccount(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    const handleCancel = () => {
        setModalAddOpen(false)

        formik.values.fullName = ""
        formik.errors.fullName = ""

        formik.values.password = ""
        formik.errors.password = ""

        formik.values.phone = ""
        formik.errors.phone = ""

        formik.values.email = ""
        formik.errors.email = ""

        formik.values.salary = ""
        formik.errors.salary = ""

        setValue(null)
    }

    return (
        <>
            <Modal
                title="Thêm tài khoản"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Họ và tên"
                    name="fullName"
                    autoComplete="fullName"
                    value={formik.values.fullName}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.fullName && formik.touched.fullName && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.fullName}</Typography>}
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
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phonenumber"
                    value={formik.values.phone}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.phone}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.email}</Typography>}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        name="birthdate"
                        value={value}
                        disableFuture={true}
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
                {formik.errors.salary && formik.touched.salary && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.salary}</Typography>}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="permisstion">Quyền hạn</InputLabel>
                        <Select
                            labelId="permisstion"
                            id="permisstionSelect"
                            label="Quyền hạn"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
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