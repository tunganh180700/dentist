import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../component/Admin/LoginComponent/Login";
import ForgotPassword from "../component/ForgotPassComponent/ForgotPassword";
import AccountManagement from "../component/Admin/AccountManagementComponent/AccountManagement"
import HomePage from "../component/HomeComponent/Home";
import WaitingRoomManagement from "../component/Admin/WaitingRoomManagementComponent/WaitingRoomManagement";
import PatientManagement from "../component/Admin/PatientManagementComponent/PatientManagement";
import LaboManagement from "../component/Admin/LaboComponent/LaboManagement";

import TimekeepingManagement from "../component/Admin/TimekeepingManagementComponet/TimekeepingManagement";

import MaterialManagement from "../component/Admin/MaterialManagementComponent/MaterialManagement";
import MaterialImportManagement from "../component/Admin/MaterialManagementComponent/MaterialImportManagement";
import MaterialExportManagement from "../component/Admin/MaterialManagementComponent/MaterialExportManagement";
import ServiceAndCategoryManagement from "../component/Admin/ServiceAndCategoryManagementComponent/ServiceAndCategoryManagement";
import IncomeManagement from "../component/Admin/IncomeManagementComponent/IncomeManagement";
import RecordManagement from "../component/Admin/RecordComponent/RecordManagement";
import BillManagement from "../component/Admin/BillManagementComponent/BillManagement";
import ProfileManagement from "../component/Admin/ProfileManagementComponent/ProfileManagement";

const Routing = () => {
    return (
        // <Dashboard title="Dashboard" component={  } />
        <Router>
            <Routes>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/accmanagement' element={<AccountManagement />} />
                <Route path='/labo' element={<LaboManagement />} />
                <Route path='/meetingroom' element={<WaitingRoomManagement />} />
                <Route path='/patient-management' element={<PatientManagement />} />
                <Route path='/timekeeping' element={<TimekeepingManagement />} />
                <Route path='/record/:id' element={<RecordManagement />} />
                <Route path='/materialmanagement' element={<MaterialManagement />} />
                <Route path='/materialimport' element={<MaterialImportManagement />} />
                <Route path='/materialexport' element={<MaterialExportManagement />} />
                <Route path='/serviceandcategory' element={<ServiceAndCategoryManagement />} />
                <Route path='/income' element={<IncomeManagement />} />
                <Route path='/bill' element={<BillManagement />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/profile' element={<ProfileManagement />} />
                <Route path='*' element={<>404 Error</>} />
            </Routes>
        </Router>

    )
}

export default Routing;