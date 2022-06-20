import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "cart",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = false
        },
        loginFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        resetError: (state) => {
            state.error = false
        },
        logout: (state) => {
            state.currentUser = null
        },

    }
})
export const { logout, loginStart, loginSuccess, loginFailure, resetError} = userSlice.actions
export default userSlice.reducer