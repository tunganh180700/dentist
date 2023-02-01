import Dashboard from '../Dashboard/Dashboard';
import React from 'react';
import SpecimenManagementContent from './SpecimenManagementContent';

const SpecimenManagement = () => {
    return (
        <>
            <Dashboard component={<SpecimenManagementContent />} />
        </>
    )
}

export default SpecimenManagement;