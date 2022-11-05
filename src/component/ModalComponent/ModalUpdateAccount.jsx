import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./style.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from "formik";
import * as yup from "yup";
import { INPUT_EMPTY, INPUT_PHONE } from '../../config/constant';
import { regexPhone, validationDate } from '../../config/validation';
import axios from 'axios';
import { listRoleAPI } from '../../config/baseAPI';
import moment from 'moment/moment';
import { updateAccount } from '../../redux/AccountSlice/listAccountSlice';
import { setName, setBirthdate, setUserName, setPhone, fetchAccount } from '../../redux/AccountSlice/choosenAccountSlice';


const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.modal.userId);
    const status = useSelector(state => state.listAccount.status)
    const statusUpdateAccount = useSelector(state => state.listAccount.statusUpdateAccount);
    const choosenAccount = useSelector(state => state.choosenAccount.choosenAccount);
    const fullName = useSelector(state => state.choosenAccount.name);
    const phone = useSelector(state => state.choosenAccount.phone);
    const userName = useSelector(state => state.choosenAccount.userName);
    const birthdate = useSelector(state => state.choosenAccount.birthdate);
    const roleName = useSelector(state => state.choosenAccount.roleName);
    const [errors, setErrors] = useState({ messageName: '', messagePhone: '' })
    const listAccount = useSelector(state => state.listAccount.listAccount)
    const [value, setValue] = useState(null);
    const [roleIds, setRoleIds] = useState([]);
    const [roleId, setRoleId] = useState();

    console.log(roleName)
    const validationSchema = yup.object({
        fullName: yup
            .string('Enter your name')
            .required('Your name is required'),
        phone: yup
            .string("Enter your phone")
            .matches(regexPhone, "Invalid Phone")
            .required("Phone is required"),
        salary: yup
            .string('Enter your salary')
            .required('Salary is required')
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phone: "",
            salary: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                id: userId,
                name: fullName,
                username: userName,
                phone: phone,
                roleId: roleId,
                birthdate: birthdate,
                roleName: roleName,
            }
            values.birthdate = moment(value.$d).format(validationDate);
            values.roleId = roleId;
            dispatch(updateAccount(data));
            setModalUpdateOpen(false);
        }
    })

    useEffect(() => {
        if (userId > 0 && modalUpdateOpen) {
            dispatch(fetchAccount(userId))
        }
    }, [userId])

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


    return (
        <>
            <Modal
                title="Thông tin nhân viên"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
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
                    value={fullName}
                    autoFocus
                    onChange={e => dispatch(setName(e.target.value))}
                />
                {errors.messageName && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{errors.messageName}</Typography>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    disabled
                    label="Tên đăng nhập"
                    name="username"
                    autoComplete="username"
                    value={userName}
                    autoFocus
                    onChange={e => dispatch(setUserName(e.target.value))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phone"
                    value={phone}
                    autoFocus
                    onChange={e => dispatch(setPhone(e.target.value))}
                />
                {errors.messagePhone && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{errors.messagePhone}</Typography>}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        value={birthdate}
                        onChange={(newValue) => {
                            dispatch(setBirthdate(newValue));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="permisstion">Quyền hạn</InputLabel>
                        <Select
                            labelId="permisstion"
                            id="permisstionSelect"
                            value={roleId}
                            label="Quyền hạn"
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

export default ModalUpdateAccount