import {
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Pagination,
  Table,
  TableBody,
  TableHead,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/customAxios";
import { allPatientRecordAPI } from "../../../config/baseAPI";
import ModalAddRecord from "../../ModalComponent/ModalRecord/ModalAddRecord";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../redux/modalSlice";
import ModalDeleteRecord from "../../ModalComponent/ModalRecord/ModalDeleteRecord";
import ModalDetailService from "../../ModalComponent/ModalRecord/ModalDetailService";
import ModalDetailRecord from "../../ModalComponent/ModalRecord/ModalDetailRecord";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
const RecordManagementContent = () => {
  const dispatch = useDispatch();

  const pageSize = useSelector((state) => state.listRecord.pageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalDetailRecordOpen, setModalDetailRecordOpen] = useState(false);

  const patientName = useSelector((state) => state.choosenPatient.patientName);

  const isAddRecord = useSelector((state) => state.listRecord.isAddRecord);
  const isDeleteRecord = useSelector(
    (state) => state.listRecord.isDeleteRecord
  );

  console.log("pagezise.", totalPages);
  const { id } = useParams();
  const [recordList, setRecordList] = useState([]);

  const styleTxt = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "100px",
    display: "block",
    overflow: "hidden",
  };

  const getDetail = async (id) => {
    try {
      const res = await axiosInstance.get(allPatientRecordAPI + id, {
        params: {
          size: pageSize,
          page: currentPage,
        },
      });
      setTotalElements(res.data.totalElements);
      setTotalPages(res.data.totalPages);
      setRecordList(res.data.content);
      setIsSubmitForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetail(id);
  }, [id, currentPage, pageSize]);

  useEffect(() => {
    if (isSubmitForm) {
      getDetail(id);
    }
  }, [isSubmitForm]);

  return (
    <>
      <Box className="flex items-center gap-3 mb-5">
        <IconButton aria-label="back" className="p-0">
          <Link to={"/patient-management"}>
            <ArrowBackIosNewIcon />
          </Link>
        </IconButton>
        <h2 className="font-bold mb-0">Hồ Sơ Bệnh Án Của {patientName}</h2>
      </Box>
      <Box className="flex gap-3  mb-3">
        <p className="font-bold text-lg mb-0">Có ({totalElements}) bản ghi</p>
        <Button
          variant="contained"
          color="success"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            setModalAddOpen(true);
          }}
        >
          <span className="leading-none">Thêm mới</span>
        </Button>
      </Box>
      <StyledTable className="shadow-md" size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Lý do đến khám</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Chẩn đoán</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Nguyên nhân</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Ngày khám</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Lưu ý về tủy</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Ghi chú</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Điều trị</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Đơn thuốc</div>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {totalPages ==!0 && (
          <TableBody>
            {recordList?.map((el) => (
              <StyledTableRow key={el.patientRecordId}>
                <StyledTableCell>
                  <IconButton
                    aria-label="detail"
                    onClick={() => {
                      setModalDetailRecordOpen(true);
                      dispatch(setUserId(el.patientRecordId));
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={{ ...styleTxt, width: "200px" }}>{el.reason}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.diagnostic}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.causal}</div>
                </StyledTableCell>
                <StyledTableCell>{el.date}</StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.marrowRecord}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.note}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.treatment}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <div style={styleTxt}>{el.prescription}</div>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      setModalDetailOpen(true);
                      dispatch(setUserId(el.patientRecordId));
                    }}
                  >
                    Dịch vụ
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setModalDeleteOpen(true);
                      dispatch(setUserId(el.patientRecordId));
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
      {totalPages === 0 && (
        <>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            textAlign="center"
            marginTop={15}
          >
            Không có hồ sơ nào
          </Typography>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "14px 16px",
        }}
      >
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
        <ModalDetailRecord
          modalDetailRecordOpen={modalDetailRecordOpen}
          setModalDetailRecordOpen={setModalDetailRecordOpen}
        />
      </div>
      <div>
        <ModalAddRecord
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
          isSubmitForm={setIsSubmitForm}
        />
      </div>
      <div>
        <ModalDeleteRecord
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
          isSubmitForm={setIsSubmitForm}
        />
      </div>
      <div>
        <ModalDetailService
          modalDetailOpen={modalDetailOpen}
          setModalDetailOpen={setModalDetailOpen}
        />
      </div>
    </>
  );
};

export default RecordManagementContent;
