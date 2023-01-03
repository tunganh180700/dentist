import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLaboId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { fetchAllLabo } from "../../../redux/LaboSlice/listLaboSlice";
import ModalUpdateLabo from "../../ModalComponent/ModalLabo/ModalUpdateLabo";
import ModalDeleteLabo from "../../ModalComponent/ModalLabo/ModalDeleteLabo";
import ModalAddLabo from "../../ModalComponent/ModalLabo/ModalAddLabo";
import ModalDetailLabo from "../../ModalComponent/ModalLabo/ModalDetailLabo";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
const LaboManagementContent = () => {
  const listLabo = useSelector((state) => state.listLabo.listLabo);
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listLabo.pageSize);
  const totalPages = useSelector((state) => state.listLabo.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  // const userId = useSelector(state=>state.modal.userId);
  const isUpdateLabo = useSelector((state) => state.listLabo.isUpdateLabo);
  const isDeleteLabo = useSelector((state) => state.listLabo.isDeleteLabo);
  const isAddLabo = useSelector((state) => state.listLabo.isAddLabo);

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllLabo({
        size: pageSize,
        page: currentPage,
      })
    );
  }, [currentPage, isUpdateLabo, isDeleteLabo, isAddLabo]);

  return (
    <>
      <h2 className="font-bold mb-4"> Quản Lý Labo</h2>
      <IconButton
        aria-label="add"
        style={{ borderRadius: "5%" }}
        onClick={() => {
          setModalAddOpen(true);
        }}
      >
        <AddIcon /> Thêm mới
      </IconButton>
      <StyledTable className="shadow-md" size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tên Labo
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Phone
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tổng tiền
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {totalPages === 0 ? (
          <>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              textAlign="center"
            >
              Không có labo
            </Typography>
          </>
        ) : (
          <>
            <TableBody>
              {listLabo.map((item, index) => (
                <StyledTableRow key={item.laboId}>
                  <StyledTableCell>{item.laboName}</StyledTableCell>
                  <StyledTableCell>{item.phone}</StyledTableCell>
                  <StyledTableCell>{item.totalMoney}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="detail"
                      onClick={() => {
                        setModalDetailOpen(true);
                        dispatch(setLaboId(item.laboId));
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setModalUpdateOpen(true);
                        dispatch(setLaboId(item.laboId));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setModalDeleteOpen(true);
                        dispatch(setLaboId(item.laboId));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </>
        )}
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
        <ModalUpdateLabo
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
        />
      </div>
      <div>
        <ModalDeleteLabo
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
        />
      </div>
      <div>
        <ModalAddLabo
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
        />
      </div>

      <div>
        <ModalDetailLabo
          modalDetailOpen={modalDetailOpen}
          setModalDetailOpen={setModalDetailOpen}
        />
      </div>
    </>
  );
};

export default LaboManagementContent;
