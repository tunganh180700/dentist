import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { regexEmail, regexPhone, validationDate } from '../../../config/validation';
import { useFormik } from 'formik';
import moment from 'moment';
import { addPatient } from '../../../redux/PatienSlice/listPatientSlice';

const ModalAddPatient = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [gender, setGender] = useState();

    const validationSchema = yup.object({
        patientName: yup
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
        address: yup
            .string("Enter your address")
            .required("Address is required"),
    });

    const formik = useFormik({
        initialValues: {
            patientName: '',
            phone: "",
            email: "",
            address: '',
            bodyPrehistory: '',
            teethPrehistory: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            values.gender = gender;
            dispatch(addPatient(values))
            setModalAddOpen(false)
            formik.handleReset()
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
                    id="patientName"
                    label="Họ và tên bệnh nhân"
                    name="patientName"
                    autoComplete="patientName"
                    value={formik.values.patientName}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.patientName && <Typography style={{ color: 'red' }}>{formik.errors.patientName}</Typography>}
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
                    value={formik.values.phone}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.phone && <Typography style={{ color: 'red' }}>{formik.errors.phone}</Typography>}
                <FormControl style={{ display: 'flex' }}>
                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: "80%" }}>Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{ marginRight: "30%" }}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                        <FormControlLabel value={true} control={<Radio />} label="Nam" />
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
                    value={formik.values.address}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.address && <Typography style={{ color: 'red' }}>{formik.errors.address}</Typography>}
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
                {formik.errors.email && <Typography style={{ color: 'red' }}>{formik.errors.email}</Typography>}
                <TextField
                    margin="normal"
                    fullWidth
                    id="bodyPrehistory"
                    label="Tiền sử cơ thể"
                    name="bodyPrehistory"
                    autoComplete="bodyPrehistory"
                    value={formik.values.bodyPrehistory}
                    autoFocus
                    onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="teethPrehistory"
                    label="Tiền sử răng miệng"
                    name="teethPrehistory"
                    autoComplete="teethPrehistory"
                    value={formik.values.teethPrehistory}
                    autoFocus
                    onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalAddPatient