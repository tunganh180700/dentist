import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { updateMaterialExport } from '../../../redux/MaterialSlice/listMaterialExportSlice';
import { getMaterialExportByIdAPI, listAllMaterialAPI, listAllPatientAPI, listPatientRecordByTreatmentIdAPI } from '../../../config/baseAPI';
import { validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment/moment';

const ModalUpdateMaterialExport = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const materialExportId = useSelector(state => state.modal.materialExportId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();
    const [materialPrice, setMaterialPrice] = useState();

    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();

    const [patientRecordIds, setPatientRecordIds] = useState([]);
    const [patientRecordId, setPatientRecordId] = useState();



    // const validationSchema = yup.object({
    //     materialName: yup
    //         .string('Enter material name')
    //         .required('Your material name is required'),

    //     amount: yup
    //         .string('Enter amount')
    //         .required('Your amount is required'),
    //     patient: yup
    //         .string('Enter patient')
    //         .required('Your patient is required')
    // });
    const loadMaterial = async () => {
        try {
            const res = await axios.get(listAllMaterialAPI)
            setMaterialId(res.data[0].materialId)
            setMaterialIds(res.data)

            console.log('sdasd', res.data[0].materialId)


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

        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            // values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            values.patientId = patientId;
            values.totalPrice = materialPrice;
            values.patientRecordId = patientRecordId;
            dispatch(updateMaterialExport(values));
            setModalUpdateOpen(false);
        }
    })

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
                title="Thông tin vật liệu nhập khẩu"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {loading === false && <>

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
                        label="Số lượng"
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
                        fullWidth
                        id="totalPrice"
                        label="Tổng giá"
                        name="totalPrice"
                        autoComplete="totalPrice"
                        value={materialPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.totalPrice && <Typography style={{ color: 'red' }}>{formik.errors.totalPrice}</Typography>}
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateMaterialExport