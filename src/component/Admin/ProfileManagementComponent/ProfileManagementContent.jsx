import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Typography, IconButton, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchUserProfile } from "../../../redux/ProfileSlice/userProfileSlice";

import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { LinkOff } from '@mui/icons-material';
import { setFullName, updateAccount } from '../../../redux/AccountSlice/listAccountSlice';
import { useFormik } from 'formik';
import { async } from 'q';
import axiosInstance from '../../../config/customAxios';
import { profileAPI } from '../../../config/baseAPI';
import moment from 'moment';
import { validationDate } from '../../../config/validation';

const ProfileManagementContent = () => {
    const dispatch = useDispatch();
    const fullName = useSelector(state => state.userProfile.fullName)
    const roleName = useSelector(state => state.userProfile.roleName)
    const birthdate = useSelector(state => state.userProfile.birthdate)
    const phone = useSelector(state => state.userProfile.phone)
    const email = useSelector(state => state.userProfile.email)
    const salary = useSelector(state => state.userProfile.salary)
    const userName = useSelector(state => state.userProfile.userName)
    const isUpdateAccount = useSelector(state => state.userProfile.isUpdateAccount);

    const [loading, setLoading] = useState();
    const [value, setValue] = useState(null);

    const [isEdit, setEdit] = useState(false);
    const [isEditPhone, setEditPhone] = useState(false);
    const [isEditBirthdate, setEditBirthdate] = useState(false);
    const [isEditEmail, setEditEmail] = useState(false);


    console.log(isUpdateAccount)
    const styleAttribute = {
        textAlign: 'left'
    }

    const styleData = {
        marginLeft: '275px'
    }

    const handleEdit = () => {
        setEdit(!isEdit)
    }

    const handleEditPhone = () => {
        setEditPhone(!isEditPhone)
    }

    const handleEditBirhtdate = () => {
        setEditBirthdate(!isEditBirthdate)
    }

    const handleEditEmail = () => {
        setEditEmail(!isEditEmail)
    }

    useEffect(() => {
        try {
            dispatch(fetchUserProf)
        } catch (error) {
            console.log(error)
        }
    }, [isUpdateAccount])

    const fetchUserProf = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(
                profileAPI,
            )
            console.log(res.data)
            formik.setValues(res.data)
            setValue(res.data.birthdate)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {

        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {

            // values.birthdate = moment(value.$d).format(validationDate);
            dispatch(updateAccount(values));
            console.log(values.birthdate)
            setEditPhone(false)
            setEditBirthdate(false)
            setEditEmail(false)
        }
    })
    return (
        <>
            <Typography component="h1" variant="h5" color="inherit" noWrap>
                Hồ sơ
            </Typography>
            <div className='container' style={{ display: 'flex', marginTop: '50px' }}>
                <div className='attribute' style={styleAttribute}>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Tên:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Ngày sinh:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Số điện thoại:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Email:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Quyền hạn:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Lương:
                    </Typography>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Tên tài khoản:
                    </Typography>                </div>
                {loading === false && <>
                    <div className='data' style={styleData}>
                        {isEdit ? (
                            <input
                                value={formik.values.fullName}
                                name="fullName"
                                onChange={formik.handleChange}
                            />
                        ) : (
                            <>
                                <Typography component="h1" variant="h5" color="inherit" noWrap>
                                    {formik.values.fullName}
                                </Typography>
                            </>
                        )}

                        {isEditBirthdate ? (
                            <input
                                value={formik.values.birthdate}
                                name="birthdate"
                                onChange={formik.handleChange}
                            />
                        ) : (
                            <>
                                <Typography component="h1" variant="h5" color="inherit" noWrap>
                                    {formik.values.birthdate}
                                </Typography>
                            </>
                        )}


                        {isEditPhone ? (
                            <input
                                value={formik.values.phone}
                                name="phone"
                                onChange={formik.handleChange}
                            />
                        ) : (
                            <Typography component="h1" variant="h5" color="inherit" noWrap>
                                {formik.values.phone}
                            </Typography>
                        )}

                        {isEditEmail ? (
                            <input
                                value={formik.values.email}
                                name="email"
                                onChange={formik.handleChange}
                            />
                        ) : (
                            <Typography component="h1" variant="h5" color="inherit" noWrap>
                                {formik.values.email}
                            </Typography>
                        )}

                        <Typography component="h1" variant="h5" color="inherit" noWrap>
                            {roleName}
                        </Typography>

                        <Typography component="h1" variant="h5" color="inherit" noWrap>
                            {salary}
                        </Typography>

                        <Typography component="h1" variant="h5" color="inherit" noWrap>
                            {userName}
                        </Typography>
                    </div>
                </>}

                <div className='edit' style={styleData}>
                    {!isEdit ? (
                        <Link onClick={handleEdit}>
                            <ListItemText style={{ color: "black" }} primary='Sửa' />
                        </Link>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <Link onClick={formik.handleSubmit}>
                                <ListItemText style={{ color: "black" }} primary='Lưu' />
                            </Link>
                            <Link marginLeft='20px' onClick={handleEdit}>
                                <ListItemText style={{ color: "black" }} primary='Hủy' />
                            </Link>
                        </div>
                    )}

                    {!isEditBirthdate ? (
                        <Link onClick={handleEditBirhtdate}>
                            <ListItemText style={{ color: "black" }} primary='Sửa' />
                        </Link>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <Link onClick={formik.handleSubmit}>
                                <ListItemText style={{ color: "black" }} primary='Lưu' />
                            </Link>
                            <Link marginLeft='20px' onClick={handleEditBirhtdate}>
                                <ListItemText style={{ color: "black" }} primary='Hủy' />
                            </Link>
                        </div>
                    )}

                    {!isEditPhone ? (
                        <Link onClick={handleEditPhone}>
                            <ListItemText style={{ color: "black" }} primary='Sửa' />
                        </Link>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <Link onClick={formik.handleSubmit}>
                                <ListItemText style={{ color: "black" }} primary='Lưu' />
                            </Link>
                            <Link marginLeft='20px' onClick={handleEditPhone}>
                                <ListItemText style={{ color: "black" }} primary='Hủy' />
                            </Link>
                        </div>
                    )}
                    {!isEditEmail ? (
                        <Link onClick={handleEditEmail}>
                            <ListItemText style={{ color: "black" }} primary='Sửa' />
                        </Link>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <Link onClick={formik.handleSubmit}>
                                <ListItemText style={{ color: "black" }} primary='Lưu' />
                            </Link>
                            <Link marginLeft='20px' onClick={handleEditEmail}>
                                <ListItemText style={{ color: "black" }} primary='Hủy' />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileManagementContent;
