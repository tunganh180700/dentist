import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as yup from "yup";
import { updateMaterialImport } from '../../../redux/MaterialSlice/listMaterialImportSlice';
import { getMaterialImportByIdAPI, listAllMaterialAPI } from '../../../config/baseAPI';
import { validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment/moment';
import axiosInstance from '../../../config/customAxios';

const ModalUpdateMaterialImport = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch();
    const materialImportId = useSelector(state => state.modal.materialImportId);
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();
    const [materialPrice, setMaterialPrice] = useState();
    const [unitPrice, setUnitPrice] = useState();

    const validationSchema = yup.object({
        materialName: yup
            .string('Enter material name')
            .required('Your material name is required'),
        supplyName: yup
            .string('Enter supplyName')
            .required('Your supplyName is required'),
        amount: yup
            .string('Enter amount')
            .required('Your amount is required'),
            amount: yup
            .string('Enter amount')
            .required('Your amount is required'),

    });

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            // values.totalPrice = materialPrice;
            // values.unitPrice = unitPrice;
            dispatch(updateMaterialImport(values));
            setModalUpdateOpen(false);
        }
    })

    const fetchMaterialImport = async (materialImportId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                getMaterialImportByIdAPI + materialImportId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            console.log('id', res.data.materialId)
            setMaterialId(res.data.materialId)
            console.log('here: ',res.data.materialId )
            setValue(res.data.date)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (materialImportId > 0)
            fetchMaterialImport(materialImportId)
    }, [materialImportId])


    useEffect(() => {
        const price = materialIds?.filter(e => e.materialId === materialId)[0]?.price * (formik.values.amount || 0)
        setMaterialPrice(price)
    }, [materialId, formik.values.amount])

    useEffect(() => {
        const unitprice = materialIds?.filter(e => e.materialId === materialId)[0]?.unitPrice 
        setUnitPrice(unitprice)
    }, [materialId])
    const loadMaterial = async () => {
        try {
            const res = await axiosInstance.get(listAllMaterialAPI)
            setMaterialIds(res.data)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMaterial();
    }, [])

    return (
        <>
            <Modal
                title="Thông tin vật liệu nhập khẩu"
                open={modalUpdateOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalUpdateOpen(false)}
            >
                {loading === false && <>
                    <TextField
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        id="materialName"
                        label="Vật liệu"
                        name="materialName"
                        autoComplete="materialName"
                        value={formik.values.materialName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.materialName && <Typography style={{ color: 'red' }}>{formik.errors.materialName}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="supplyName"
                        label="Vật liệu cung cấp"
                        name="supplyName"
                        autoComplete="supplyName"
                        value={formik.values.supplyName}
                        autoFocus
                        onChange={formik.handleChange}
                    />
                    {formik.errors.supplyName && <Typography style={{ color: 'red' }}>{formik.errors.supplyName}</Typography>}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            name="date"
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

                     {/* <TextField
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        id="totalPrice"
                        label="Tổng tiền"
                        name="totalPrice"
                        autoComplete="totalPrice"
                        value={materialPrice}
                        autoFocus
                        onChange={formik.handleChange}
                    /> */}
                      </>}

            </Modal>
        </>
    )
}

export default ModalUpdateMaterialImport