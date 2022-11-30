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
                width="70%"
                // onOk={formik.handleSubmit}
                onCancel={handleCancel}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Họ và tên"
                    name="fullName"
                    autoComplete="fullName"
                    // value={formik.values.fullName}
                    autoFocus
                    // onChange={formik.handleChange}
                />
            </Modal>
        </>
    )
}

export default ModalUpdateRecord