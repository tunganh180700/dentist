import React from "react";
import * as yup from "yup";

const ValidatedLoginForm = yup.object({
    username: yup
        .string("Enter username")
        .required("Username is required"),
    password: yup
        .string("Enter password")
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
});

export default ValidatedLoginForm;