import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import MaterialImportManagementContent from './MaterialImportManagementContent';

const MaterialImportManagement = () => {
    return (
        <>
            <Dashboard component={<MaterialImportManagementContent />} />
        </>
    )
}

export default MaterialImportManagement;