import Button from 'react-bootstrap/Button';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import axiosInstance from '../../../config/customAxios';
import { getScheduleByIdAPI,listAllPatientAPI } from '../../../config/baseAPI';
import { updateSchedule } from '../../../redux/ScheduleSlice/listScheduleSlice';

import { validationDate } from "../../../config/validation";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const ModalUpdateSchedule = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(new Date());
    const [loading, setLoading] = useState();
    const waitingRoomId = useSelector(state => state.modal.waitingRoomId);
    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();
    const [phone, setPhone] = useState();

    const [oldData, setOldData] = useState();


    const formik = useFormik({
        initialValues: {

        },
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            dispatch(updateSchedule(values))
            setModalUpdateOpen(false)
            formik.handleReset()
        }
    });

    const fetchSchedule = async (waitingRoomId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getScheduleByIdAPI + waitingRoomId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setValue(res.data.date)
            setOldData(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (waitingRoomId > 0)
            fetchSchedule(waitingRoomId)
    }, [waitingRoomId])

    const handleCancel = () => {
        formik.values.date = oldData.date
        formik.values.note = oldData.note
        formik.values.patientName = oldData.patientName
        formik.values.phone = oldData.phone
        setValue(oldData.date)
        setModalUpdateOpen(false)
    }


    return (
        <>
            <Modal
                title="Thêm Lịch hẹn"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                 {loading === false && <>
                
                    <TextField
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        id="patientName"
                        label="Bệnh nhân"
                        name="patientName"
                        autoComplete="patientName"
                        value={formik.values.patientName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                <TextField
                    margin="normal"
                    required
                    disabled
                    fullWidth
                    id="phone"
                    label="Số điện thoại"
                    name="phone"
                    autoComplete="phone"
                    value={formik.values.phone}
                    autoFocus
                    onChange={formik.handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày khám"
                        name="date"
                        value={value}
                        disablePast={true}
                        onChange={(newValue) => {
                            setValue(newValue);
                            console.log(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    fullWidth
                    id="note"
                    label="Lưu ý"
                    name="note"
                    autoComplete="note"
                    value={formik.values.note}
                    multiline
                    rows={10}
                    autoFocus
                    onChange={formik.handleChange}
                    variant="outlined"
                />

                </>}
            </Modal>
        </>
    );
}


export default ModalUpdateSchedule;