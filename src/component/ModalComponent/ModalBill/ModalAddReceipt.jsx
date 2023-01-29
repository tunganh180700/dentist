import { Box, OutlinedInput, Typography, InputAdornment } from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { fetchBill } from "../../../redux/BillSlice/choosenBillSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { fetchNewReceipt } from "../../../redux/ReceiptSlice/choosenNewReceiptSlice";
import { addNewReceipt } from "../../../redux/ReceiptSlice/listReceiptSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { regexNumber } from "../../../config/validation";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import InputDentist from "../../ui/input";
const ModalAddReceipt = ({ modalAddReceiptOpen, setModalAddReceiptOpen }) => {
  const [loading, setLoading] = useState();
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const treatmentId = useSelector((state) => state.modal.treatmentId);
  const debit = useSelector((state) => state.choosenNewReceipt.debit);
  const oldDebit = useSelector((state) => state.choosenNewReceipt.oldDebit);
  const patientId = useSelector((state) => state.choosenBill.patientId);

  const newServices = useSelector(
    (state) => state.choosenNewReceipt.newServices
  );

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    payment: yup
      .string("Nhập đơn giá")
      .matches(regexNumber, "Không được nhập chữ, kí tự, số âm.")
      .required("Đơn giá là bắt buộc."),
  });

  useEffect(() => {
    setLoading(true);
    try {
      if (treatmentId) {
        dispatch(fetchBill(treatmentId));
        dispatch(fetchNewReceipt(treatmentId));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [treatmentId]);

  useEffect(() => {
    console.log(isSubmitForm);
    try {
      if (isSubmitForm) {
        dispatch(fetchBill(treatmentId));
        dispatch(fetchNewReceipt(treatmentId));
        setIsSubmitForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isSubmitForm]);

  const formik = useFormik({
    initialValues: {
      payment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const addValue = {
        treatmentId: treatmentId,
        values: values,
      };

      dispatch(addNewReceipt(addValue));
      setModalAddReceiptOpen(false);
      formik.handleReset();
      setTimeout(() => {
        setIsSubmitForm(true);
      }, 1000);
    },
  });

  const handleCancel = () => {
    setModalAddReceiptOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Modal
        title="Thanh toán hóa đơn"
        style={{ fontWeight: "bold" }}
        open={modalAddReceiptOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        <Typography component="h1" fontWeight="bold" color="inherit" marginBottom={1} noWrap>
          Nợ cũ : {oldDebit || 0} VND
        </Typography>
        <StyledTable className="shadow-md mb-3">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Dịch vụ mới
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Giá tiền (VND)
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Giảm giá (VND)
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {newServices.map((item, index) => (
              <StyledTableRow size="medium" key={item.serviceId}>
                <StyledTableCell>{item.serviceName}</StyledTableCell>
                <StyledTableCell>{item.currentPrice}</StyledTableCell>
                <StyledTableCell>{item.discount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        <Box className="flex justify-between gap-3  text-center">
          <img
            className="rounded-lg"
            width={200}
            src="https://timo.vn/wp-content/uploads/cach-thanh-toan-tien-dien-online-1200x900.jpg"
          />
          <Box width="50%">
            <Typography
              component="h1"
              fontWeight="bold"
              color="inherit"
              noWrap
              className="mb-2"
            >
              Tổng nợ : {debit} VND
            </Typography>
            <OutlinedInput
              fullWidth
              id="payment"
              placeholder="Nhập tiền thanh toán"
              name="payment"
              value={formik.values.payment}
              onChange={formik.handleChange}
              endAdornment={<InputAdornment>VND</InputAdornment>}
            />
            {formik.errors.payment && formik.touched.payment && (
              <Typography style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.payment}
              </Typography>
            )}

            <hr />
            <Typography component="h1" fontWeight="bold" color="inherit" noWrap>
              Còn lại : {debit - formik.values.payment} VND
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddReceipt;
