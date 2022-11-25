import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../component/Admin/LoginComponent/Login";
import ForgotPassword from "../component/ForgotPassComponent/ForgotPassword";
import AccountManagement from "../component/Admin/AccountManagementComponent/AccountManagement"
import HomePage from "../component/HomeComponent/Home";
import WaitingRoomManagement from "../component/Admin/WaitingRoomManagementComponent/WaitingRoomManagement";
import Sidebar from "../component/Admin/SidebarComponent/Sidebar";
import Dashboard from "../component/Admin/Dashboard/Dashboard";
import DashboardContent from "../component/Admin/Dashboard/Dashboard";
import PatientManagement from "../component/Admin/PatientManagementComponent/PatientManagement";
import LaboManagement from "../component/Admin/LaboComponent/LaboManagement";
import MaterialManagement from "../component/Admin/MaterialManagementComponent/MaterialManagement";
import MaterialImportManagement from "../component/Admin/MaterialManagementComponent/MaterialImportManagement";

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
                <Route path='/materialmanagement' element={<MaterialManagement />} />
                <Route path='/materialimport' element={<MaterialImportManagement />} />
                
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<>404 Error</>} />
            </Routes>
        </Router>

    )
}

export default Routing;