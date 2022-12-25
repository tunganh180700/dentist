import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIncomeId } from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import { Tabs } from "antd";

import {
  fetchAllIncome,
  fetchAllNetIncome,
  fetchAllTotalSpendIncome,
} from "../../../redux/IncomeSlice/listIncomeSlice";
import ChartIncome from "./ChartIncome";

const IncomeManagementContent = () => {
  const listIncome = useSelector((state) => state.listIncome.listIncome);
  const listNetIncome = useSelector((state) => state.listIncome.listNetIncome);
  const listTotalSpendIncome = useSelector(
    (state) => state.listIncome.listTotalSpendIncome
  );
  const totalIncome = useSelector((state) => state.listIncome.totalIncome);
  const totalNetIncome = useSelector(
    (state) => state.listIncome.totalNetIncome
  );
  const totalSpendIncome = useSelector(
    (state) => state.listIncome.totalSpendIncome
  );
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.listIncome.pageSize);
  const totalPages = useSelector((state) => state.listIncome.totalPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataChart, setDataChart] = useState([]);

  console.log("income: ", listIncome);

  useEffect(() => {
    dispatch(fetchAllIncome({}));
    dispatch(fetchAllNetIncome({}));
    dispatch(fetchAllTotalSpendIncome({}));
  }, []);

  useEffect(() => {
    if (
      listTotalSpendIncome.length &&
      listNetIncome.length &&
      listIncome.length
    ) {
      const cookIncome = listIncome.map((item) => ({
        ...item,
        value: item.price,
        type: "Doanh thu",
      }));
      const cookNetIncome = listNetIncome.map((item) => ({
        ...item,
        value: item.price,
        type: "Thực thu",
      }));
      const cookTotalSpend = listTotalSpendIncome.map((item) => ({
        ...item,
        value: item.price,
        type: "Tổng chi",
      }));
      setDataChart([...cookIncome, ...cookNetIncome, ...cookTotalSpend]);
    }
  }, [listTotalSpendIncome, listNetIncome, listIncome]);

  const formatter = new Intl.NumberFormat({
    style: "currency",
    currency: "VND",
  });

  const InComeTable = () => {
    return (
      <StyledTable size="small" className="shadow-md mb-10">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Nguồn thu nhập</StyledTableCell>
            <StyledTableCell>Ngày thu</StyledTableCell>
            <StyledTableCell>Số Tiền ( VND )</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listIncome.map((item, index) => (
            <StyledTableRow size="medium">
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.date}</StyledTableCell>
              <StyledTableCell>{formatter.format(item.price)}</StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableCell
            colSpan={3}
            style={{ fontWeight: "bold", fontSize: "20px", textAlign: "end" }}
          >
            Tổng tiền : {totalIncome}
          </StyledTableCell>
        </TableBody>
      </StyledTable>
    );
  };
  const NetIncomeTable = () => {
    return (
      <StyledTable size="small" className="shadow-md mb-10">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Nguồn thu nhập</StyledTableCell>
            <StyledTableCell>Ngày thu</StyledTableCell>
            <StyledTableCell>Số Tiền ( VND )</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listNetIncome.map((item, index) => (
            <StyledTableRow size="medium">
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.date}</StyledTableCell>
              <StyledTableCell>{formatter.format(item.price)}</StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableCell
            colSpan={3}
            style={{ fontWeight: "bold", fontSize: "20px", textAlign: "end" }}
          >
            Tổng tiền : {totalNetIncome}
          </StyledTableCell>
        </TableBody>
      </StyledTable>
    );
  };

  const TotalSpendTable = () => {
    return (
      <StyledTable size="small" className="shadow-md mb-10">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Nguồn thu nhập</StyledTableCell>
            <StyledTableCell>Ngày thu</StyledTableCell>
            <StyledTableCell>Số Tiền ( VND )</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listTotalSpendIncome.map((item, index) => (
            <StyledTableRow size="medium">
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.date}</StyledTableCell>
              <StyledTableCell>{formatter.format(item.price)}</StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableCell
            colSpan={3}
            style={{ fontWeight: "bold", fontSize: "20px", textAlign: "end" }}
          >
            Tổng tiền : {totalSpendIncome}
          </StyledTableCell>
        </TableBody>
      </StyledTable>
    );
  };

  return (
    <>
      <h2 className="font-bold mb-5">Quản lý Thu nhập</h2>
      <ChartIncome data={dataChart} />
      <Tabs
        defaultActiveKey="1"
        className="mt-3"
        items={[
          {
            label: <p className="mb-0 font-medium text-lg">Doanh thu</p>,
            key: "1",
            children: <InComeTable />,
          },
          {
            label: <p className="mb-0 font-medium text-lg">Thực thu</p>,
            key: "2",
            children: <NetIncomeTable />,
          },
          {
            label: <p className="mb-0 font-medium text-lg">Tổng chi</p>,
            key: "3",
            children: <TotalSpendTable />,
          },
        ]}
      />
    </>
  );
};

export default IncomeManagementContent;
