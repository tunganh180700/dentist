import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Dashboard from '../Dashboard/Dashboard';
import WaitingRoomManagementContent from './WaitingRoomManagementContent';

const WaitingRoomManagement = () => {
    return (
        <>
            <Dashboard title="Dashboard" component={<WaitingRoomManagementContent />} />
        </>
    )
}

export default WaitingRoomManagement;