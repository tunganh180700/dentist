import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../component/Admin/LoginComponent/Login";
import ForgotPassword from "../component/ForgotPassComponent/ForgotPassword";
import AccountManagementContent from "../component/Admin/AccountManagementComponent/AccountManagementContent"
import HomePage from "../component/HomeComponent/Home";
import WaitingRoomManagementContent from "../component/Admin/WaitingRoomManagementComponent/WaitingRoomManagementContent";
import Sidebar from "../component/Admin/SidebarComponent/Sidebar";
import Dashboard from "../component/Admin/Dashboard/Dashboard";

const Routing = () => {
    return (
        <Dashboard title="Dashboard" component={
            <Router>
                <Routes>
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/forgot' element={<ForgotPassword />} />
                    <Route path='/accmanagement' element={<AccountManagementContent />} />
                    <Route path='/meetingroom' element={<WaitingRoomManagementContent />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='*' element={<>404 Error</>} />
                </Routes>
            </Router>
        } />
    )
}

export default Routing;