import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./../style.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import moment from 'moment/moment';
import { updateAccount } from '../../../redux/AccountSlice/listAccountSlice';
import { regexEmail, regexNumber, regexPhone, validationDate } from '../../../config/validation';
import { getAccountByIdAPI, listRoleAPI } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';


const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.modal.userId);
    const [loading, setLoading] = useState();
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
        email: yup
            .string("Enter your email")
            .matches(regexEmail, "Invalid email")
            .required("Email is required"),
        salary: yup
            .string('Enter your salary')
            .matches(regexNumber, "Only number or positive number")
            .required('Salary is required')
    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.roleId = roleId;
            const roleNameArray = roleIds.filter((el) => {
                if (el.roleId === roleId) {
                    return el
                }
            })

            values.roleName = roleNameArray[0].roleName
            dispatch(updateAccount(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchAccount = async (userId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getAccountByIdAPI + userId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setRoleId(res.data.roleId)
            setValue(res.data.birthdate)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userId > 0)
            fetchAccount(userId)
    }, [userId, roleId])

    const loadRole = async () => {
        try {
            const res = await axiosInstance.get(listRoleAPI)
            setRoleId(res.data[0].roleId)
            setRoleIds(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadRole();
    }, [])


    return (
        <>
            <Modal
                title="Thông tin nhân viên"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {loading === false && <>
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
                        id="username"
                        disabled
                        label="Tên đăng nhập"
                        name="username"
                        value={formik.values.userName}
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
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateAccount