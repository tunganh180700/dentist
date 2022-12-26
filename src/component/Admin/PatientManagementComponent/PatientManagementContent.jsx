import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  Typography,
  IconButton,
  SwipeableDrawer,
  Button,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DatePickerDentist from "../../ui/date-picker/DatePickerDentist";
import {
  fetchAllPatient,
  searchPatient,
} from "../../../redux/PatienSlice/listPatientSlice";
import Loading from "../../ui/Loading";
import ModalAddPatient from "../../ModalComponent/ModalPatient/ModalAddPatient";
import ModalDeletePatient from "../../ModalComponent/ModalPatient/ModalDeletePatient";
import ModalUpdatePatient from "../../ModalComponent/ModalPatient/ModalUpdatePatient";
import ModalDetailPatient from "../../ModalComponent/ModalPatient/ModalDetailPatient";
import axiosInstance from "../../../config/customAxios";
import { setUserId } from "../../../redux/modalSlice";
import { Link } from "react-router-dom";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./style.css";
import dayjs from "dayjs";
import moment from "moment";

const color = {
  border: "rgba(0, 0, 0, 0.2)",
};

const PatientManagementContent = () => {
  const dispatch = useDispatch();
  const listPatient = useSelector((state) => state.listPatient.listPatient);
  const pageSize = useSelector((state) => state.listPatient.pageSize);
  const totalPages = useSelector((state) => state.listPatient.totalPage);
  const totalElements = useSelector((state) => state.listPatient.totalElements);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [isSubmitFormPatient, setIsSubmitFormPatient] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState();

  const isDeletePatient = useSelector(
    (state) => state.listPatient.isDeletePatient
  );
  const isAddPatient = useSelector((state) => state.listPatient.isAddPatient);
  const isUpdatePatient = useSelector(
    (state) => state.listPatient.isUpdatePatient
  );
  const isSearchPatient = useSelector(
    (state) => state.listPatient.isSearchPatient
  );
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  const [searchValue, setSearchValue] = useState({
    name: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
  });
  let styleText = {};

  const renderColor = (status) => {
    let color = "#59995c";
    if (status === 0) {
      color = "#e18220";
    } else if (status === 1) {
      color = "#418eed";
    }
    return color;
  };
  const statusFormatter = (status) => {
    return status === 0 ? "Chưa Chữa Trị" : status === 1 ? "Đang Chữa" : "Xong";
  };

  useEffect(() => {
    if (isSubmitFormPatient) {
      setLoading(true);
      //   const page = currentPage;
      //   if (isDeletePatient == true && totalElements % pageSize == 1) {
      //     setCurrentPage(page - 1);
      //   }
      setTimeout(() => {
        dispatch(
          fetchAllPatient({
            ...searchValue,
            birthdate: searchValue.birthdate
              ? dayjs(searchValue.birthdate).format("DD-MM-YYYY")
              : searchValue.birthdate,
            size: pageSize,
            page: currentPage,
          })
        );
        setLoading(false);
      }, 500);
      setIsSubmitFormPatient(false);
    }
  }, [isSubmitFormPatient]);

  useEffect(() => {
    setLoading(true);

    dispatch(
      fetchAllPatient({
        ...searchValue,
        birthdate: searchValue.birthdate
          ? dayjs(searchValue.birthdate).format("DD-MM-YYYY")
          : searchValue.birthdate,
        size: pageSize,
        page: currentPage,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentPage]);

  const handleSearch = async (search = searchValue) => {
    setLoading(true);
    setCurrentPage(0);
    try {
      if (currentPage === 0) {
        await dispatch(
          searchPatient({
            ...search,
            birthdate: search.birthdate
              ? dayjs(search.birthdate).format("DD-MM-YYYY")
              : search.birthdate,
            size: pageSize,
            page: 0,
          })
        );
        setLoading(false);
        setOpenFilter(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enableButtonSearch = useMemo(
    () =>
      searchValue.name ||
      searchValue.address ||
      searchValue.phone ||
      searchValue.birthdate ||
      searchValue.email,
    [searchValue]
  );

  const onResetFilter = () => {
    const newSearchValue = {
      name: "",
      birthdate: "",
      address: "",
      phone: "",
      email: "",
    };
    setSearchValue(newSearchValue);
    handleSearch(newSearchValue);
  };

  const addWaitingPatient = async (patientId) => {
    try {
      await axiosInstance.post(
        "http://localhost:8080/api/patients/" + patientId + "/waiting_room"
      );
      toast("Thêm bệnh nhân đang chờ thành công");
    } catch (error) {
      console.log("error = ", error);
      toast("Thêm bệnh nhân đang chờ không thành công");
    }
  };

  return (
    <>
      {/* <DatePickerDentist
        value={searchValue.birthdate}
        onChange={(value) => {
          setSearchValue({
            ...searchValue,
            birthdate: moment(value).format("DD/MM/YYYY"),
          });
        }}
        }}
      /> */}
      {loading && <Loading />}
      <h2 className="font-bold mb-4">Danh Sách Bệnh Nhân</h2>
      <Box className="flex items-center gap-3 mb-3">
        <p className="font-bold text-lg mb-0">Có ({totalElements}) bản ghi</p>
        {role === "Doctor" || role === "Nurse" ? (
          <></>
        ) : (
          <Button
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={() => {
              setModalAddOpen(true);
            }}
          >
            <span className="leading-none">Thêm bệnh nhân mới</span>
          </Button>
        )}
        <Button
          variant="contained"
          color="info"
          endIcon={<FilterAltIcon />}
          onClick={() => setOpenFilter(true)}
        >
          <span className="leading-none">Lọc</span>
        </Button>
      </Box>

      <StyledTable size="small" className="shadow-md">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Họ tên {searchValue.birthdate}</StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Ngày sinh</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Số điện thoại</div>
            </StyledTableCell>
            <StyledTableCell
              style={{
                verticalAlign: "top",
              }}
            >
              <div className="attibute">Giới tính</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Địa chỉ</div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="attibute">Email</div>
            </StyledTableCell>
            <StyledTableCell
              style={{
                verticalAlign: "text-top",
              }}
            >
              <div className="attibute">Trạng thái</div>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        {totalPages === 0 ? null : (
          <TableBody>
            {listPatient.map((item) => (
              <StyledTableRow key={item.patientId}>
                <StyledTableCell>
                  <IconButton
                    aria-label="detail"
                    onClick={() => {
                      setModalDetailOpen(true);
                      dispatch(setUserId(item.patientId));
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <Link to={`/record/${item.patientId}`}>
                    {item.patientName}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  {dayjs(item.birthdate).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell>{item.phone}</StyledTableCell>
                <StyledTableCell>{item.gender ? "Nam" : "Nữ"}</StyledTableCell>
                <StyledTableCell>{item.address}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell>
                  <Chip
                    size="small"
                    label={statusFormatter(item.status)}
                    style={{
                      background: `${renderColor(item.status)}`,
                      color: "#fff",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setModalUpdateOpen(true);
                      dispatch(setUserId(item.patientId));
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
                      dispatch(setUserId(item.patientId));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      addWaitingPatient(item.patientId);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
      </StyledTable>
      {totalPages === 0 && (
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          textAlign="center"
          width="100%"
          padding="100px"
        >
          Không có bệnh nhân nào
        </Typography>
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
            page={currentPage + 1}
            count={totalPages}
            color="primary"
            onChange={(e, pageNumber) => {
              setCurrentPage(pageNumber - 1);
            }}
          />
        ) : null}
      </div>
      <div>
        <ModalAddPatient
          modalAddOpen={modalAddOpen}
          setModalAddOpen={setModalAddOpen}
          isSubmitForm={setIsSubmitFormPatient}
        />
      </div>
      <div>
        <ModalDeletePatient
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
          isSubmitForm={setIsSubmitFormPatient}
        />
      </div>
      <div>
        <ModalUpdatePatient
          modalUpdateOpen={modalUpdateOpen}
          setModalUpdateOpen={setModalUpdateOpen}
          isSubmitForm={setIsSubmitFormPatient}
        />
      </div>
      <div>
        <ModalDetailPatient
          modalDetailOpen={modalDetailOpen}
          setModalDetailOpen={setModalDetailOpen}
        />
      </div>
      <SwipeableDrawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
      >
        <Box className="p-3 w-[300px] bg-white h-full rounded-tl-lg rounded-bl-lg">
          <h3 className="mb-3">Lọc</h3>
          <Box className="mb-3">
            <p className="mb-1">Họ tên</p>
            <TextField
              required
              value={searchValue.name}
              onChange={(newValue) =>
                setSearchValue({
                  ...searchValue,
                  name: newValue.target.value,
                })
              }
            />
          </Box>
          <Box className="mb-3">
            <p className="mb-1">Ngày sinh</p>
            <DatePickerDentist
              value={searchValue.birthdate}
              onChange={(value) => {
                setSearchValue({
                  ...searchValue,
                  birthdate: moment(value).format("DD/MM/YYYY"),
                });
              }}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture={true}
                value={searchValue.birthdate}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                  setSearchValue({
                    ...searchValue,
                    birthdate: dayjs(newValue).format("MM-DD-YYYY"),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </Box>
          <Box className="mb-3">
            <p className="mb-1">Số điện thoại</p>
            <TextField
              required
              value={searchValue.phone}
              onChange={(newValue) =>
                setSearchValue({
                  ...searchValue,
                  phone: newValue.target.value,
                })
              }
            />
          </Box>
          <Box className="mb-3">
            <p className="mb-1">Địa chỉ</p>
            <TextField
              required
              value={searchValue.address}
              onChange={(newValue) =>
                setSearchValue({
                  ...searchValue,
                  address: newValue.target.value,
                })
              }
            />
          </Box>
          <Box className="mb-3">
            <p className="mb-1">Email</p>
            <TextField
              required
              value={searchValue.email}
              onChange={(newValue) =>
                setSearchValue({
                  ...searchValue,
                  email: newValue.target.value,
                })
              }
            />
          </Box>
          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              className="mr-3"
              onClick={handleSearch}
              disabled={!enableButtonSearch}
            >
              Đồng ý
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={onResetFilter}
              disabled={!enableButtonSearch}
            >
              Đặt lại
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default PatientManagementContent;
