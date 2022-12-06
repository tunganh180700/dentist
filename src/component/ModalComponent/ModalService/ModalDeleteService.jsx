import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'antd';
import './../style.css';
import { deleteService } from '../../../redux/ServiceAndCategorySlice/listCategorySlice';
import { fetchService } from '../../../redux/ServiceAndCategorySlice/choosenServiceSlice'

const ModalDeleteService = ({ modalDeleteOpen, setModalDeleteOpen }) => {
    const dispatch = useDispatch();
    const serviceId = useSelector(state => state.modal.serviceId);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const isOpenDeleteService = useSelector(state => state.modal.isOpenDeleteService)
    const [modalText, setModalText] = useState('Bạn có chắc chắn muốn xóa không ?');

    console.log('serviceIDL :',serviceId)
    const handleOk = () => {
        setModalText('Bạn chắc chắn muốn xóa không ?');
        handleDelete(serviceId);
        setConfirmLoading(true);
        setTimeout(() => {
            setModalDeleteOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        setModalDeleteOpen(false);
    };

    const handleDelete = (serviceId) => {
        dispatch(deleteService(serviceId))
    }

    useEffect(() => {
        if (serviceId > 0 && modalDeleteOpen) {
            dispatch(fetchService(serviceId))
        }
    }, [isOpenDeleteService])

    return (
        <>
            <Modal
                title="Thông báo"
                open={modalDeleteOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    )
}
export default ModalDeleteService