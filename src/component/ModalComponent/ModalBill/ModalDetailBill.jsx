import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBill } from "../../../redux/BillSlice/choosenBillSlice";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
const ModalDetailBill = ({ modalDetailOpen, setModalDetailOpen }) => {
  const [loading, setLoading] = useState();
  const treatmentId = useSelector((state) => state.modal.treatmentId);
  const treatmentServiceMapDTOList = useSelector(
    (state) => state.choosenBill.treatmentServiceMapDTOList
  );
  const dispatch = useDispatch();

  // const isUpdateBill = useSelector(state => state.listBill.isUpdateBill);
  console.log("ra bill: ", treatmentServiceMapDTOList);

  useEffect(() => {
    setLoading(true);
    try {
      if (treatmentId > 0) {
        dispatch(fetchBill(treatmentId));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [treatmentId]);

  return (
    <>
      <Modal title="Thông tin hóa đơn" open={modalDetailOpen} footer={null} onCancel={() => setModalDetailOpen(false)}>
        {/* {loading === false && <> */}
        <StyledTable className="shadow-md text-center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Dịch vụ</StyledTableCell>
              <StyledTableCell>Giá hiện tại</StyledTableCell>
              <StyledTableCell>Giảm giá</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {treatmentServiceMapDTOList.map((item) => (
              <StyledTableRow key={item.treatmentId}>
                <StyledTableCell>{item.serviceName}</StyledTableCell>
                <StyledTableCell>{item.currentPrice}</StyledTableCell>
                <StyledTableCell>{item.discount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        {/* </>} */}
      </Modal>
    </>
  );
};

export default ModalDetailBill;
