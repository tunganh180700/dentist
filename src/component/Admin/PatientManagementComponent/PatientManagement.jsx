import Dashboard from '../Dashboard/Dashboard';
import React from 'react';
import PatientManagementContent from './PatientManagementContent';

const PatientManagement = () => {
    return (
        <>
            <Dashboard component={<PatientManagementContent />} />
        </>
    )
}

export default PatientManagement;