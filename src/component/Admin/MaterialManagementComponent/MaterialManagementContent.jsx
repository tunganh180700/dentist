import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Pagination, Typography, IconButton, Button } from "@mui/material";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
        size: 12,
        page: currentPage,
      })
    );
  }, [currentPage, isUpdateMaterial, isDeleteMaterial, isAddMaterial]);

  return (
    <>
      <h2 className="font-bold mb-2">Danh Sách Vật Liệu</h2>
      <Button
        className="float-right mb-3"
        variant="contained"
        color="success"
        endIcon={<AddCircleIcon />}
        onClick={() => {
          setModalAddOpen(true);
        }}
      >
        <span className="leading-none"> Thêm mới</span>
      </Button>
      <StyledTable size="small" className="shadow-md mb-3">
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
          </StyledTableRow>
        </TableHead>

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
                  aria-label="delete"
                  onClick={() => {
                    setModalDeleteOpen(true);
                    dispatch(setMaterialId(item.materialId));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
      {totalPages === 0 && (
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
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
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
