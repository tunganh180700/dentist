import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { fetchAllMaterial } from "../../../redux/MaterialSlice/listMaterialSlice";
import ModalUpdateMaterial from "../../ModalComponent/ModalMaterial/ModalUpdateMaterial";
import ModalDeleteMaterial from "../../ModalComponent/ModalMaterial/ModalDeleteMaterial";
import ModalAddMaterial from "../../ModalComponent/ModalMaterial/ModalAddMaterial";

const MaterialManagementContent = () => {
  const listMaterial = useSelector((state) => state.listMaterial.listMaterial);
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listMaterial.pageSize);
  const totalPages = useSelector((state) => state.listMaterial.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  // const userId = useSelector(state=>state.modal.userId);
  const isUpdateMaterial = useSelector(
    (state) => state.listMaterial.isUpdateMaterial
  );
  const isDeleteMaterial = useSelector(
    (state) => state.listMaterial.isDeleteMaterial
  );
  const isAddMaterial = useSelector(
    (state) => state.listMaterial.isAddMaterial
  );

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllMaterial({
        size: pageSize,
        page: currentPage,
      })
    );
  }, [currentPage, isUpdateMaterial, isDeleteMaterial, isAddMaterial]);

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        fontWeight="bold"
      >
        Danh Sách Vật Liệu
      </Typography>
      <IconButton
        aria-label="add"
        style={{ borderRadius: "5%" }}
        onClick={() => {
          setModalAddOpen(true);
        }}
      >
        <AddIcon /> Thêm mới
      </IconButton>
      <StyledTable size="small" style={{ marginTop: "15px" }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tên vật liệu
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Đơn vị
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Số lượng
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Giá tiền
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tổng tiền
            </StyledTableCell>
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
              Không có vật liệu nào
            </Typography>
          </>
        ) : (
          <TableBody>
            {listMaterial.map((item, index) => (
              <StyledTableRow key={item.materialId}>
                <StyledTableCell>{item.materialName}</StyledTableCell>
                <StyledTableCell>{item.unit}</StyledTableCell>
                <StyledTableCell>{item.amount}</StyledTableCell>
                <StyledTableCell>{item.price}</StyledTableCell>
                <StyledTableCell>{item.amount * item.price}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setModalUpdateOpen(true);
                      dispatch(setMaterialId(item.materialId));
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
                      dispatch(setMaterialId(item.materialId));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
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
        <ModalUpdateMaterial
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
        />
      </div>
      <div>
        <ModalDeleteMaterial
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
        />
      </div>
      <div>
        <ModalAddMaterial
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
        />
      </div>
    </>
  );
};

export default MaterialManagementContent;
