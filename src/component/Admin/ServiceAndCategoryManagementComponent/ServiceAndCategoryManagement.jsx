import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import ServiceAndCategoryManagementContent from './ServiceAndCategoryManagementContent';

const ServiceAndCategoryManagement = () => {
    return (
        <>
            <Dashboard component={<ServiceAndCategoryManagementContent />} />
        </>
    )
}

export default ServiceAndCategoryManagement;