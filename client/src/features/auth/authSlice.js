import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, verifyUser } from './authActions'
const userToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null

const initialState = {
    loading: false,
    userInfo: {},
    userToken:userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.loading = false;
            state.userInfo = {}
            state.userToken = null;
            state.error = null
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.userInfo = payload.userInfo
            state.userToken = payload.token
        })
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload.user
            state.userToken = payload.token
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(verifyUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(verifyUser.fulfilled,(state,{payload})=>{
            state.loading=false
            state.success=true            
            state.userInfo=payload.userInfo
        })
        builder.addCase(verifyUser.rejected,(state,{payload})=>{
            state.loading=false
            state.success=false
            state.error=payload.error
        })
    },
})
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer