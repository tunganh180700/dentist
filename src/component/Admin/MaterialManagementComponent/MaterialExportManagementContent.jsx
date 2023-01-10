import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialExportId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { fetchAllMaterialExport } from "../../../redux/MaterialSlice/listMaterialExportSlice";
import ModalUpdateMaterialExport from "../../ModalComponent/ModalMaterial/ModalUpdateMaterialExport";
import ModalDeleteMaterialExport from "../../ModalComponent/ModalMaterial/ModalDeleteMaterialExport";
import ModalAddMaterialExport from "../../ModalComponent/ModalMaterial/ModalAddMaterialExport";

const MaterialExportManagementContent = () => {
  const listMaterialExport = useSelector(
    (state) => state.listMaterialExport.listMaterialExport
  );
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listMaterialExport.pageSize);
  const totalPages = useSelector((state) => state.listMaterialExport.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  // const userId = useSelector(state=>state.modal.userId);
  const isUpdateMaterialExport = useSelector(
    (state) => state.listMaterialExport.isUpdateMaterialExport
  );
  const isDeleteMaterialExport = useSelector(
    (state) => state.listMaterialExport.isDeleteMaterialExport
  );
  const isAddMaterialExport = useSelector(
    (state) => state.listMaterialExport.isAddMaterialExport
  );

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchAllMaterialExport({
        size: 12,
        page: currentPage,
      })
    );
  }, [
    currentPage,
    isUpdateMaterialExport,
    isDeleteMaterialExport,
    isAddMaterialExport,
  ]);

  return (
    <>
      <h2 className="font-bold mb-5">Quản Lý Xuất Vật Liệu</h2>
      <StyledTable className="shadow-md mb-3" size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tên vật liệu
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Số lượng
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Đơn giá
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Tên bệnh nhân
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Date
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {listMaterialExport.map((item, index) => (
            <StyledTableRow key={item.materialExportId}>
              <StyledTableCell>{item.materialName}</StyledTableCell>
              <StyledTableCell>{item.amount}</StyledTableCell>
              <StyledTableCell>{item.unitPrice}</StyledTableCell>
              <StyledTableCell>{item.patientName}</StyledTableCell>
              <StyledTableCell>{item.date}</StyledTableCell>
              <StyledTableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setModalDeleteOpen(true);
                    dispatch(setMaterialExportId(item.materialExportId));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setModalUpdateOpen(true);
                    dispatch(setMaterialExportId(item.materialExportId));
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
        <ModalUpdateMaterialExport
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
        />
      </div>
      <div>
        <ModalDeleteMaterialExport
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
        />
      </div>
      {/* <div>
        <ModalAddMaterialExport
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
        />
      </div> */}
    </>
  );
};

export default MaterialExportManagementContent;
