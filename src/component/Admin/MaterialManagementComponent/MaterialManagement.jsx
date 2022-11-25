import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import MaterialManagementContent from './MaterialManagementContent';

const MaterialManagement = () => {
    return (
        <>
            <Dashboard component={<MaterialManagementContent />} />
        </>
    )
}

export default MaterialManagement;