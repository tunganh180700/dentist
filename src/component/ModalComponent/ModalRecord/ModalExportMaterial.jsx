import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Select,
  OutlinedInput,
} from "@mui/material";
import axiosInstance from "../../../config/customAxios";
import { listAllMaterialAPI } from "../../../config/baseAPI";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
const ModalExportMaterial = ({
  modalExportOpen,
  setModalExportOpen,
  exportMaterial,
  materialExportDTOS,
}) => {
  const dispatch = useDispatch();
  const [material, setMaterial] = useState([]);
  const [materialExport, setMaterialExport] = useState([]);
  //   const [amountTotalMaterial, setAmountTotalMaterial] = useState(0);

  const getMaterials = async () => {
    try {
      let { data } = await axiosInstance.get(listAllMaterialAPI);
      data = data.filter((item) => item.amount > 0);
      setMaterial(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });

  const maxAmount = (materialId) => {
    return material.find((item) => item.materialId === materialId)?.amount || 0;
  };

  useEffect(() => {
    if (modalExportOpen) {
      getMaterials();
    }
    // setMaterialExport(materialExportDTOS);
  }, [modalExportOpen]);

  useEffect(() => {
    setMaterialExport([]);
    if (materialExportDTOS.length) {
      const dataDTOS = materialExportDTOS.map((item) => ({
        patientRecordId: item.patientRecordId,
        materialExportId: item.materialExportId,
        materialId: item.materialId,
        materialName: item.materialName,
        amount: item.amount,
        unitPrice: item.unitPrice,
        total: item.unitPrice * item.amount,
        statusChange: item.statusChange,
      }));
      setMaterialExport(dataDTOS);
    }
  }, [materialExportDTOS]);

  const listOptionMaterialEnable = useMemo(() => {
    const selected = materialExport.map((item) => item.materialId);
    const list = material.filter((item) => !selected.includes(item.materialId));
    return list;
  }, [materialExport, material]);

  return (
    <>
      <Modal
        title="Bán sản phẩm"
        open={modalExportOpen}
        width="65%"
        onOk={() => {
          setModalExportOpen(false);
          exportMaterial(materialExport);
        }}
        onCancel={() => setModalExportOpen(false)}
      >
        <Button
          className="mb-3 float-right"
          variant="contained"
          disabled={!listOptionMaterialEnable.length}
          color="success"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            setMaterialExport((prev) => [
              ...prev,
              {
                materialId: listOptionMaterialEnable[0]?.materialId,
                amount: 1,
                unitPrice: listOptionMaterialEnable[0]?.price,
                total: listOptionMaterialEnable[0]?.price,
                statusChange: "add",
              },
            ]);
          }}
        >
          <span className="leading-none">
            {listOptionMaterialEnable.length ? "Thêm mới" : "Đã hết sản phẩm"}
          </span>
        </Button>
        <p className="font-bold text-lg mb-0">
          Đang có ({materialExport.length}) thêm mới
        </p>
        <StyledTable
          className="shadow-md"
          size="small"
          style={{ marginTop: "15px" }}
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ width: "25%" }}>
                Tên sản phẩm
              </StyledTableCell>
              <StyledTableCell>Số lượng</StyledTableCell>
              <StyledTableCell>Đơn giá</StyledTableCell>
              <StyledTableCell>Tổng giá</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {materialExport?.map((materialExportItem, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <Select
                    id="materialId"
                    fullWidth
                    value={materialExportItem?.materialId}
                    className="bg-white h-[30px]"
                    onChange={(e) => {
                      const m = material.find(
                        (s) => s.materialId === e.target.value
                      );
                      setMaterialExport((prev) => {
                        const total = (prev[index]?.amount || 0) * m?.price;
                        prev[index] = {
                          ...prev[index],
                          unitPrice: m?.price,
                          materialId: m?.materialId,
                          total,
                        };
                        return _.cloneDeep(prev);
                      });
                    }}
                  >
                    {material?.map((item) => (
                      <MenuItem
                        hidden={materialExport
                          .map((item_material) => item_material.materialId)
                          .includes(item.materialId)}
                        key={item.materialId}
                        value={item.materialId}
                      >
                        {item.materialName}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
                {/* <StyledTableCell padding="none">
                  <TextField
                    endAdornment={<p className="mb-0 leading-0 text-xs"></p>}
                    size="small"
                    id="amount"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: maxAmount(materialExport?.materialId),
                      },
                    }}
                    value={materialExport.amount}
                    className="h-[30px] bg-white"
                    onChange={(e) =>
                      setMaterialExport((prev) => {
                        prev[index].amount = e.target.value;
                        prev[index].total =
                          (e.target.value || 0) * (prev[index].unitPrice || 0);
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell> */}
                <StyledTableCell padding="none">
                  <OutlinedInput
                    endAdornment={<p className="mb-0 leading-0 text-xs"></p>}
                    size="small"
                    id="amount"
                    value={materialExportItem.amount}
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: maxAmount(materialExportItem?.materialId),
                      },
                    }}
                    className="h-[30px] bg-white"
                    onChange={(e) =>
                      setMaterialExport((prev) => {
                        prev[index].amount = e.target.value;
                        prev[index].total =
                          (e.target.value || 0) * (prev[index].unitPrice || 0);
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  {formatter.format(materialExportItem.unitPrice) || 0} VND
                </StyledTableCell>
                <StyledTableCell padding="none">
                  {formatter.format(materialExportItem.total) || 0} VND
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <Button
                    className="mr10"
                    onClick={() => {
                      setMaterialExport((prev) => {
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
export default ModalExportMaterial;
