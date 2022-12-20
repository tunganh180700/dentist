import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import ScheduleManagementContent from './ScheduleManagementContent';

const ScheduleManagement = () => {
    return (
        <>
            <Dashboard component={<ScheduleManagementContent />} />
        </>
    )
}

export default ScheduleManagement;