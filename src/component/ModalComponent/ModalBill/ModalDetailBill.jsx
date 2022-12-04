import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from "@mui/material"
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBill } from "../../../redux/BillSlice/choosenBillSlice"

const ModalDetailBill = ({ modalDetailOpen, setModalDetailOpen }) => {
    const [loading, setLoading] = useState();
    const treatmentId = useSelector(state => state.modal.treatmentId);
    const treatmentServiceMapDTOList = useSelector(state => state.choosenBill.treatmentServiceMapDTOList);
    const dispatch = useDispatch();

    // const isUpdateBill = useSelector(state => state.listBill.isUpdateBill);
    console.log("ra bill: ", treatmentServiceMapDTOList)

    useEffect(() => {
        setLoading(true)
        try {
            if (treatmentId > 0) {
                dispatch(fetchBill)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [treatmentId])

    return (
        <>
            <Modal
                open={modalDetailOpen}
                onCancel={() => setModalDetailOpen(false)}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    textAlign="center"
                    fontWeight="bold"
                >
                    Thông tin hóa đơn
                </Typography>

                {/* {loading === false && <> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Dịch vụ</TableCell>
                             <TableCell>Giá hiện tại</TableCell>
                             <TableCell>Giảm giá</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {treatmentServiceMapDTOList.map((item) =>
                                <TableRow key={item.serviceName}>
                                    <TableCell>{item.currentPrice}</TableCell>
                                    <TableCell>{item.discount}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                {/* </>} */}
            </Modal>
        </>
    )

}

export default ModalDetailBill