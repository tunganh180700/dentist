import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { Typography, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
// import { useFormik } from "formik";
import { listAllMaterialAPI } from "../../../config/baseAPI";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axiosInstance from "../../../config/customAxios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import { addListMaterialImportAPI } from "../../../config/baseAPI";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { toast } from "react-toastify";
import { toastCss } from "../../../redux/toastCss";
import { addMaterialImport } from "../../../redux/MaterialSlice/listMaterialImportSlice";

const ModalAddListMaterialImport = ({ modalAddOpen, setModalAddOpen }) => {
  const dispatch = useDispatch();

  const [materialIds, setMaterialIds] = useState([]);
  const [materialImport, setMaterialImport] = useState([]);

  // const [listMaterialPrice, setListMaterialPrice] = useState([]);

  // const validationSchema = yup.object({
  //     supplyName: yup
  //         .string('Nhập đơn vị cung cấp')
  //         .max(250, 'Đơn vị cung cấp không thể quá 250 ký tự.')
  //         .required('Đơn vị cung cấp là bắt buộc.'),
  //     amount: yup
  //         .string('Nhập số lượng')
  //         .matches(regexNumber, "Số lượng không được nhập chữ, kí tự, số âm.")
  //         .required('Số lượng là bắt buộc.'),
  //     unitPrice: yup
  //         .string('Nhập đơn giá')
  //         .matches(regexNumber, "Đơn giá không được nhập chữ, kí tự, số âm.")
  //         .required('Đơn giá là bắt buộc.')

  // });

  const loadMaterial = async () => {
    try {
      const res = await axiosInstance.get(listAllMaterialAPI);
      setMaterialIds(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMaterial();
  }, []);

  // const formik = useFormik({
  //     initialValues: {
  //         supplyName: '',
  //         amount: '',
  //         unitPrice: '',
  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: (values) => {
  //         values.date = moment(value.$d).format(validationDate);
  //         values.materialId = materialId;
  //         values.totalPrice = materialPrice;
  //         console.log(values);
  //         dispatch(addMaterialImport(values))
  //         setModalAddOpen(false)
  //         formik.handleReset()
  //     }
  // });

  return (
    <>
      <Modal
        okText={"Lưu"}
        title="Nhập vật liệu"
        open={modalAddOpen}
        width="70%"
        onOk={() => {
          setModalAddOpen(false);
          dispatch(addMaterialImport(materialImport));
        }}
        onCancel={() => setModalAddOpen(false)}
      >
        <Box className="text-right">
          <Button
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            onClick={() => {
              setMaterialImport((prev) => [
                ...prev,
                {
                  materialId: materialIds?.[0].materialId,
                  supplyName: null,
                  amount: 1,
                  unitPrice: 0,
                  total: 0,
                },
              ]);
            }}
          >
            <span className="leading-none">Thêm mới</span>
          </Button>
        </Box>
        <StyledTable
          size="small"
          className="mb-3 shadow-md"
          style={{ marginTop: "15px" }}
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ width: "20%" }}>
                Tên sản phẩm
              </StyledTableCell>
              <StyledTableCell>Hãng cung cấp</StyledTableCell>
              <StyledTableCell>Số lương</StyledTableCell>
              <StyledTableCell>Đơn Giá</StyledTableCell>
              <StyledTableCell>Tổng giá</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {materialImport?.map((materialImportItem, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell style={{ paddingTop: "1.5rem" }}>
                  <Select
                    id="materialId"
                    value={materialImportItem?.materialId}
                    onChange={(e) => {
                      setMaterialImport((prev) => {
                        prev[index].materialId = e.target.value;
                        return _.cloneDeep(prev);
                      });
                    }}
                  >
                    {materialIds?.map((item) => (
                      <MenuItem key={item.materialId} value={item.materialId}>
                        {item.materialName}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <input
                    value={materialImportItem.supplyName}
                    name="supplyName"
                    onChange={(e) =>
                      setMaterialImport((prev) => {
                        prev[index].supplyName = e.target.value;
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <input
                    value={materialImportItem.amount}
                    name="amount"
                    type={"number"}
                    onChange={(e) =>
                      setMaterialImport((prev) => {
                        prev[index].amount = +e.target.value;
                        prev[index].total =
                          e.target.value * prev[index].unitPrice;
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <input
                    value={materialImportItem.unitPrice}
                    name="unitPrice"
                    onChange={(e) =>
                      setMaterialImport((prev) => {
                        prev[index].unitPrice = e.target.value;
                        prev[index].total = e.target.value * prev[index].amount;
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <input
                    value={materialImportItem.total}
                    name="total"
                    onChange={(e) =>
                      setMaterialImport((prev) => {
                        return _.cloneDeep(prev);
                      })
                    }
                    disabled={true}
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <Button
                    className="mr10"
                    onClick={() => {
                      setMaterialImport((prev) => {
                        prev.splice(index, 1);
                        return _.cloneDeep(prev);
                      });
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Modal>
    </>
  );
};

export default ModalAddListMaterialImport;
