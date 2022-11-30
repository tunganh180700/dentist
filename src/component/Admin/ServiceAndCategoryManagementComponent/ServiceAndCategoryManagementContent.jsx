import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryServiceId} from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { listServiceByCategoryIdAPI } from '../../../config/baseAPI';
import axiosInstance from '../../../config/customAxios';
import { fetchAllCategory } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
// import ModalUpdateMaterialImport from '../../ModalComponent/ModalMaterial/ModalUpdateMaterialImport';
import ModalDeleteService from '../../ModalComponent/ModalService/ModalDeleteService';
import ModalAddCategory from '../../ModalComponent/ModalCategory/ModalAddCategory';
import ModalAddService from '../../ModalComponent/ModalService/ModalAddService';
import { setServicedId } from '../../../redux/modalSlice';

const ServiceAndCategoryManagementContent = () => {

    const listCategory = useSelector(state => state.listCategory.listCategory)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.pageSize)
    const totalPages = useSelector(state => state.totalPage)
    const [currentPage, setCurrentPage] = useState(0);

    // const isUpdateMaterialImport = useSelector(state => state.listMaterialImport.isUpdateMaterialImport);
    const isDeleteService = useSelector(state => state.listCategory.isDeleteService);
    const isAddCategory = useSelector(state => state.listCategory.isAddCategory);
    const isAddService = useSelector(state => state.listCategory.isAddService);

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [takeCategoryId, setTakeCategoryId] = useState();
    const id = useSelector(state => state.listCategory.id);
    const [loading, setLoading] = useState();


    const [categoryServiceIds, setCategoryServiceIds] = useState([]);
    const [categoryServiceId, setCategoryServiceId] = useState();

    const [serviceIds, setServiceIds] = useState([]);
    const [serviceId, setServiceId] = useState();
    console.log('list: ', listCategory)
    useEffect(() => {
        dispatch(fetchAllCategory({
            size: pageSize,
            page: currentPage,
        },
        ));

    }, [currentPage, isAddCategory, isDeleteService, isAddService])

    const loadCategory = async () => {
        try {
            setCategoryServiceId(listCategory[0].id)
            setCategoryServiceIds(listCategory)
            console.log("checkCate", listCategory);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadCategory();
    }, [])


    const loadServiceByCategoryId = async (categoryServiceId) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                listServiceByCategoryIdAPI + categoryServiceId,
            )
            setServiceId(res.data.categoryServiceId)
            setServiceIds(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (categoryServiceId > 0)
            loadServiceByCategoryId(categoryServiceId)
    }, [categoryServiceId])

    useEffect(() => {
        const category = categoryServiceIds?.filter(e =>  e.takeCategoryId === categoryServiceId)[0]
    })

    // console.log('haha', listServiceAndCategory)
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
            >
                Quản lý bảng giá dịch vụ nha khoa
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><Box sx={{ maxWidth: 250, minWidth: 250 }}>
                <FormControl fullWidth>
                    <InputLabel id="material">Category</InputLabel>
                    <Select
                        labelId="material"
                        id="materialSelect"
                        label="Vật liệu"
                        value={categoryServiceId}
                        onChange={(e) => setCategoryServiceId(e.target.value)}
                    >
                        <div> <IconButton aria-label="add" style={{ borderRadius: '5%' }} onClick={() => {
                            setModalAddOpen(true)
                        }}>
                            <AddIcon />Thêm loại dịch vụ
                        </IconButton>
                        </div>

                        {categoryServiceIds?.map(item => (
                            <MenuItem selected={categoryServiceId} key={item.categoryServiceId} value={item.categoryServiceId}>{item.categoryServiceName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
                <div>
                    <IconButton aria-label="add" style={{ borderRadius: '5%' }} onClick={() => {
                        setModalAddOpen(true)
                    }}>
                        <AddIcon />Thêm mới Dịch vụ
                    </IconButton>
                    <IconButton aria-label="edit-service" style={{ borderRadius: '5%' }} >
                        <DesignServicesIcon />Cập nhật loại dịch vụ
                    </IconButton>


                </div>
            </div>

            <Table size="small" style={{ marginTop: "15px", textAlign: 'center' }}>
                <TableHead>
                    <TableRow >
                        <TableCell>Dịch vụ</TableCell>
                        <TableCell>Đơn vị</TableCell>
                        <TableCell>Giá trên thị trường</TableCell>
                        <TableCell>Giá tại nha khoa Nguyễn Trần</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody size="medium">
                    {serviceIds?.map((item, index) =>
                        <TableRow style={{ textAlign: 'center' }} key={item.serviceId} size="medium">
                            <TableCell size="medium" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.serviceName}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.marketPrice}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => {
                                    setModalDeleteOpen(true)
                                    dispatch(setServicedId(item.serviceId))
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* <div>
                <ModalUpdateMaterialImport modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div> */}
            <div>
                <ModalDeleteService modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalAddCategory modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>

            <div>
                <ModalAddService modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div>

        </>
    )
}

export default ServiceAndCategoryManagementContent;