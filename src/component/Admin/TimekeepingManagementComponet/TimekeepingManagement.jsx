import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import TimekeepingManagementContent from './TimekeepingManagementContent';

const TimekeepingManagement = () => {
    return (
        <>
            <Dashboard component={<TimekeepingManagementContent />} />
        </>
    )
}

export default TimekeepingManagement