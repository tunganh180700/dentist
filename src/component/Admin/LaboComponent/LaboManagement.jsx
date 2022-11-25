import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import LaboManagementContent from './LaboManagementContent';

const LaboManagement = () => {
    return (
        <>
            <Dashboard component={<LaboManagementContent />} />
        </>
    )
}

export default LaboManagement;