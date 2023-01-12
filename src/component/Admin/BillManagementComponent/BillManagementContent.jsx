import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIncomeId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { fetchAllBill } from "../../../redux/BillSlice/listBillSlice";
import { setTreatmentId } from "../../../redux/modalSlice";
import ModalDetailBill from "../../ModalComponent/ModalBill/ModalDetailBill";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ModalListReceipt from "../../ModalComponent/ModalBill/ModalListReceipt";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
const BillManagementContent = () => {
  const listBill = useSelector((state) => state.listBill.listBill);

  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listBill.pageSize);
  const totalPages = useSelector((state) => state.listBill.totalPage);
  const [currentPage, setCurrentPage] = useState(0);

  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalReceiptOpen, setModalReceiptOpen] = useState(false);

  console.log("bill: ", listBill);
  console.log("page: ", pageSize);
  //dung roi, total pages trong api dang co 1 thoi
  useEffect(() => {
    dispatch(
      fetchAllBill({
        size: 12,
        page: currentPage,
      })
    );
  }, [currentPage]);

  return (
    <>
      <h2 className="font-bold mb-4">Danh Sách Hóa Đơn</h2>
      <StyledTable size="small" className="shadow-md mb-4">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tên bệnh nhân
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Số điện thoại
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Giá gốc
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Giảm giá
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tổng tiền
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {listBill.map((item, index) => (
            <StyledTableRow size="medium" key={item.treatmentId}>
              <StyledTableCell>{item.patientName}</StyledTableCell>
              <StyledTableCell>{item.phone}</StyledTableCell>
              <StyledTableCell>{item.totalPrice}</StyledTableCell>
              <StyledTableCell>{item.totalDiscount}</StyledTableCell>
              <StyledTableCell>{item.realCost}</StyledTableCell>
              <StyledTableCell>
                <IconButton
                  aria-label="receipt-list"
                  onClick={() => {
                    setModalReceiptOpen(true);
                    dispatch(setTreatmentId(item.treatmentId));
                  }}
                >
                  <ReceiptIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  aria-label="detail"
                  onClick={() => {
                    setModalDetailOpen(true);
                    dispatch(setTreatmentId(item.treatmentId));
                  }}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
      {totalPages === 0 && (
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          textAlign="center"
        >
          Không có đơn giá nào
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {totalPages > 1 ? (
          <Pagination
            color="primary"
            count={totalPages}
            onChange={(e, pageNumber) => {
              setCurrentPage(pageNumber - 1);
            }}
          />
        ) : null}
      </div>
      <div>
        <ModalDetailBill
          modalDetailOpen={modalDetailOpen}
          setModalDetailOpen={setModalDetailOpen}
        />
      </div>

      <div>
        <ModalListReceipt
          modalReceiptOpen={modalReceiptOpen}
          setModalReceiptOpen={setModalReceiptOpen}
        />
      </div>
    </>
  );
};

export default BillManagementContent;
