import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import moment from "moment";

const TableTimeKeepingManagement = (props) => {
  const { listTimekeeping, role, currentPage } = props;
  const renderTime = (time) => {
    if (time === null) return "";
    return moment(time).format("DD/MM/YYYY, h:mm:ss a");
  };
  const renderStatus = (time) => {
    if (time === null) return "Checked in";
    else return "Checked out";
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#000000ba",
      fontWeight: "bold",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Box
        className="w-full rounded-lg shadow-md  overflow-hidden"
        style={{ background: "#fff" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              {role === "Admin" && <StyledTableCell>Họ và Tên</StyledTableCell>}
              <StyledTableCell>Thời gian check-in</StyledTableCell>
              <StyledTableCell>Thời gian check-out</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTimekeeping.map((item, index) => (
              <StyledTableRow key={item.timekeepingId}>
                <StyledTableCell>
                  {parseInt(currentPage) * 10 + index + 1}
                </StyledTableCell>
                {role === "Admin" && (
                  <StyledTableCell>{item.fullName}</StyledTableCell>
                )}
                <StyledTableCell>
                  {renderTime(item.timeCheckin)}
                </StyledTableCell>
                <StyledTableCell>
                  {renderTime(item.timeCheckout)}
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    size="small"
                    label={renderStatus(item.timeCheckout)}
                    style={{background:`${item.timeCheckout ? "#59995c" : "#418eed"}`, color:'#fff'}}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default TableTimeKeepingManagement;
