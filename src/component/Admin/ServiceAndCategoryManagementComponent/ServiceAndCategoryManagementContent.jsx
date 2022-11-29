import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryServiceId } from '../../../redux/modalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { fetchAllServiceAndCategory } from '../../../redux/ServiceAndCategorySlice/listServiceAndCategorySlice';
// import ModalUpdateMaterialImport from '../../ModalComponent/ModalMaterial/ModalUpdateMaterialImport';
// import ModalDeleteMaterialImport from '../../ModalComponent/ModalMaterial/ModalDeleteMaterialImport';
// import ModalAddMaterialImport from '../../ModalComponent/ModalMaterial/ModalAddMaterialImport';

const ServiceAndCategoryManagementContent = () => {

    const listServiceAndCategory = useSelector(state => state.listServiceAndCategory.listServiceAndCategory)
    const dispatch = useDispatch()
    const pageSize = useSelector(state => state.listServiceAndCategory.pageSize)
    const totalPages = useSelector(state => state.listServiceAndCategory.totalPage)
    const [currentPage, setCurrentPage] = useState(0);
    // const listServiceDTO = useSelector(state => state.listServiceAndCategory.serviceDTOS)
    // const userId = useSelector(state=>state.modal.userId);
    // const isUpdateMaterialImport = useSelector(state => state.listMaterialImport.isUpdateMaterialImport);
    // const isDeleteMaterialImport = useSelector(state => state.listMaterialImport.isDeleteMaterialImport);
    // const isAddMaterialImport = useSelector(state => state.listMaterialImport.isAddMaterialImport);

    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    // const [modalAddOpen, setModalAddOpen] = useState(false);


    // console.log('list: ', listServiceDTO)

    useEffect(() => {
        dispatch(fetchAllServiceAndCategory({
            size: pageSize,
            page: currentPage

        },
        ));

    }, [currentPage])


    console.log('haha', listServiceAndCategory)
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

            <Table size="small" style={{ marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Dịch vụ</TableCell>
                        <TableCell>Đơn vị</TableCell>
                        <TableCell>Giá trên thị trường</TableCell>
                        <TableCell>Giá tại nha khoa Nguyễn Trần</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listServiceAndCategory.map((item, index) =>
                        <TableRow key={item.categoryServiceId}>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }} colSpan={6} align="center" size='medium'>
                                {item.categoryServiceName} 
                            </TableCell>
                           
                        </TableRow>

                    )}

                    {/* {listServiceAndCategory.map((item, index) => {if(item.serviceDTOS.categoryServiceId == listServiceAndCategory.categoryServiceId){
                        <TableRow key={item.serviceDTOS.serviceId}>
                            <TableCell>{item.serviceDTOS.serviceName}</TableCell>
                            <TableCell>{item.serviceDTOS.unit}</TableCell>
                            <TableCell>{item.serviceDTOS.marketPrice}</TableCell>
                            <TableCell>{item.serviceDTOS.price}</TableCell>
                        </TableRow>
                    }}
                        
                    )} */}


                </TableBody>
            </Table>

            {/* <div>
                <ModalUpdateMaterialImport modalUpdateOpen={modalUpdateOpen} setModalUpdateOpen={setModalUpdateOpen} />
            </div>
            <div>
                <ModalDeleteMaterialImport modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} />
            </div>
            <div>
                <ModalAddMaterialImport modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} />
            </div> */}

        </>
    )
}

export default ServiceAndCategoryManagementContent;