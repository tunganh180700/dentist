import React, { useState } from 'react';
import HeaderAdmin from '../HeaderComponent/HeaderAdmin';
import Dashboard from '../Dashboard/Dashboard';
import AccountManagementContent from './AccountManagementContent';

const AccountManagement = () => {
    return (
        <>
            <Dashboard component={<AccountManagementContent />} />
        </>
    )
}

export default AccountManagement;