import Dashboard from '../Dashboard/Dashboard';
import React from 'react';
import RecordManagementContent from './RecordManagementContent';

const RecordManagement = () => {
    return (
        <>
            <Dashboard component={<RecordManagementContent />} />
        </>
    )
}

export default RecordManagement