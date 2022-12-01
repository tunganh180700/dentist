import { TextField } from "@mui/material"
import { Modal } from "antd"
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientRecordAPI } from "../../../config/baseAPI"
import axiosInstance from "../../../config/customAxios";
import { validationDate } from "../../../config/validation";
import { updateRecord } from "../../../redux/RecordSlice/listRecordSlice";

const ModalUpdateRecord = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);
    const serviceId = useSelector(state => state.modal.userId);

    const handleCancel = () => {
        setModalUpdateOpen(false)
    }

    const fetchRecord = async (recordId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                patientRecordAPI + recordId,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setValue(res.data.birthdate)
            // setGender(res.data.gender)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {

        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            values.birthdate = moment(value.$d).format(validationDate);
            dispatch(updateRecord(values));
            setModalUpdateOpen(false);
        }
    })

    useEffect(() => {
        if (serviceId > 0)
            fetchRecord(serviceId)
    }, [serviceId])

    return (
        <>
            <Modal
                title="Thêm hồ sơ"
                open={modalUpdateOpen}
                // onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="reason"
                    label="Lý do đến khám"
                    name="reason"
                    autoComplete="reason"
                    value={formik.values.reason}
                    autoFocus
                // onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="diagnostic"
                    label="Chẩn đoán"
                    name="diagnostic"
                    autoComplete="diagnostic"
                    value={formik.values.diagnostic}
                    autoFocus
                // onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="causal"
                    label="Nguyên nhân"
                    name="causal"
                    autoComplete="causal"
                    value={formik.values.causal}
                    autoFocus
                // onChange={formik.handleChange}
                />
                {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="date"
                    label="Ngày khám"
                    name="date"
                    autoComplete="date"
                    // value={formik.values.fullName}
                    autoFocus
                // onChange={formik.handleChange}
                /> */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="marrowRecord"
                    label="Lưu ý về tủy"
                    name="marrowRecord"
                    autoComplete="marrowRecord"
                    value={formik.values.marrowRecord}
                    autoFocus
                // onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="note"
                    label="Ghi chú"
                    name="note"
                    autoComplete="note"
                    value={formik.values.note}
                    autoFocus
                // onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="treatment"
                    label="Điều trị"
                    name="treatment"
                    autoComplete="treatment"
                    value={formik.values.treatment}
                    autoFocus
                // onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalUpdateRecord