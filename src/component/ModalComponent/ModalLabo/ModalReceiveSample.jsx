import { Box, TableBody, TableHead } from "@mui/material";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrepareSample } from "../../../redux/LaboSlice/choosenLaboSlice";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { Checkbox } from "antd";

const ModalReceiveSample = ({ setIsShow }) => {
  const dispatch = useDispatch();
  const laboId = useSelector((state) => state.modal.laboId);
  const prepareSample = useSelector((state) => state.choosenLabo.prepareSample);

  const [listSample, setListSample] = useState([]);
  const [listSampleUpdate, setListSampleUpdate] = useState([]);

  useEffect(() => {
    dispatch(fetchPrepareSample(laboId));
  }, []);

  useEffect(() => {
    setListSample(prepareSample);
  }, [prepareSample]);

  const handleAddToList = (item) => {
    setListSampleUpdate([...listSampleUpdate, { ...item, checked: true }]);
  };
  const handleDeleteFromList = (index) => {
    const newList = listSampleUpdate.filter(
      (item) => item.specimenId !== index
    );
    setListSampleUpdate(newList);
  };

  return (
    <Modal
      width={1000}
      open={true}
      onCancel={() => {
        setListSample([]);
        setIsShow(false);
      }}
    >
      <Box>
        <Checkbox onChange={(e) => {}} />
        <span className="text-xl font-bold ml-3">Chọn tất cả</span>
      </Box>
      <StyledTable className="shadow-md mt-3">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Tên mẫu vật</StyledTableCell>
            <StyledTableCell>Số lượng</StyledTableCell>
            <StyledTableCell>Đơn giá</StyledTableCell>
            <StyledTableCell>Tên bệnh nhân</StyledTableCell>
            <StyledTableCell>Dịch vụ</StyledTableCell>
            <StyledTableCell>Trạng thái</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listSample.map((item, index) => (
            <StyledTableRow>
              <StyledTableCell>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAddToList(item);
                      return;
                    }
                    handleDeleteFromList(item.specimenId);
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>{item.specimenName}</StyledTableCell>
              <StyledTableCell>{item.amount}</StyledTableCell>
              <StyledTableCell>{item.unitPrice}</StyledTableCell>
              <StyledTableCell>{item.patientName}</StyledTableCell>
              <StyledTableCell>{item.serviceName}</StyledTableCell>
              <StyledTableCell>{item.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Modal>
  );
};

export default ModalReceiveSample;
