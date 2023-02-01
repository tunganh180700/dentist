import React, { useState } from 'react';
import HeaderAdmin from '../HeaderComponent/HeaderAdmin';
import Dashboard from '../Dashboard/Dashboard';
import ProfileManagementContent from './ProfileManagementContent';

const ProfileManagement = () => {
    return (
        <>
            <Dashboard component={<ProfileManagementContent />} />
        </>
    )
}

export default ProfileManagement;