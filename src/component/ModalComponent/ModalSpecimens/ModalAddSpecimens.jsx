import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../config/customAxios';
import { addSpecimens } from '../../../redux/SpecimensSlice/listSpecimensSlice';
import { listAllPatientAPI, getSpecimensByIdAPI, listPatientRecordByTreatmentIdAPI } from '../../../config/baseAPI';
import { regexNumber, validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import moment from 'moment/moment';


const ModalAddSpecimens = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState();
    const specimenId = useSelector(state => state.modal.userId);
    const laboId = useSelector(state => state.modal.laboId);

    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();

    const [patientRecordIds, setPatientRecordIds] = useState([]);
    const [patientRecordId, setPatientRecordId] = useState();

    const [receiveDate, setReceiveDate] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);

    const validationSchema = yup.object({
        specimenName: yup
            .string('Enter amount')
            .required('Your amount is required'),

        amount: yup
            .string('Enter amount')
            .matches(regexNumber, "Only number or positive number")
            .required('Your amount is required'),
        unitPrice: yup
            .string('Enter amount')
            .matches(regexNumber, "Only number or positive number")
            .required('Your amount is required'),

    });

    const loadPatient = async () => {
        try {
            const res = await axiosInstance.get(listAllPatientAPI)
            setPatientId(res.data[0].patientId)
            setPatientIds(res.data)

            console.log('patient', res.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadPatient();
    }, [])

    const formik = useFormik({
        initialValues: {
            specimensName: "",
            amount: "",
            unitPrice: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.receiveDate = moment(receiveDate.$d).format(validationDate);
            values.deliveryDate = moment(deliveryDate.$d).format(validationDate);
            values.patientId = patientId;
            values.laboId = laboId;
            values.patientRecordId = patientRecordId;
            dispatch(addSpecimens(values));
            setModalAddOpen(false);
        }
    })

    // useEffect(() => {
    //     setLoading(true)
    //     dispatch(fetchAllSpecimens(detailLabo));
    //     setLoading(false)
    // }, [isDeleteSpecimens, isUpdateSpecimens, isAddSpecimens])

    // const fetchSpecimens = async (specimenId) => {
    //     setLoading(true)
    //     try {
    //         const res = await axiosInstance.get(
    //             getSpecimensByIdAPI + specimenId,
    //         )
    //         console.log(res.data)
    //         formik.setValues(res.data)
    //         console.log('id', res.data.specimenName)
    //         setPatientRecordId(res.data.patientRecordId)
    //         // setMaterialId(res.data.materialId)
    //         console.log('day roi: ', res.data.patientRecordId)
    //         setReceiveDate(res.data.receiveDate)
    //         setDeliveryDate(res.data.deliveryDate)
    //         setValue(res.data.dateRecord)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     if (specimenId > 0)
    //         fetchSpecimens(specimenId)
    // }, [specimenId])

    const loadRecordByTreatmentId = async (patientId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                listPatientRecordByTreatmentIdAPI + patientId,
            )
            //  setPatientRecordId(res.data[0].patientId)
            setPatientRecordId(res.data[0].patientRecordId)
            setPatientRecordIds(res.data)


        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (patientId > 0)
            loadRecordByTreatmentId(patientId)
    }, [patientId])

    return (
        <>
            <Modal
                title="Theem mẫu thử nghiệm"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
            >
                {loading === false && <>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="specimenName"
                        label="Mẫu thử nghiệm"
                        name="specimenName"
                        autoComplete="specimenName"
                        value={formik.values.specimenName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.specimenName && formik.touched.specimenName && < Typography style={{ color: 'red' }}>{formik.errors.specimenName}</Typography>}


                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="patient">Bệnh nhân</InputLabel>
                            <Select
                                labelId="patient"
                                id="patientSelect"
                                label="Bệnh nhân"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                            >
                                {patientIds?.map(item => (
                                    <MenuItem key={item.patientId} value={item.patientId}>{item.patientName}</MenuItem>

                                ))}

                            </Select>

                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="patientrecord">Date record</InputLabel>
                            <Select
                                labelId="patientrecord"
                                id="patientrecordSelect"
                                label="Date record"
                                value={patientRecordId}
                                onChange={(e) => setPatientRecordId(e.target.value)}
                            >
                                {patientRecordIds?.map(item => (
                                    <MenuItem key={item.patientRecordId} value={item.patientRecordId}>{item.date}</MenuItem>

                                ))}

                            </Select>

                        </FormControl>
                    </Box>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="amount"
                        label="Số lượng"
                        name="amount"
                        autoComplete="amount"
                        value={formik.values.amount}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.amount && formik.touched.amount && <Typography style={{ color: 'red' }}>{formik.errors.amount}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="unitPrice"
                        label="Đơn giá"
                        name="unitPrice"
                        autoComplete="unitPrice"
                        value={formik.values.unitPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.unitPrice && formik.touched.unitPrice && <Typography style={{ color: 'red' }}>{formik.errors.unitPrice}</Typography>}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày nhận"
                            name="receiveDate"
                            value={receiveDate}
                            onChange={(newValue) => {
                                setReceiveDate(newValue);
                                console.log(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày giao"
                            name="birthdate"
                            value={deliveryDate}
                            onChange={(newValue) => {
                                setDeliveryDate(newValue);
                                console.log(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </>}

            </Modal>
        </>
    )
}


export default ModalAddSpecimens