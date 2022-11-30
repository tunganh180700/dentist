import { TextField } from "@mui/material"
import { Modal } from "antd"

const ModalUpdateRecord = ({ modalUpdateOpen, setModalUpdateOpen }) => {

    const handleCancel = () => {
        setModalUpdateOpen(false)
    }

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
                    // value={formik.values.fullName}
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
                    // value={formik.values.fullName}
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
                    // value={formik.values.fullName}
                    autoFocus
                    // onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalUpdateRecord