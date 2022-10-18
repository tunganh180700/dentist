import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOpenUpdateUser: false,
    userId: 0,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initState,
    reducers: {
        setIsOpenUpdateUser: (state, action) => {
            state.isOpenUpdateUser = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    }
})
export const { setUserId } = modalSlice.actions;
export default modalSlice.reducer;