import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { setScheduleId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, Typography, IconButton } from "@mui/material";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ModalAddSchedule from "../../ModalComponent/ModalSchedule/ModalAddSchedule";
import ModalUpdateSchedule from "../../ModalComponent/ModalSchedule/ModalUpdateSchedule";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { fetchAllSchedule } from "../../../redux/ScheduleSlice/listScheduleSlice";
import { useDispatch, useSelector } from "react-redux";

const ScheduleManagementContent = () => {
  const listSchedule = useSelector((state) => state.listSchedule.listSchedule);
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listSchedule.pageSize);
  const totalPages = useSelector((state) => state.listSchedule.totalPage);
  const [currentPage, setCurrentPage] = useState(0);

  const isAddSchedule = useSelector(
    (state) => state.listSchedule.isAddSchedule
  );
  const isUpdateSchedule = useSelector(
    (state) => state.listSchedule.isUpdateSchedule
  );

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllSchedule({
        size: pageSize,
        page: currentPage,
      })
    );
  }, [currentPage, isAddSchedule, isUpdateSchedule]);

  return (
    <>
      <h2 className="font-bold mb-4">Lịch hẹn</h2>
      <Button
        aria-label="add"
        variant="success"
        style={{ float: "right", marginBottom: "1rem" }}
        onClick={() => {
          setModalAddOpen(true);
        }}
      >
        <AddIcon /> Thêm mới
      </Button>

      <StyledTable size="small" className="shadow-md">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Bệnh nhân</StyledTableCell>
            <StyledTableCell>Số điện thoại</StyledTableCell>
            <StyledTableCell>Ngày hẹn</StyledTableCell>
            <StyledTableCell>Lưu ý</StyledTableCell>
            <StyledTableCell colSpan={2}></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listSchedule.map((item, index) => (
            <StyledTableRow key={item.waitingRoomId}>
              <StyledTableCell>{item.patientName}</StyledTableCell>
              <StyledTableCell>{item.phone}</StyledTableCell>
              <StyledTableCell>{item.date}</StyledTableCell>
              <StyledTableCell>{item.note}</StyledTableCell>
              <StyledTableCell>
                <Button
                  aria-label="edit"
                  variant="info"
                  onClick={() => {
                    setModalUpdateOpen(true);
                    dispatch(setScheduleId(item.waitingRoomId));
                  }}
                >
                  <EditIcon />
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button aria-label="delete" variant="danger" disabled>
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {totalPages > 1 ? (
          <Pagination
            count={totalPages}
            onChange={(e, pageNumber) => {
              setCurrentPage(pageNumber - 1);
            }}
          />
        ) : null}
      </div>
      <div>
        <ModalAddSchedule
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
        />
      </div>
      <div>
        <ModalUpdateSchedule
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
        />
      </div>
    </>
  );
};

export default ScheduleManagementContent;
