import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../component/Admin/LoginComponent/Login";
import ForgotPassword from "../component/ForgotPassComponent/ForgotPassword";
import AccountManagement from "../component/Admin/AccountManagementComponent/AccountManagement"
import HomePage from "../component/HomeComponent/Home";
import WaitingRoomManagement from "../component/Admin/WaitingRoomManagementComponent/WaitingRoomManagement";
import PatientManagement from "../component/Admin/PatientManagementComponent/PatientManagement";
import RecordManagement from "../component/Admin/RecordComponent/RecordManagement";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
    return (
        // <Dashboard title="Dashboard" component={  } />
        <Router>
            <Routes>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/accmanagement' element={<AccountManagement />} />
                <Route path='/meetingroom' element={<WaitingRoomManagement />} />
                <Route path='/patient-management' element={<PatientManagement />} />
                <Route path='/record/:id' element={<RecordManagement />} />
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<>404 Error</>} />
            </Routes>
        </Router>

    )
}

export default Routing;