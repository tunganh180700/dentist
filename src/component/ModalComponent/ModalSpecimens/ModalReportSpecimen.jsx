import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { TextField, Button } from '@mui/material';
import "./../style.css"
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { reportSpecimen } from '../../../redux/SpecimenSlice/listSpecimenSlice';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const ModalReportSpecimen = ({ reportOpen, setReportOpen, specimenId }) => {
    const dispatch = useDispatch();
    // const specimenId = useSelector(state => state.modal.specimenId);

    const formik = useFormik({
        initialValues: {
            description: "",
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(reportSpecimen(specimenId,values));
            setReportOpen(false);
        }
    })

    return (
        <>
            <Modal
                title="Cập nhật mẫu thử nghiệm"
                open={reportOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setReportOpen(false)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Nguyên nhân mẫu lỗi"
                    name="description"
                    autoComplete="description"
                    value={formik.values.description}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.description && <Typography style={{ color: 'red' }}>{formik.errors.description}</Typography>}
            </Modal>
        </>
    )
}

export default ModalReportSpecimen