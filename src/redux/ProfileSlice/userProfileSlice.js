import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { add } from "lodash"
import { profileAPI } from "../../config/baseAPI"
import axiosInstance from "../../config/customAxios"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    userProfile: {},
    status: false,
    statusUserProfile: false,
    fullName: '',
    roleName: '',
    birthdate: '',
    phone: '',
    email: '',


}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
                state.fullName = action.payload.fullName;
                state.birthdate = action.payload.birthdate;
                state.phone = action.payload.phone;
                state.email = action.payload.email;
                state.roleName = action.payload.role.roleName;

                state.status = false
            })


    }
})

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async() => {
    try {
        const res = await axiosInstance.get(
            profileAPI
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})



export const {setUserProfile} = userProfileSlice.actions;
export default userProfileSlice.reducer;