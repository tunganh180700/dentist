import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axiosInstance from "../../../config/customAxios";
import { getAllLaboAPI } from "../../../config/baseAPI";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";

const ModalSpecimen = ({
  modalSpecimenOpen,
  setModalSpecimenOpen,
  specimens,
  specimenDTOS,
  serviceDTOS,
}) => {
  const [labo, setLabo] = useState([]);
  const [specimen, setSpecimen] = useState([]);

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });

  const getLabos = async () => {
    try {
      const { data } = await axiosInstance.get(getAllLaboAPI);
      setLabo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (modalSpecimenOpen) {
      getLabos();
    }
  }, [modalSpecimenOpen]);

  useEffect(() => {
    setSpecimen([]);
    if (specimenDTOS.length) {
      const dataDTOS = specimenDTOS.map((item) => ({
        patientRecordId: item.patientRecordId,
        specimenId: item.specimenId,
        specimenName: item.specimenName,
        amount: item.amount,
        unitPrice: item.unitPrice,
        laboId: item.laboId,
        serviceId: item.serviceId,
        statusChange: item.statusChange,
      }));
      setSpecimen(dataDTOS);
    }
  }, [specimenDTOS]);

  // useEffect(() => {
  //   if (isEdit) {
  //     console.log(12312312);
  //     setLoading(true);
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   }
  // }, [isEdit,modalSpecimenOpen]);

  return (
    <>
      <Modal
        title="Tạo mẫu vật"
        open={modalSpecimenOpen}
        width="72%"
        onOk={() => {
          setModalSpecimenOpen(false);
          specimens(specimen);
        }}
        onCancel={() => setModalSpecimenOpen(false)}
      >
        <Button
          className="mb-3 float-right"
          variant="contained"
          color="success"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            setSpecimen((prev) => [
              ...prev,
              {
                specimenName: null,
                amount: 1,
                unitPrice: serviceDTOS[0]?.price,
                laboId: labo[0]?.laboId,
                serviceId: serviceDTOS[0]?.serviceId,
                statusChange: "add",
              },
            ]);
          }}
        >
          <span className="leading-none">Thêm mới</span>
        </Button>
        <p className="font-bold text-lg mb-0">
          Đang có ({specimen.length}) thêm mới
        </p>
        <StyledTable size="small" className="shadow-md">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Tên mẫu vật</StyledTableCell>
              <StyledTableCell>Số lượng</StyledTableCell>
              <StyledTableCell>Đơn giá</StyledTableCell>
              <StyledTableCell>Tên labo</StyledTableCell>
              <StyledTableCell>Dịch vụ</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {specimen?.map((specimen, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell padding="none">
                  <OutlinedInput
                    endAdornment={<p className="mb-0 leading-0 text-xs"></p>}
                    id="specimenName"
                    placeholder="Tên mẫu vật"
                    value={specimen.specimenName}
                    className="h-[30px] bg-white"
                    onChange={(e) =>
                      setSpecimen((prev) => {
                        prev[index].specimenName = e.target.value;
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  <OutlinedInput
                    endAdornment={<p className="mb-0 leading-0 text-xs"></p>}
                    size="small"
                    id="amount"
                    value={specimen.amount}
                    type="number"
                    inputProps={{ min: 1 }}
                    className="h-[30px] bg-white"
                    onChange={(e) =>
                      setSpecimen((prev) => {
                        prev[index].amount = e.target.value;
                        return _.cloneDeep(prev);
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell padding="none">
                  {formatter.format(specimen.unitPrice) || 0} VND
                  {/* <OutlinedInput
                    endAdornment={<p className="mb-0 leading-0 text-xs">VND</p>}
                    id="discount"
                    value={specimen.unitPrice || 0}
                    className="h-[30px] bg-white"
                    InputProps={{
                      readOnly: true,
                    }}
                    // onChange={(e) =>
                    //   setSpecimen((prev) => {
                    //     prev[index].unitPrice = e.target.value;
                    //     return _.cloneDeep(prev);
                    //   })
                    // }
                  /> */}
                </StyledTableCell>
                <StyledTableCell>
                  <Select
                    className="h-[30px] bg-white"
                    fullWidth
                    id="laboId"
                    value={specimen?.laboId}
                    onChange={(e) => {
                      const m = labo.find((l) => l.laboId === e.target.value);
                      setSpecimen((prev) => {
                        prev[index] = { ...prev[index], laboId: m?.laboId };
                        return _.cloneDeep(prev);
                      });
                    }}
                  >
                    {labo?.map((item) => (
                      <MenuItem key={item.laboId} value={item.laboId}>
                        {item.laboName}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
                <StyledTableCell>
                  <Select
                    className="h-[30px] bg-white"
                    fullWidth
                    id="serviceId"
                    value={specimen?.serviceId}
                    onChange={(e) => {
                      const m = serviceDTOS.find(
                        (s) => s.serviceId === e.target.value
                      );
                      setSpecimen((prev) => {
                        prev[index] = {
                          ...prev[index],
                          serviceId: m?.serviceId,
                          unitPrice: m?.price,
                        };
                        return _.cloneDeep(prev);
                      });
                    }}
                  >
                    {serviceDTOS
                      ?.filter((i) => i.status === 1)
                      .map((item) => (
                        <MenuItem key={item.serviceId} value={item.serviceId}>
                          {item.serviceName}
                        </MenuItem>
                      ))}
                  </Select>
                </StyledTableCell>

                <StyledTableCell padding="none">
                  <Button
                    className="mr10"
                    onClick={() => {
                      setSpecimen((prev) => {
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
export default ModalSpecimen;
