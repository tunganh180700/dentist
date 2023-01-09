import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, Typography, IconButton, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryServicedId,
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
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
} from "../../ui/TableElements";
import InputDentist from "../../ui/input";

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

  const [originData, setOriginData] = useState([]);
  const [categoryServiceIds, setCategoryServiceIds] = useState([]);
  const [categoryServiceId, setCategoryServiceId] = useState();

  const [serviceIds, setServiceIds] = useState([]);
  const [isSubmitFormService, setIsSubmitFormService] = useState(false);

  const [serviceId, setServiceId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [searchCategory, setSearchCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState();

  console.log("list: ", listCategory);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(listAllCategoryAPI);
      setCategoryServiceId(res.data[0].categoryServiceId);
      setOriginData(res.data);
      setCategoryId(listCategory[0]?.categoryServiceId);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategory();
  }, [isAddCategory, isUpdateCategory]);

  useEffect(() => {
    if (originData.length) {
      setCategoryServiceIds(
        originData.filter(
          (item) =>
            item?.categoryServiceName
              .toUpperCase()
              .indexOf(searchCategory.toUpperCase()) !== -1
        )
      );
    }
  }, [searchCategory, originData]);

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
    if (categoryServiceId) loadServiceByCategoryId(categoryServiceId);
  }, [categoryServiceId, isSubmitFormService]);

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
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ maxWidth: 250, minWidth: 250 }}>
          <FormControl fullWidth>
            <InputLabel id="material">Category</InputLabel>
            <Select
              style={{
                padding: "25px 0",
                paddingRight: "10px",
                width: "100%",
              }}
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
      </div> */}
      <Box className="flex gap-3">
        <div>
          <Box className="bg-white p-4 rounded-lg shadow-md mb-3">
            <InputDentist
              id="labo"
              label="Tìm Dịch Vụ"
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value);
              }}
            />
          </Box>
          <Box className="bg-white py-4 rounded-lg shadow-md overflow-y-scroll max-h-[610px]">
            <p className="font-bold text-center">
              Có ( {categoryServiceIds.length} ) kết quả
            </p>
            <div className="flex flex-col gap-2 px-3">
              {categoryServiceIds.map((item, index) => (
                <Box
                  className={`whitespace-nowrap p-2 rounded-md cursor-pointer hover:bg-slate-100 ${
                    categoryServiceId === item.categoryServiceId &&
                    "bg-sky-100 text-sky-600"
                  }`}
                  onClick={() => {
                    setCategoryServiceId(item.categoryServiceId)
                  }}
                >
                  {item.categoryServiceName}
                </Box>
              ))}
            </div>
          </Box>
        </div>
        <Box className="w-full text-center">
          <div className="flex gap-3 justify-end mb-3">
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setModalUpdateOpen(true);
                dispatch(setCategoryServicedId(categoryServiceId));
              }}
            >
              <span className="leading-none">Cập nhật loại dịch vụ</span>
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setModalAddServiceOpen(true);
              }}
            >
              <span className="leading-none">Thêm mới Dịch vụ</span>
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => {
                setModalDeleteOpen(true);
              }}
            >
              <span className="leading-none">Xóa labo</span>
            </Button>
          </div>
          <StyledTable className="shadow-md text-center" size="small">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Dịch vụ
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Đơn vị
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Giá trên thị trường
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Giá tại nha khoa Nguyễn Trần
                </StyledTableCell>
                <StyledTableCell />
                <StyledTableCell />
              </StyledTableRow>
            </TableHead>
            <TableBody size="medium">
              {serviceIds?.map((item, index) => (
                <StyledTableRow
                  style={{ textAlign: "center" }}
                  key={item.serviceId}
                  size="medium"
                >
                  <StyledTableCell size="medium">
                    {item.serviceName}
                  </StyledTableCell>
                  <StyledTableCell>{item.unit}</StyledTableCell>
                  <StyledTableCell>{item.marketPrice}</StyledTableCell>
                  <StyledTableCell>{item.price}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setModalUpdateServiceOpen(true);
                        dispatch(setServicedId(item.serviceId));
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
                        dispatch(setServicedId(item.serviceId));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Box>
      </Box>

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
          isSubmitForm={setIsSubmitFormService}
        />
      </div>
      <div>
        <ModalDeleteService
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
          isSubmitForm={setIsSubmitFormService}
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
          isSubmitForm={setIsSubmitFormService}
        />
      </div>
    </>
  );
};

export default ServiceAndCategoryManagementContent;
