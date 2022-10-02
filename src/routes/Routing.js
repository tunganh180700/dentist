import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "../component/LoginComponent/Login";
import ForgotPassword from "../component/ForgotPassComponent/ForgotPassword";
import HomePage from "../component/HomeComponent/Home";

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<>404 Error</>} />
            </Routes>
        </Router>
    )
}

export default Routing;