import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addMaterialImport } from '../../../redux/MaterialSlice/listMaterialImportSlice';
import { validationDate } from '../../../config/validation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { listMaterialAPI } from '../../../config/baseAPI';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment/moment';

const ModalAddMaterialImport = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [materialIds, setMaterialIds] = useState([]);
    const [materialId, setMaterialId] = useState();

    const validationSchema = yup.object({
        supplyName: yup
            .string('Enter supplyName')
            .required('Your supplyName is required'),
        amount: yup
            .string('Enter amount')
            .required('Your amount is required'),
        totalPrice: yup
            .string('Enter totalPrice')
            .required('Your totalPrice is required')
    });

    

    const loadMaterial = async () => {
        try {
            const res = await axios.get(listMaterialAPI)
           
            console.log(res)
            setMaterialId(res.data[0].materialId)
            setMaterialIds(res.data)

            // console.log(materialIds)
            // console.log(materialId)
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMaterial();
    }, [])

    const formik = useFormik({
        initialValues: {
            supplyName: "",
            amount: "",
            totalPrice: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.date = moment(value.$d).format(validationDate);
            values.materialId = materialId;
            dispatch(addMaterialImport(values))
            setModalAddOpen(false)
        }
    });

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
                    id="totalPrice"
                    label="Tổng giá"
                    name="totalPrice"
                    autoComplete="totalPrice"
                    value={formik.values.totalPrice}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.totalPrice && <Typography style={{ color: 'red' }}>{formik.errors.totalPrice}</Typography>}

            </Modal>
        </>
    )
}

export default ModalAddMaterialImport;