import React from "react";
import { Formik } from "formik";

const ValidatedLoginForm = () => {
    <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Log in", values);
                setSubmitting(false);
            }, 500);
        }}
    >

    </Formik>
}