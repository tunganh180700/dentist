import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { updateMaterialExport } from '../../../redux/MaterialSlice/listMaterialExportSlice';
import { getMaterialExportByIdAPI, listAllMaterialAPI, listAllPatientAPI, listPatientRecordByTreatmentIdAPI } from '../../../config/baseAPI';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../config/customAxios';
import moment from 'moment';
import { regexNumber, validationDate } from '../../../config/validation';
import { set, values } from 'lodash';
import * as yup from "yup";

const ModalUpdateMaterialExport = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const materialExportId = useSelector(state => state.modal.materialExportId);

    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();
    const [materialPrice, setMaterialPrice] = useState();
    const [unitPrice, setUnitPrice] = useState();

    const [oldData, setOldData] = useState();

    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();

    const [patientRecordIds, setPatientRecordIds] = useState([]);
    const [patientRecordId, setPatientRecordId] = useState();



    const validationSchema = yup.object({
        // materialName: yup
        //     .string('Enter material name')
        //     .required('Your material name is required'),

        amount: yup
            .string('Enter amount')
            .matches(regexNumber, "Only number or positive number")
            .required('Your amount is required'),
        // patient: yup
        //     .string('Enter patient')
        //     .required('Your patient is required')
    });
    const loadMaterial = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(listAllMaterialAPI)
            setMaterialId(res.data[0].materialId)
            setMaterialIds(res.data)

            console.log('sdasd', res.data[0].materialId)


        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadMaterial();
    }, [])

    const loadPatient = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(listAllPatientAPI)
            setPatientId(res.data[0].patientId)
            setPatientIds(res.data)

            console.log('patient', res.data)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    useEffect(() => {
        loadPatient();
    }, [])


    const formik = useFormik({
        initialValues: {
            materialId: materialId
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            values.patientId = patientId;
            values.totalPrice = materialPrice;
            values.unitPrice = unitPrice;
            values.patientRecordId = patientRecordId;
            dispatch(updateMaterialExport(values));
            setModalUpdateOpen(false);
        },
    })

    const fetchMaterialExport = async (materialExportId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getMaterialExportByIdAPI + materialExportId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            console.log('id', res.data.materialId)
            setOldData(res.data)
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
            const res = await axiosInstance.get(
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
    }, [patientId, modalUpdateOpen])

    useEffect(() => {
        const price = materialIds?.filter(e => e.materialId === materialId)[0]?.price * (formik.values.amount || 0)

        setMaterialPrice(price)
    }, [materialId, formik.values.amount])

    useEffect(() => {
        const unitPrice = materialIds?.filter(e => e.materialId === materialId)[0]?.price
        setUnitPrice(unitPrice)
    }, [materialId])


    const handleCancel = async () => {
        formik.values.amount = oldData.amount

        formik.errors.amount = ""
        formik.touched.amount = ""
        // const res = await axiosInstance.get(
        //     getMaterialExportByIdAPI + materialExportId,
        // )
        // setMaterialId(res.data.materialId)
        // setPatientId(res.data.patientId)
        // setPatientRecordId(res.data.patientRecordId)
        // formik.values.amount = res.data.amount
        setModalUpdateOpen(false)
    }

    return (
        <>
            <Modal
                title="Thông tin vật liệu nhập khẩu"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
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

                    <Box fullWidth>
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
                        disabled
                        fullWidth
                        id="unitPrice"
                        label="Đơn giá"
                        name="unitPrice"
                        autoComplete="unitPrice"
                        value={unitPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.unitPrice && formik.touched.unitPrice && <Typography style={{ color: 'red' }}>{formik.errors.unitPrice}</Typography>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="totalPrice"
                        label="Tổng giá"
                        name="totalPrice"
                        autoComplete="totalPrice"
                        value={materialPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                </>}

            </Modal>
        </>
    )
}

export default ModalUpdateMaterialExport