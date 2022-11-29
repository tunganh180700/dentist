import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addMaterialExport } from '../../../redux/MaterialSlice/listMaterialExportSlice';
import { validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { listMaterialAPI, listAllMaterialAPI, listAllPatientAPI, getMaterialExportByIdAPI,listPatientRecordByTreatmentIdAPI } from '../../../config/baseAPI';
import axios from 'axios';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Label } from '@mui/icons-material';

const ModalAddMaterialExport = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState();
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();
    const [materialPrice, setMaterialPrice] = useState();
    const [materialExportId, setMaterialExportId] = useState();


    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();

    const [patientRecordIds, setPatientRecordIds] = useState([]);
    const [patientRecordId, setPatientRecordId] = useState();


    const validationSchema = yup.object({

        amount: yup
            .string('Enter amount')
            .required('Your amount is required')

    });



    const loadMaterial = async () => {
        try {
            const res = await axios.get(listAllMaterialAPI)
            setMaterialId(res.data[0].materialId)
            setMaterialIds(res.data)
            setMaterialPrice(res.data[0].price)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMaterial();
    }, [])

    const loadPatient = async () => {
        try {
            const res = await axios.get(listAllPatientAPI)
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
            amount: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            values.patientId = patientId;
            values.totalPrice = materialPrice;
            values.patientRecordId = patientRecordId;
            console.log(values);
            dispatch(addMaterialExport(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    const fetchMaterialExport = async (materialExportId) => {
        setLoading(true)
        try {
            const res = await axios.get(
                getMaterialExportByIdAPI + materialExportId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            console.log('id', res.data.materialId)
            setPatientRecordId(res.data.patientRecordId)
            setMaterialExportId(res.data.materialExportId)
            // setMaterialId(res.data.materialId)
            console.log('day roi: ', res.data.patientRecordId)
            setValue(res.data.date)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (materialExportId > 0)
            fetchMaterialExport(materialExportId)
    }, [materialExportId])

    const loadRecordByTreatmentId = async (patientId) => {
        setLoading(true)
        try {
            const res = await axios.get(
                listPatientRecordByTreatmentIdAPI + patientId,
            )
            //  setPatientRecordId(res.data[0].patientId)
            setPatientRecordId(res.data[0].patientRecordId)
            setPatientRecordIds(res.data)
            console.log('kiem tra', res.data)
            console.log('data here:', res.data.reason)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (patientId > 0)
            loadRecordByTreatmentId(patientId)
    }, [patientId])

    useEffect(() => {
        const price = materialIds?.filter(e => e.materialId === materialId)[0]?.price * (formik.values.amount || 0)

        setMaterialPrice(price)
    }, [materialId, formik.values.amount])



    return (
        <>
            <Modal
                title="Thêm vật liệu nhập khẩu"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddOpen(false)}
            >

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="material">Vật liệu</InputLabel>
                        <Select
                            labelId="material"
                            id="materialSelect"
                            label="Vật liệu"
                            value={materialId}
                            onChange={(e) => setMaterialId(e.target.value)}
                        >
                            {materialIds?.map(item => (
                                <MenuItem key={item.materialId} value={item.materialId}>{item.materialName}</MenuItem>

                            ))}

                        </Select>

                    </FormControl>
                </Box>

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
                    label="Số lương"
                    name="amount"
                    autoComplete="amount"
                    value={formik.values.amount}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.amount && <Typography style={{ color: 'red' }}>{formik.errors.amount}</Typography>}

                <TextField
                    margin="normal"
                    required
                    disabled
                    fullWidth
                    id="totalPrice"
                    label="Total Price"
                    name="totalPrice"
                    autoComplete="totalPrice"
                    value={materialPrice}
                    autoFocus
                    onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalAddMaterialExport;