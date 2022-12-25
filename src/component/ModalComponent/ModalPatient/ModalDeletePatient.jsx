import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import "./../style.css";
import { deletePatient } from "../../../redux/PatienSlice/listPatientSlice";
import { fetchPatient } from "../../../redux/PatienSlice/choosenPatientSlice";

const ModalDeletePatient = ({
  modalDeleteOpen,
  setModalDeleteOpen,
  isSubmitForm,
}) => {
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.modal.userId);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isOpenDeletePatient = useSelector(
    (state) => state.modal.isOpenDeletePatient
  );
  const [modalText, setModalText] = useState(
    "Bạn có chắc chắn muốn xóa không ?"
  );

  const handleOk = () => {
    setModalText("Đang xóa bệnh nhân");
    handleDelete(patientId);
    setConfirmLoading(true);
    setTimeout(() => {
      setModalDeleteOpen(false);
      setConfirmLoading(false);
      isSubmitForm(true);
    }, 2000);
  };

  const handleCancel = () => {
    setModalDeleteOpen(false);
  };

  const handleDelete = (patientId) => {
    dispatch(deletePatient(patientId));
  };

  useEffect(() => {
    if (patientId > 0 && modalDeleteOpen) {
      dispatch(fetchPatient(patientId));
      isSubmitForm(false);
    }
  }, [isOpenDeletePatient]);

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
  );
};
export default ModalDeletePatient;
