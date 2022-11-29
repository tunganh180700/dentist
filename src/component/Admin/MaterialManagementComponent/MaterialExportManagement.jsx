import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import MaterialExportManagementContent from './MaterialExportManagementContent';

const MaterialExportManagement = () => {
    return (
        <>
            <Dashboard component={<MaterialExportManagementContent />} />
        </>
    )
}

export default MaterialExportManagement;