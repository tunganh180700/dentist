import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField, Button } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { updateSpecimen } from '../../../redux/SpecimenSlice/listSpecimenSlice';
import { getSpecimensByIdAPI, listAllPatientAPI, listPatientRecordByTreatmentIdAPI, getAllLaboAPI, listTreatingServiceAPI, useSpecimenAPI } from '../../../config/baseAPI';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../config/customAxios';
import { regexNumber, validationDate } from '../../../config/validation';
import * as yup from "yup";
import moment from 'moment/moment';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModalReportSpecimen from './ModalReportSpecimen';
import { toast } from 'react-toastify';


const ModalUpdateSpecimens = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const specimenId = useSelector(state => state.modal.specimenId);
    const [loading, setLoading] = useState();
    const [patientIds, setPatientIds] = useState([]);
    const [patientId, setPatientId] = useState();

    const [patientRecordIds, setPatientRecordIds] = useState([]);
    const [patientRecordId, setPatientRecordId] = useState();

    const [receiveDate, setReceiveDate] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(null);

    const [serviceId, setServiceId] = useState(null);
    const [services, setServices] = useState([]);
    const [labos, setLabos] = useState([]);
    const [laboId, setLaboId] = useState(null);

    const [buttonUseEnable, setButtonUseEnable] = useState(false);
    const [buttonReportEnable, setButtonReportEnable] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    const [statusStr, setStatusStr] = useState('');

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
            console.log('patient = ', res.data)
            setPatientIds(res.data)
            setPatientId(res.data[0].patientId)
        } catch (error) {
            console.log(error)
        }
    }

    const loadLabos = async () => {
        try {
            const res = await axiosInstance.get(getAllLaboAPI)
            console.log('labos = ', res.data)
            setLabos(res.data);
            setLaboId(res.data[0].laboId);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadPatient();
        loadLabos();
    }, [])


    const formik = useFormik({
        initialValues: {
            specimenName: "",
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
            values.serviceId = serviceId;
            dispatch(updateSpecimen(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchSpecimens = async (specimenId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getSpecimensByIdAPI + specimenId,
            )
            console.log('spec = ', res.data);
            formik.setValues(res.data)
            setPatientId(res.data.patientId)
            setPatientRecordId(res.data.patientRecordId)
            setServiceId(res.data.serviceId)
            setLaboId(res.data.laboId)
            setReceiveDate(res.data.receiveDate)
            setDeliveryDate(res.data.deliveryDate)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (specimenId > 0)
            fetchSpecimens(specimenId)
    }, [specimenId])

    const loadRecordByTreatmentId = async (patientId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                listPatientRecordByTreatmentIdAPI + patientId,
            )
            setPatientRecordIds(res.data)
            setPatientRecordId(res.data[0].patientRecordId)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const loadServiceByPatientId = async (patientId) => {
        console.log('s-patientid = ',patientId);
        setLoading(true)
        console.log('s-patientid after loading= ',patientId);
        try {
            console.log('s-patientid res = ',patientId);
            const res = await axiosInstance.get(
                listTreatingServiceAPI + patientId,
            )
            console.log('services = ',res.data);
            setServices(res.data)
            setServiceId(res.data[0].serviceId)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (patientId > 0) {
            loadRecordByTreatmentId(patientId)
            loadServiceByPatientId(patientId)
        }
    }, [patientId])

    useEffect(() => {
        if (receiveDate === null && deliveryDate === null) {
            setStatusStr('Chuẩn bị mẫu vật');
        }
        else if (receiveDate !== null && deliveryDate === null) {
            setStatusStr('Labo nhận mẫu');
        }
        else if (receiveDate !== null && deliveryDate !== null) {
            setStatusStr('Labo giao mẫu');
        }
        else {
            setStatusStr('Trạng thái');
        }
    }, [receiveDate, deliveryDate])

    const useSpecimen = async () => {
        try {
            const res = await axiosInstance.post(useSpecimenAPI+specimenId);
            console.log('use = ',res);
            toast('Cập nhật sử dụng mẫu vật thành công');
        } catch (error) {
            console.log(error);
            toast('Cập nhật sử dụng mẫu vật không thành công');
        }
    }

    return (
        <>
            <Modal
                title="Cập nhật mẫu thử nghiệm"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {/* {loading === false && <> */}
                    {buttonReportEnable ?
                        <><Button style={{ color: 'red' }} onClick={()=>{setReportOpen(true)}}>Mẫu lỗi, bàn giao lại cho labo</Button></>
                        :
                        <></>
                    }
                    {buttonUseEnable ?
                        <><Button style={{ color: 'green' }} onClick={useSpecimen}>Sử dụng</Button></>
                        :
                        <></>
                    }
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
                    {formik.errors.specimenName && <Typography style={{ color: 'red' }}>{formik.errors.specimenName}</Typography>}

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
                        id="unitPrice"
                        label="Đơn giá"
                        name="unitPrice"
                        autoComplete="unitPrice"
                        value={formik.values.unitPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.unitPrice && <Typography style={{ color: 'red' }}>{formik.errors.unitPrice}</Typography>}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày nhận"
                            name="receiveDate"
                            value={receiveDate}
                            onChange={(newValue) => {
                                setReceiveDate(newValue);
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
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="service">Dịch vụ</InputLabel>
                            <Select
                                labelId="service"
                                id="serviceSelect"
                                label="Dịch vụ"
                                value={serviceId}
                                onChange={(e) => setServiceId(e.target.value)}
                            >
                                {services?.map(item => (
                                    <MenuItem key={item.serviceId} value={item.serviceId}>{item.serviceName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="labo">Labo</InputLabel>
                            <Select
                                labelId="labo"
                                id="laboSelect"
                                label="Labo"
                                value={laboId}
                                onChange={(e) => setLaboId(e.target.value)}
                            >
                                {labos?.map(item => (
                                    <MenuItem key={item.laboId} value={item.laboId}>{item.laboName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Trạng thái"
                        value={statusStr}
                        autoFocus
                        disabled={true}
                    />
                {/* </>} */}
            </Modal>
            <div>
                <ModalReportSpecimen reportOpen={reportOpen} setReportOpen={setReportOpen} />
            </div>
        </>
    )
}

export default ModalUpdateSpecimens