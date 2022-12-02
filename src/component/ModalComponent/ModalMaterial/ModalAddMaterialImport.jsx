import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addMaterialImport } from '../../../redux/MaterialSlice/listMaterialImportSlice';
import { validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { listAllMaterialAPI } from '../../../config/baseAPI';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment/moment';
import axiosInstance from '../../../config/customAxios';

const ModalAddMaterialImport = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();
    const [materialPrice, setMaterialPrice] = useState();


    // const [listMaterialPrice, setListMaterialPrice] = useState([]);

    const validationSchema = yup.object({
        supplyName: yup
            .string('Enter supplyName')
            .required('Kiểm tra và nhập lại hãng cung cấp'),
        amount: yup
            .string('Enter amount')
            .required('Kiểm tra và nhập lại số lượng'),
        unitPrice: yup
            .string('Enter unitPrice')
            .required('Kiểm tra và nhập lại đơn giá'),

    });



    const loadMaterial = async () => {
        try {
            const res = await axiosInstance.get(listAllMaterialAPI)


            setMaterialId(res.data[0].materialId)
            setMaterialIds(res.data)
            // setMaterialPrice(res.data[0].price)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMaterial();
    }, [])



    const formik = useFormik({
        initialValues: {
            supplyName: '',
            amount: '',
            unitPrice: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            values.totalPrice = materialPrice;
            console.log(values);
            dispatch(addMaterialImport(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    useEffect(() => {
        const price = (formik.values.unitPrice || 0) * (formik.values.amount || 0)

        setMaterialPrice(price)
    }, [formik.values.unitPrice, formik.values.amount])



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

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="supplyName"
                    label="Hãng cung cấp"
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
                    fullWidth
                    id="unitPrice"
                    label="Số lương"
                    name="unitPrice"

                    autoComplete="unitPrice"
                    value={formik.values.unitPrice}
                    autoFocus
                    onChange={formik.handleChange}
                />

                {formik.errors.unitPrice && <Typography style={{ color: 'red' }}>{formik.errors.unitPrice}</Typography>}

                <TextField
                    margin="normal"
                    required
                    disabled
                    fullWidth
                    id="totalPrice"
                    label="Tổng giá"
                    name="Tổng giá"
                    autoComplete="totalPrice"
                    value={materialPrice}
                    autoFocus
                    onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalAddMaterialImport;