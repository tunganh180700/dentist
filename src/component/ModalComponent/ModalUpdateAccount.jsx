import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./style.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from "formik";
import * as yup from "yup";
import { fetchAccount, setName } from '../../redux/choosenAccountSlice';
import FormList from 'antd/lib/form/FormList';


const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.modal.userId);
    const status = useSelector(state => state.listAccount.status)
    const statusUpdateAccount = useSelector(state => state.listAccount.statusUpdateAccount);
    const choosenAccount = useSelector(state => state.choosenAccount.choosenAccount);
    const fullName = useSelector(state => state.choosenAccount.name);
    const phone = useSelector(state => state.choosenAccount.phone);
    const userName = useSelector(state => state.choosenAccount.userName);
    const [value, setValue] = useState();
    const [permisstion, setPermisstion] = useState();

    const formik = useFormik({
        initialValues: {
            name: "",
            userName: "",
            phone: "",
        },
        onSubmit: (values) => {
            console.log(formik.errors)
            console.log(values)
        }
    })
    const handleChange = (SelectChangeEvent) => {
        setPermisstion(SelectChangeEvent);
    };

    // console.log(choosenAccount.userName)
    // const handleOk = () => {
    //     const data = {
    //         id: userId,
    //         name: choosenAccount.fullName,
    //         username: choosenAccount.userName,
    //         phone: choosenAccount.phone,
    //         birthdate: choosenAccount.birthdate,
    //     }
    //     dis
    // }    
    useEffect(() => {
        formik.setValues(choosenAccount)
    }, [choosenAccount])

    useEffect(() => {
        if (userId > 0 && modalUpdateOpen) {
            dispatch(fetchAccount(userId))
        }
    }, [userId])

    const myHandleChange = (e) => {
        dispatch(setName(e.target.value))
    }
    return (
        <>
            <Modal
                title="Thông tin nhân viên"
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
                    value={fullName}
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
                    value={userName}
                    autoFocus
                // onChange={myHandleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="Số điện thoại"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    value={phone}
                    autoFocus
                // onChange={handleChange}
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
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="permisstion">Quyền hạn</InputLabel>
                        <Select
                            labelId="permisstion"
                            id="permisstionSelect"
                            value={permisstion}
                            label="Quyền hạn"
                            onChange={handleChange}
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

export default ModalUpdateAccount