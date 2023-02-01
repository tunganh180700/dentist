import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import BillManagementContent from './BillManagementContent';

const BillManagement = () => {
    return (
        <>
            <Dashboard component={<BillManagementContent />} />
        </>
    )
}

export default BillManagement;