import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser=createAsyncThunk(
    'auth/register',
    async ({name,email,password},{rejectWithValue})=>{
        try {
            const config={
                headers:{
                    'Content-Type': 'application/json',
                }
            }
            let data=await axios.post(`${process.env.REACT_APP_API_URL}/user/register`,{name,email,password},config)
            console.log(data);
            localStorage.setItem('token',data.data.token)           
            return data.data;
            
        } catch (error) {
            
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

export const loginUser=createAsyncThunk(
    'auth/login',
    async({email,password},{rejectWithValue})=>{
        try {
            const config={
                headers:{
                    'Content-Type': 'application/json',
                }
            }
            const response=await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,{email,password},config)
            console.log(response);
            
            localStorage.setItem("token", response.data.token)
            return response.data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

export const verifyUser=createAsyncThunk(
    'auth/verify',
    async(temp,{rejectWithValue,getState})=>{
        try {
            const state=getState()
            const token=state.auth.userToken;
            const config={
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${token}`
                }
            }
            const response=await axios.get(`${process.env.REACT_APP_API_URL}/user/verify`,config)
            
            return response.data
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)