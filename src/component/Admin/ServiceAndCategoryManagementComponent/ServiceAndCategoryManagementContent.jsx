import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryServicedId,
  setCategoryServiceId,
} from "../../../redux/modalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  listAllCategoryAPI,
  listServiceByCategoryIdAPI,
} from "../../../config/baseAPI";
import axiosInstance from "../../../config/customAxios";
import { fetchAllCategory } from "../../../redux/ServiceAndCategorySlice/listCategorySlice";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
// import ModalUpdateMaterialImport from '../../ModalComponent/ModalMaterial/ModalUpdateMaterialImport';
import ModalAddCategory from "../../ModalComponent/ModalCategory/ModalAddCategory";
import ModalUpdateCategory from "../../ModalComponent/ModalCategory/ModalUpdateCategory";

import ModalDeleteService from "../../ModalComponent/ModalService/ModalDeleteService";
import ModalAddService from "../../ModalComponent/ModalService/ModalAddService";
import ModalUpdateService from "../../ModalComponent/ModalService/ModalUpdateService";
import { setServicedId } from "../../../redux/modalSlice";

const color = {
  border: "rgba(0, 0, 0, 0.2)",
};

const ServiceAndCategoryManagementContent = () => {
  const listCategory = useSelector((state) => state.listCategory.listCategory);
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.pageSize);
  const totalPages = useSelector((state) => state.totalPage);
  const [currentPage, setCurrentPage] = useState(0);

  const isUpdateCategory = useSelector(
    (state) => state.listCategory.isUpdateCategory
  );
  const isDeleteService = useSelector(
    (state) => state.listCategory.isDeleteService
  );
  const isAddCategory = useSelector(
    (state) => state.listCategory.isAddCategory
  );
  const isAddService = useSelector((state) => state.listCategory.isAddService);
  const isUpdateService = useSelector(
    (state) => state.listCategory.isUpdateService
  );

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddCategoryOpen, setModalAddCategoryOpen] = useState(false);
  const [modalAddServiceOpen, setModalAddServiceOpen] = useState(false);
  const [modalUpdateServiceOpen, setModalUpdateServiceOpen] = useState(false);
  const id = useSelector((state) => state.listCategory.id);
  const [loading, setLoading] = useState();

  const [categoryServiceIds, setCategoryServiceIds] = useState([]);
  const [categoryServiceId, setCategoryServiceId] = useState();

  const [serviceIds, setServiceIds] = useState([]);
  const [serviceId, setServiceId] = useState();
  const [categoryId, setCategoryId] = useState();

  console.log("list: ", listCategory);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(listAllCategoryAPI);
      console.log("du lieu check: ", res.data);
      setCategoryServiceId(res.data[0].categoryServiceId);
      setCategoryServiceIds(res.data);
      setCategoryId(listCategory[0].categoryServiceId);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategory();
  }, [isAddCategory, isUpdateCategory]);

  const loadServiceByCategoryId = async (categoryServiceId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        listServiceByCategoryIdAPI + categoryServiceId
      );
      setServiceId(res.data.categoryServiceId);
      setServiceIds(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (categoryServiceId > 0) loadServiceByCategoryId(categoryServiceId);
    console.log("fetch");
  }, [categoryServiceId, isAddService, isDeleteService, isUpdateService]);

  // console.log('haha', listServiceAndCategory)
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        fontWeight="bold"
        style={{ marginBottom: "20px" }}
      >
        Bảng Giá Dịch Vụ Nha Khoa
      </Typography>
      {loading === false && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ maxWidth: 250, minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="material">Category</InputLabel>
                <Select
                  style={{ padding: "25px 0", paddingRight: "10px" }}
                  labelId="material"
                  id="materialSelect"
                  label="Vật liệu"
                  value={categoryServiceId}
                  onChange={(e) => setCategoryServiceId(e.target.value)}
                >
                  <div>
                    <IconButton
                      aria-label="add"
                      style={{
                        borderRadius: "5%",
                        width: "100%",
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        setModalAddCategoryOpen(true);
                      }}
                    >
                      <AddIcon />
                      Thêm loại dịch vụ
                    </IconButton>
                  </div>
                  {categoryServiceIds?.map((item) => (
                    <MenuItem
                      selected={categoryServiceId}
                      key={item.categoryServiceId}
                      value={item.categoryServiceId}
                    >
                      {item.categoryServiceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div>
              <IconButton
                aria-label="add"
                style={{
                  borderRadius: "6px",
                  border: `1px solid ${color.border}`,
                  fontSize: "16px",
                }}
                onClick={() => {
                  setModalAddServiceOpen(true);
                }}
              >
                <AddIcon />
                Thêm mới Dịch vụ
              </IconButton>
              <IconButton
                aria-label="edit-service"
                style={{
                  borderRadius: "6px",
                  border: `1px solid ${color.border}`,
                  marginRight: "10px",
                  fontSize: "16px",
                }}
                onClick={() => {
                  setModalUpdateOpen(true);
                  dispatch(setCategoryServicedId(categoryServiceId));
                }}
              >
                <DesignServicesIcon />
                Cập nhật loại dịch vụ
              </IconButton>
            </div>
          </div>
          <div
            className="table"
            style={{
              marginTop: "15px",
              textAlign: "center",
              borderRadius: "8px",
              padding: "20px",
              border: `1px solid ${color.border}`,
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Dịch vụ</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Đơn vị</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Giá trên thị trường
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Giá tại nha khoa Nguyễn Trần
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody size="medium">
                {serviceIds?.map((item, index) => (
                  <TableRow
                    style={{ textAlign: "center" }}
                    key={item.serviceId}
                    size="medium"
                  >
                    <TableCell size="medium">{item.serviceName}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.marketPrice}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setModalUpdateServiceOpen(true);
                          dispatch(setServicedId(item.serviceId));
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setModalDeleteOpen(true);
                          dispatch(setServicedId(item.serviceId));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <ModalUpdateCategory
              modalUpdateOpen={modalUpdateOpen}
              setModalUpdateOpen={setModalUpdateOpen}
            />
          </div>

          <div>
            <ModalUpdateService
              modalUpdateOpen={modalUpdateServiceOpen}
              setModalUpdateOpen={setModalUpdateServiceOpen}
            />
          </div>
          <div>
            <ModalDeleteService
              modalDeleteOpen={modalDeleteOpen}
              setModalDeleteOpen={setModalDeleteOpen}
            />
          </div>
          <div>
            <ModalAddCategory
              modalAddCategoryOpen={modalAddCategoryOpen}
              setModalAddCategoryOpen={setModalAddCategoryOpen}
            />
          </div>

          <div>
            <ModalAddService
              modalAddOpen={modalAddServiceOpen}
              setModalAddOpen={setModalAddServiceOpen}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ServiceAndCategoryManagementContent;
