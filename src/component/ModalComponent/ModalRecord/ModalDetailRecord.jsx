import { Box, Button, TextField, Typography } from '@mui/material';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecord } from '../../../redux/RecordSlice/listRecordSlice';

const ModalDetailRecord = ({ modalDetailRecordOpen, setModalDetailRecordOpen }) => {
    const [loading, setLoading] = useState();
    const recordId = useSelector(state => state.modal.userId);
    const dispatch = useDispatch();
    const reason = useSelector(state => state.listRecord.reason)
    const diagnostic = useSelector(state => state.listRecord.diagnostic)
    const causal = useSelector(state => state.listRecord.causal)
    const date = useSelector(state => state.listRecord.date)
    const marrowRecord = useSelector(state => state.listRecord.marrowRecord)
    const note = useSelector(state => state.listRecord.note)
    const treatment = useSelector(state => state.listRecord.treatment)
    const prescription = useSelector(state => state.listRecord.prescription)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setLoading(true)
        try {
            if (recordId > 0) {
                dispatch(fetchRecord(recordId))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [recordId])

    return (
        <>
            <Modal
                title="Thêm Bệnh Nhân"
                open={modalDetailRecordOpen}
                // onOk={formik.handleSubmit}
                onCancel={() => setModalDetailRecordOpen(false)}
                footer={null}
            >
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Lý do đến khám:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {reason}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Chẩn đoán:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {diagnostic}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Nguyên nhân:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {causal}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Ngày khám:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {date}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Lưu ý về tủy:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {marrowRecord}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Ghi chú:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {note}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Điều trị:
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                >
                    {treatment}
                </Typography>
                <Typography
                    variant="h6" gutterBottom
                    color="inherit"
                    noWrap
                    fontWeight="bold"
                >
                    Đơn thuốc:
                </Typography>
                <Typography
                    variant="body1"
                    color="inherit"
                    // noWrap
                    multiline
                >
                    {prescription}
                </Typography>

            </Modal>
        </>
    )
}

export default ModalDetailRecord