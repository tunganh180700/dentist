import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from "@mui/material"
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllReceipts } from "../../../redux/ReceiptSlice/listReceiptSlice"
import AddIcon from '@mui/icons-material/Add';
import ModalAddReceipt from '../../ModalComponent/ModalBill/ModalAddReceipt';
const ModalListReceipt = ({ modalReceiptOpen, setModalReceiptOpen }) => {
    const [loading, setLoading] = useState();
    const treatmentId = useSelector(state => state.modal.treatmentId);
    const listReceipts = useSelector(state => state.listReceipts.listReceipts);
    const dispatch = useDispatch();

    const [modalAddReceiptOpen, setModalAddReceiptOpen] = useState(false);
    const isAddNewReceipt = useSelector(state => state.listReceipts.isAddNewReceipt);

    // const isUpdateBill = useSelector(state => state.listBill.isUpdateBill);
    console.log("ra bill: ", listReceipts)

    useEffect(() => {
        setLoading(true)
        try {
            if (treatmentId > 0) {
                dispatch(fetchAllReceipts(treatmentId))
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [treatmentId,isAddNewReceipt])

    return (
        <>
            <Modal
                open={modalReceiptOpen}
                onCancel={() => setModalReceiptOpen(false)}>
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
                <IconButton aria-label="add"  style={{borderRadius: '5%'}} onClick={() => {
                setModalAddReceiptOpen(true)
            }}>
                <AddIcon /> Thêm mới
            </IconButton>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Thanh toán</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Ghi nợ</TableCell>
                            <TableCell>Ghi nợ cũ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listReceipts?.map((item) =>
                            <TableRow key={item.receiptId}>
                                <TableCell>{item.payment}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.debit}</TableCell>
                                <TableCell>{item.oldDebit}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {/* </>} */}
            </Modal>

            <div>
                <ModalAddReceipt modalAddReceiptOpen={modalAddReceiptOpen} setModalAddReceiptOpen={setModalAddReceiptOpen}/>
            </div>
        </>
    )

}

export default ModalListReceipt