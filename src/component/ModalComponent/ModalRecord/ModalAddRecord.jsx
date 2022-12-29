import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal } from "antd";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axiosInstance from "../../../config/customAxios";
import { useParams } from "react-router-dom";
import {
  addRecordAPI,
  listAllServiceAPI,
  listTreatingServiceAPI,
} from "../../../config/baseAPI";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import * as yup from "yup";
import { regexNumber, validationDate } from "../../../config/validation";
import moment from "moment";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ModalExportMaterial from "./ModalExportMaterial";
import ModalSpecimen from "./ModalSpecimen";
import { addRecord } from "../../../redux/RecordSlice/listRecordSlice";
import DatePickerDentist from "../../ui/date-picker/DatePickerDentist";
import InputDentist from "../../ui/input";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import "./style.css";
import _ from "lodash";

const ModalAddRecord = ({ modalAddOpen, setModalAddOpen, isSubmitForm }) => {
  const dispatch = useDispatch();
  const [valueDate, setValueDate] = useState(null);
  const { id } = useParams();
  const [listTreatingService, setListTreatingService] = useState([]);

  const [serviceId, setServiceId] = useState();
  // const [serviceName, setServiceName] = useState();
  const [serviceIds, setServiceIds] = useState([]);
  const [showModalExportMaterial, setShowModalExportMaterial] = useState(0);
  const [modalExportOpen, setModalExportOpen] = useState(false);
  const [showModalSpecimen, setShowModalSpecimen] = useState(0);
  const [modalSpecimenOpen, setModalSpecimenOpen] = useState(false);

  // const [newPrice, setNewPrice] = useState();
  // const [servicePrice, setServicePrice] = useState();
  // const [serviceDiscount, setServiceDiscount] = useState();
  // const [status, setStatus] = useState();

  // const [open, setOpen] = useState(false);
  // const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(-1);
  const [isEdit, setEdit] = useState(false);

  const isAddRecord = useSelector((state) => state.listRecord.isAddRecord);
  const [rows, setRows] = useState([]);
  const [countRow, setCountRow] = useState({
    statusCount: "up",
    value: 0,
  });
  const [serviceDTOS, setServiceDTOS] = useState([]);

  const [materialExportDTOS, setMaterialExportDTOS] = useState([]);
  const [specimenDTOS, setSpecimenDTOS] = useState([]);

  const validationSchema = yup.object({
    reason: yup
      .string("Nhập lý do đến khám")
      .max(250, "Lý do đến khám không được quá 250 ký tự.")
      .required("Lý do đến khám là bắt buộc"),
    diagnostic: yup.string("Nhập chẩn đoán").required("Chẩn đoán là bắt buộc."),
    causal: yup
      .string("Nhập nguyên nhân")
      .max(250, "Nguyên nhân không được quá 250 ký tự.")
      .required("Nguyên nhân là bắt buộc."),
    marrowRecord: yup
      .string("Nhập lưu ý về tủy")
      .max(250, "Lưu ý về tuỷ không được quá 250 ký tự.")
      .required("Lưu ý về tuỷ là bắt buộc."),
    treatment: yup
      .string("Nhập điều trị")
      .max(250, "Điều trị không được quá 250 ký tự.")
      .required("Điều trị là bắt buộc."),
  });

  const loadServiceOption = async () => {
    try {
      const res = await axiosInstance.get(listAllServiceAPI);
      setServiceId(res.data[0].serviceId);
      setServiceIds(res.data);
      // setServicePrice(res.data[0].price);
      // setServiceDiscount(res.data[0].discount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadServiceOption();
  }, []);

  useEffect(() => {
    setServiceDTOS(formatToDTOS(listTreatingService, rows));
    setEdit(true);
  }, [rows, listTreatingService]);

  const handleExportMaterial = (material) => {
    setMaterialExportDTOS(material);
  };

  const handleSpecimen = (specimen) => {
    setSpecimenDTOS(specimen);
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
      diagnostic: "",
      causal: "",
      marrowRecord: "",
      note: "",
      treatment: "",
      prescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formatValue = values;

      const listA = listTreatingService.filter((a) => {
        return Object.keys(a).length !== 0;
      });
      const listB = rows.filter((a) => {
        return Object.keys(a).length !== 0;
      });
      formatValue.serviceDTOS = listA.concat(listB);
      formatValue.materialExportDTOS = materialExportDTOS;
      formatValue.specimensDTOS = specimenDTOS;
      formatValue.date = valueDate;
      const addValue = {
        id: id,
        values: formatValue,
      };
      dispatch(addRecord(addValue));
      setRows([]);
      setCountRow({
        statusCount: "up",
        value: 0,
      });
      setModalAddOpen(false);
      setValueDate(null);
      formik.handleReset();
      setTimeout(() => {
        getServiceTreating(id);
        isSubmitForm(true);
      }, 1000);
    },
  });

  const formatToDTOS = (listTreatingService, rows) => {
    let listA = [];
    let listB = [];
    listA = listTreatingService.filter((a) => {
      return Object.keys(a)?.length !== 0;
    });
    listB = rows?.filter((a) => {
      if (a) {
        return Object.keys(a).length !== 0;
      }
      return null;
    });
    return listA.concat(listB);
  };

  const styleInput = {
    width: "70%",
    background: "none",
  };

  useEffect(() => {
    if (countRow.value && countRow.statusCount === "up") {
      const serviceInfo = serviceIds.find(
        (s) => s.serviceId === serviceIds[0].serviceId
      );
      setRows((prev) => {
        prev[countRow.value - 1] = {
          ...prev[countRow.value - 1],
          ...serviceInfo,
        };
        prev[countRow.value - 1].isNew = 1;
        prev[countRow.value - 1].status = 1;
        return _.cloneDeep(prev);
      });
    }
  }, [countRow]);

  const handleAdd = () => {
    setCountRow({
      statusCount: "up",
      value: countRow.value + 1,
    });
  };

  const handleEdit = (e) => {
    setEdit(!isEdit);
  };

  // const handleInputChange = (e, index) => {
  //   setDisable(false);
  //   const { name, value } = e.target;
  //   const list = [...rows];
  //   list[index][name] = value;
  //   setRows(list);
  // };

  const handleConfirm = (index) => {
    setShowConfirm(index);
  };

  const handleRemoveClick = (ind) => {
    const list = rows.filter((_, index) => index !== ind);
    setRows(list);
    setCountRow({
      statusCount: "down",
      value: countRow.value - 1,
    });
    setShowConfirm(-1);
  };

  const handleNo = () => {
    setShowConfirm(-1);
  };

  const handleCancel = () => {
    setModalAddOpen(false);
    setRows([]);
    setCountRow({
      statusCount: "up",
      value: 0,
    });
    setValueDate(null);
    formik.handleReset();
    formik.resetForm();
  };

  const handleServiceChange = (index, newsServiceId) => {
    const serviceInfo = serviceIds.find((s) => s.serviceId === newsServiceId);
    setRows((prev) => {
      prev[index] = { ...prev[index], ...serviceInfo };
      prev[index].isNew = 1;
      prev[index].status = 1;
      return _.cloneDeep(prev);
    });
  };

  // const handleStatusForItem = (row, value) => {
  //   console.log(value);
  //   row.status = value;
  // };

  const getServiceTreating = async (id) => {
    try {
      const res = await axiosInstance.get(listTreatingServiceAPI + id);
      setListTreatingService(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });

  // useEffect(() => {
  //     const price = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.price
  //     const discount = serviceIds?.filter(e => e.serviceId === serviceId)[0]?.discount
  //     setServicePrice(price)
  //     setServiceDiscount(discount)
  // }, [serviceId])

  useEffect(() => {
    // const price = serviceIds?.filter((e) => e.serviceId === serviceId)[0]
    //   ?.price;
    // setServicePrice(price);
    getServiceTreating(id);
  }, [id, serviceId, isAddRecord]);

  return (
    <>
      <Modal
        title="Thêm Hồ Sơ"
        open={modalAddOpen}
        width="70%"
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        <Box
          className="container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box className="form-input" style={{ width: "30%" }}>
            <InputDentist
              id="reason"
              label="Triệu chứng"
              required
              value={formik.values.reason}
              onChange={formik.handleChange}
              error={{
                message: formik.errors.reason,
                touched: formik.touched.reason,
              }}
            />
            <InputDentist
              id="diagnostic"
              label="Chuẩn đoán"
              required
              value={formik.values.diagnostic}
              onChange={formik.handleChange}
              error={{
                message: formik.errors.diagnostic,
                touched: formik.touched.diagnostic,
              }}
            />
            <InputDentist
              id="causal"
              label="Nguyên nhân"
              required
              value={formik.values.causal}
              onChange={formik.handleChange}
              error={{
                message: formik.errors.causal,
                touched: formik.touched.causal,
              }}
            />
            <Box className="mb-2">
              <p className="mb-1 font-bold">
                Ngày khám<span className="text-red-600">*</span>
              </p>
              <DatePickerDentist
                value={valueDate}
                placeholder="Ngày khám"
                onChange={(value) => {
                  setValueDate(
                    value ? moment(value).format(validationDate) : ""
                  );
                }}
              />
              {/* {formik.touched && !valueDate && (
                <Typography
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    fontSize: "14px",
                  }}
                >
                  Ngày khám bắt buộc
                </Typography>
              )} */}
            </Box>
            <InputDentist
              id="marrowRecord"
              label="Lưu ý về tủy"
              required
              value={formik.values.marrowRecord}
              onChange={formik.handleChange}
              error={{
                message: formik.errors.marrowRecord,
                touched: formik.touched.marrowRecord,
              }}
            />

            <Box className="mb-2">
              <p className="mb-1 font-bold">Ghi chú</p>
              <TextField
                id="note"
                required
                fullWidth
                placeholder="Ghi chú"
                value={formik.values.note}
                multiline
                onChange={formik.handleChange}
              />
            </Box>
            <InputDentist
              id="treatment"
              label="Điều trị"
              required
              value={formik.values.treatment}
              onChange={formik.handleChange}
              error={{
                message: formik.errors.treatment,
                touched: formik.touched.treatment,
              }}
            />
            <Box className="mb-2">
              <p className="mb-1 font-bold">Đơn thuốc</p>
              <TextField
                id="prescription"
                required
                fullWidth
                placeholder="Đơn thuốc"
                value={formik.values.prescription}
                multiline
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
          <Box className="w-2/3">
            <Box className="flex gap-3 float-right mb-3">
              <Button
                variant="contained"
                color="success"
                endIcon={<AddCircleIcon className="p-0 border-0" />}
                onClick={isEdit ? handleAdd : handleEdit}
              >
                <span className="leading-none">Thêm dịch vụ</span>
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<AddCircleIcon className="p-0 border-0" />}
                onClick={() => {
                  setModalSpecimenOpen(true);
                }}
              >
                <span className="leading-none">Thêm mẫu vật</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SellIcon className="p-0 border-0" />}
                onClick={() => {
                  setModalExportOpen(true);
                }}
              >
                <span className="leading-none">Bán sản phẩm</span>
              </Button>
            </Box>
            <StyledTable className="shadow-md" size="small">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell style={{ width: "25%" }}>
                    Dich vụ
                  </StyledTableCell>
                  <StyledTableCell>Giá tiền</StyledTableCell>
                  <StyledTableCell>Giảm giá</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {listTreatingService?.map((item, index) => (
                  <StyledTableRow key={item.serviceId}>
                    <StyledTableCell>{item.serviceName}</StyledTableCell>
                    <StyledTableCell>
                      {formatter.format(item.price)} VND
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatter.format(item.discount)} VND
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <Select
                            labelId="status"
                            id="status"
                            value={item.status || ""}
                            onChange={
                              (e) =>
                                setListTreatingService((prev) => {
                                  prev[index].status = e.target.value;
                                  return _.cloneDeep(prev);
                                })
                              // setStatus(e.target.value)
                            }
                          >
                            <MenuItem value={1}>Đang chữa trị</MenuItem>
                            <MenuItem value={2}>Đã xong</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                ))}
                {rows?.map((i, index) => {
                  return (
                    <StyledTableRow>
                      {isEdit ? (
                        <>
                          <StyledTableCell>
                            {/* <select
                                                            name="cars"
                                                            id="cars"
                                                            value={serviceId}
                                                            style={{ styleInput, justifyContent: "center" }}
                                                            onChange={(e) => setServiceId(e.target.value)}
                                                        >
                                                            {serviceIds?.map(item => (
                                                                <option key={item.serviceId} value={item.serviceId}>{item.serviceName}</option>
                                                            ))}
                                                        </select> */}
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <Select
                                  labelId="permisstion"
                                  id="permisstionSelect"
                                  value={i?.serviceId || 1}
                                  onChange={(e) => {
                                    setServiceId(e.target.value);
                                    handleServiceChange(index, e.target.value);
                                  }}
                                >
                                  {serviceIds?.map((item) => (
                                    <MenuItem
                                      key={item.serviceId}
                                      value={item.serviceId}
                                    >
                                      {item.serviceName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <input
                              id={i?.serviceId || 1}
                              disabled
                              value={formatter.format(i?.price) || 0}
                              name="price"
                              style={styleInput}
                              // onChange={(e) => handleInputChange(e, i)}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <OutlinedInput
                              id="discount"
                              value={formatter.format(i?.discount)}
                              endAdornment={
                                <p className="mb-0 leading-0 text-xs">VND</p>
                              }
                              onChange={
                                (e) => {
                                  const value = e.target.value.replaceAll(
                                    ",",
                                    ""
                                  );
                                  setRows((prev) => {
                                    prev[index].discount = value;
                                    return _.cloneDeep(prev);
                                  });
                                }
                                // setServiceDiscount(e.target.value)
                              }
                              className="h-[30px] bg-white"
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <Select
                                  labelId="status"
                                  id="status"
                                  value={i?.status || ""}
                                  onChange={(e) => {
                                    setRows((prev) => {
                                      prev[index].status = e.target.value;
                                      return _.cloneDeep(prev);
                                    });
                                  }}
                                >
                                  <MenuItem value={1}>Đang chữa trị</MenuItem>
                                  <MenuItem value={2}>Đã xong</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Button
                              className="mr10"
                              onClick={() => handleConfirm(index)}
                            >
                              <ClearIcon />
                            </Button>
                          </StyledTableCell>
                        </>
                      ) : (
                        <></>
                      )}
                      <div>
                        <Dialog
                          open={showConfirm === index}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Chấp nhận xóa"}
                          </DialogTitle>
                          <DialogContent>
                            {/* <DialogContentText id="alert-dialog-description">
                              Are you sure to delete
                            </DialogContentText> */}
                          </DialogContent>
                          <DialogActions style={{ justifyContent: "center" }}>
                            <Button
                              onClick={() => handleRemoveClick(index)}
                              color="primary"
                              multiline
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              multiline
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </Box>
        </Box>
        <ModalExportMaterial
          modalExportOpen={modalExportOpen}
          setModalExportOpen={setModalExportOpen}
          showModalExportMaterial={showModalExportMaterial}
          exportMaterial={handleExportMaterial}
          materialExportDTOS={materialExportDTOS}
        />
        <ModalSpecimen
          modalSpecimenOpen={modalSpecimenOpen}
          setModalSpecimenOpen={setModalSpecimenOpen}
          showModalSpecimen={showModalSpecimen}
          specimens={handleSpecimen}
          specimenDTOS={specimenDTOS}
          serviceDTOS={serviceDTOS}
        />
      </Modal>
    </>
  );
};

export default ModalAddRecord;
