import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialImportId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { fetchAllMaterialImport } from "../../../redux/MaterialSlice/listMaterialImportSlice";
import ModalUpdateMaterialImport from "../../ModalComponent/ModalMaterial/ModalUpdateMaterialImport";
import ModalDeleteMaterialImport from "../../ModalComponent/ModalMaterial/ModalDeleteMaterialImport";
import ModalAddMaterialImport from "../../ModalComponent/ModalMaterial/ModalAddMaterialImport";
import ModalAddListMaterialImport from "../../ModalComponent/ModalMaterial/ModalAddListMaterialImport";

const MaterialImportManagementContent = () => {
  const listMaterialImport = useSelector(
    (state) => state.listMaterialImport.listMaterialImport
  );
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listMaterialImport.pageSize);
  const totalPages = useSelector((state) => state.listMaterialImport.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  // const userId = useSelector(state=>state.modal.userId);
  const isUpdateMaterialImport = useSelector(
    (state) => state.listMaterialImport.isUpdateMaterialImport
  );
  const isDeleteMaterialImport = useSelector(
    (state) => state.listMaterialImport.isDeleteMaterialImport
  );
  const isAddMaterialImport = useSelector(
    (state) => state.listMaterialImport.isAddMaterialImport
  );

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalAddListOpen, setModalAddListOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllMaterialImport({
        size: pageSize,
        page: currentPage,
      })
    );
  }, [
    currentPage,
    isUpdateMaterialImport,
    isDeleteMaterialImport,
    isAddMaterialImport,
  ]);

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        fontWeight="bold"
      >
        Quản Lý Nhập Vật Liệu
      </Typography>
      <IconButton
        aria-label="add"
        style={{ borderRadius: "5%" }}
        onClick={() => {
          // setModalAddOpen(true)
          setModalAddListOpen(true);
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
              Tên cung cấp
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Date
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              số lượng
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Đơn giá
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tổng giá
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
            {listMaterialImport.map((item, index) => (
              <StyledTableRow key={item.materialImportId}>
                <StyledTableCell>{item.materialName}</StyledTableCell>
                <StyledTableCell>{item.supplyName}</StyledTableCell>
                <StyledTableCell>{item.date}</StyledTableCell>
                <StyledTableCell>{item.amount}</StyledTableCell>
                <StyledTableCell>{item.unitPrice}</StyledTableCell>
                <StyledTableCell>
                  {item.amount * item.unitPrice}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setModalUpdateOpen(true);
                      dispatch(setMaterialImportId(item.materialImportId));
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
                      dispatch(setMaterialImportId(item.materialImportId));
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
          color="primary"
            count={totalPages}
            onChange={(e, pageNumber) => {
              setCurrentPage(pageNumber - 1);
            }}
          />
        ) : null}
      </div>
      <div>
        <ModalUpdateMaterialImport
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
        />
      </div>
      <div>
        <ModalDeleteMaterialImport
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
        />
      </div>
      {/* <div>
                <ModalAddMaterialImport modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div> */}
      <div>
        <ModalAddListMaterialImport
          modalAddOpen={modalAddListOpen}
          setModalAddOpen={setModalAddListOpen}
        />
      </div>
    </>
  );
};

export default MaterialImportManagementContent;
