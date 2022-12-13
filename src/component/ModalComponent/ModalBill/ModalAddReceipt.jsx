import { Box, TextField, Typography } from "@mui/material"
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AddIcon from '@mui/icons-material/Add';
import { fetchBill } from "../../../redux/BillSlice/choosenBillSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchNewReceipt } from "../../../redux/ReceiptSlice/choosenNewReceiptSlice";
import { addNewReceipt } from '../../../redux/ReceiptSlice/listReceiptSlice';
import { useFormik } from "formik";
import * as yup from "yup";
import { regexNumber } from "../../../config/validation";

const ModalAddReceipt = ({ modalAddReceiptOpen, setModalAddReceiptOpen }) => {
    const [loading, setLoading] = useState();
    const treatmentId = useSelector(state => state.modal.treatmentId);
    const patientName = useSelector(state => state.choosenBill.patientName)
    const debit = useSelector(state => state.choosenNewReceipt.debit)
    const patientId = useSelector(state => state.choosenBill.patientId)

    const newServices = useSelector(state => state.choosenNewReceipt.newServices)

    const dispatch = useDispatch();

    const validationSchema = yup.object({

        payment: yup
            .string('Nhập đơn giá')
            .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
            .required('Đơn giá là bắt buộc.')

    });

    useEffect(() => {
        setLoading(true)
        try {
            if (treatmentId > 0) {
                dispatch(fetchBill(treatmentId))
                dispatch(fetchNewReceipt(treatmentId))

            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [treatmentId, fetchBill])

    const formik = useFormik({
        initialValues: {
            payment: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const addValue = {
                treatmentId: treatmentId,
                values: values

            }

            console.log("hien thi values", values.patientId);
            dispatch(addNewReceipt(addValue))
            setModalAddReceiptOpen(false)
            formik.handleReset()
        }
    });

    return (
        <>
            <Modal
                title="Thêm Receipt"
                style={{ fontWeight: 'bold' }}
                open={modalAddReceiptOpen}
                onOk={formik.handleSubmit}
                onCancel={() => setModalAddReceiptOpen(false)}
            >

                <Typography
                    component="h1"
                    color="inherit"
                    noWrap
                    textAlign="center"
                    fontWeight="bold"
                >
                    Bệnh nhân: {patientName}
                </Typography>

                <Typography
                    component="h1"
                    color="inherit"
                    noWrap

                >
                    Nợ cũ: {debit}
                </Typography>

                <TableHead >
                    <TableRow >
                        <TableCell style={{ fontWeight: 'bold' }}>Dịch vụ mới </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Giá tiền</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Giảm giá</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newServices.map((item, index) =>
                        <TableRow size='medium' key={item.serviceId}>
                            <TableCell>{item.serviceName}</TableCell>
                            <TableCell>{item.currentPrice}</TableCell>
                            <TableCell>{item.discount}</TableCell>
                        </TableRow>
                    )}
                </TableBody>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="payment"
                    label="Tiền thanh toán"
                    name="payment"
                    autoComplete="payment"
                    value={formik.values.payment}
                    autoFocus
                    onChange={formik.handleChange}
                />
                {formik.errors.payment && formik.touched.payment && <Typography style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.payment}</Typography>}

            </Modal>
        </>
    )

}

export default ModalAddReceipt