import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

const ModalUpdateAccount = ({ modalUpdateOpen, setModalUpdateOpen }) => {
    // const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

    return (
        <>
            <Modal
                title="20px to Top"
                open={modalUpdateOpen}
                onOk={() => setModalUpdateOpen(false)}
                onCancel={() => setModalUpdateOpen(false)}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    )
}

export default ModalUpdateAccount