import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import IncomeManagementContent from './IncomeManagementContent';

const IncomeManagement = () => {
    return (
        <>
            <Dashboard component={<IncomeManagementContent />} />
        </>
    )
}

export default IncomeManagement;