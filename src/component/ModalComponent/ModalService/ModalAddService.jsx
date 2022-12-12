import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addService } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import axiosInstance from '../../../config/customAxios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { listAllCategoryAPI } from '../../../config/baseAPI';
import { regexNumber } from '../../../config/validation';


const ModalAddService = ({ modalAddOpen, setModalAddOpen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);


    const [categoryServiceIds, setCategoryServiceIds] = useState([]);
    const [categoryServiceId, setCategoryServiceId] = useState();

    const validationSchema = yup.object({
        serviceName: yup
            .string('Nhập loại dịch vụ')
            .max(250, 'Service không thể quá 250 ký tự.')
            .required('Service là bắt buộc.'),
        unit: yup
            .string('Nhập đơn vị')
            .max(50, 'Đơn vị không thể quá 50 ký tự.')
            .matches(regexNumber, 'Đơn vị không được nhập chữ, kí tự, số âm.')
            .required('Đơn vị là bắt buộc.'),
        marketPrice: yup
            .string('Nhập đơn giá')
            .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
            .required('Đơn giá là bắt buộc.'),
        price: yup
            .string('Nhập đơn giá')
            .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
            .required('Đơn giá là bắt buộc.')
    });

    const loadCategory = async () => {
        try {

            const res = await axiosInstance.get(listAllCategoryAPI)
            setCategoryServiceId(res.data[0].categoryServiceId)
            setCategoryServiceIds(res.data)
            console.log("lam on ra kqua di: ", res.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadCategory();
    }, [])


    const formik = useFormik({
        initialValues: {
            serviceName: '',
            unit: '',
            marketPrice: '',
            price: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.categoryServiceId = categoryServiceId
            dispatch(addService(values))
            setModalAddOpen(false)
            formik.handleReset()
        }
    });

    const handleCancel = () => {
        setModalAddOpen(false)

        formik.errors.serviceName = ""
        formik.touched.serviceName = ""

        formik.errors.unit = ""
        formik.touched.unit = ""

        formik.errors.marketPrice = ""
        formik.touched.marketPrice = ""

        formik.errors.price = ""
        formik.touched.price = ""

        formik.resetForm()
    }

    return (
        <>
            <Modal
                title="Thêm loại dịch vụ"
                open={modalAddOpen}
                onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >

                <Box sx={{ p: 5 }}>
                    <FormControl fullWidth>
                        <InputLabel id="material">Category</InputLabel>

                        <Select
                            labelId="material"
                            id="materialSelect"
                            label="Vật liệu"
                            value={categoryServiceId}
                            onChange={(e) => setCategoryServiceId(e.target.value)}
                        >

                            {categoryServiceIds?.map(item => (
                                <MenuItem key={item.categoryServiceId} value={item.categoryServiceId}>{item.categoryServiceName}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="serviceName"
                    label="Dịch vụ"
                    name="serviceName"
                    autoComplete="serviceName"
                    value={formik.values.serviceName}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.serviceName && formik.touched.serviceName && <Typography style={{ color: 'red' }}>{formik.errors.serviceName}</Typography>}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="unit"
                    label="Đơn vị"
                    name="unit"
                    autoComplete="unit"
                    value={formik.values.unit}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.unit && formik.touched.unit && <Typography style={{ color: 'red' }}>{formik.errors.unit}</Typography>}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="marketPrice"
                    type={'number'}
                    min={0}
                    label="giá thị trường"
                    name="marketPrice"
                    autoComplete="categoryName"
                    value={formik.values.marketPrice}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.marketPrice && formik.touched.marketPrice && <Typography style={{ color: 'red' }}>{formik.errors.marketPrice}</Typography>}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    min={0}
                    type={'number'}
                    label="Giá nha khoa Nguyễn Trần"
                    name="price"
                    autoComplete="price"
                    value={formik.values.price}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && <Typography style={{ color: 'red' }}>{formik.errors.price}</Typography>}


            </Modal>
        </>
    )
}

export default ModalAddService;