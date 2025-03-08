import {create} from 'zustand';
import axios from 'axios';
import { isAbaRouting } from 'validator';


// const BASE_URL= https://authentication-yacw.onrender.com/"http://127.0.0.1:8000/api/v1"
const BASE_URL=import.meta.env.MODE==='development'?"http://127.0.0.1:8000/api/v1":"/api/v1"
axios.defaults.withCredentials=true

export const userStore = create((set)=>({
    isAuthenticated:false,
    error:null,
    loading:false,
    user:null,
    isVerifyAuth:true,
    message:null,

    //Registration
    register:async(name, email,password)=>{
        set({loading:true,error:null});
        try{
            const response= await axios.post(`${BASE_URL}/register`,{name, email, password});
            // console.log('Registration successful', response.data);
            set({
                user:response.data.user,
                isAuthenticated:true,
                loading:false,
                error:null,
                message:response.data.message
            })
            

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage,
                isAuthenticated:false,
            })
            throw errorMessage

        }
    },

    //Verify Email
    verifyEmail:async(code)=>{
        set({loading:true, error:null});
        try{
            const response= await axios.post(`${BASE_URL}/verifyEmail`,{code});
            const successMessage=response.data.message
            set({
                loading:false,
                user:response.data.user,
                message:successMessage,
                error:null,
                isAuthenticated:true
            })
            return successMessage

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage,
                isAuthenticated:false,
            })
            throw errorMessage

        }

    },

    //verify Auth
    verifyAuth:async()=>{
        set({isVerifyAuth:true,error:null});
        try{
            const response=await axios.get(`${BASE_URL}/verifyAuth`);
            set({
                user:response.data.user,
                isAuthenticated:true,
                isVerifyAuth:false
            })

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage,
                isAuthenticated:false,
            })
            throw errorMessage

        }
    },

    //lOGOUT
    logout:async()=>{
        set({loading:true,error:null});
        try{
            const response=await axios.post(`${BASE_URL}/logout`);
            const successMessage=response.data.message
            set({
                loading:false,
                message:successMessage,
                isAuthenticated:false,
                error:null,
                user:null
            })
            return successMessage;

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage,
                isAuthenticated:false,
                user:null
            })
            throw errorMessage

        }

    },

    //Login
    login: async(email, password)=>{
        set({loading:true,error:null, message:null});
        
        try{
            const response= await axios.post(`${BASE_URL}/login`,{email, password});
            // console.log('Registration successful', response.data);
            const loginMessage= response.data.message
            set({
                user:response.data.user,
                isAuthenticated:true,
                loading:false,
                error:null,
                message:loginMessage
            })
            return loginMessage
            

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage,
                isAuthenticated:false,
            })
            throw errorMessage

        }

    },

    //Forgot Password
    forgotPassword: async(email)=>{
        set({loading:true,error:null, message:null});
        
        try{
            const response= await axios.post(`${BASE_URL}/forgotPassword`,{email});
            // console.log('Registration successful', response.data);
            const successMessage= response.data.message
            set({
                loading:false,
                error:null,
                message:successMessage
            })
            return successMessage
            

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage
            })
            throw errorMessage

        }

    },

    //Reset Password
    resetPassword: async(token, password)=>{
        set({loading:true,error:null, message:null});
        
        try{
            const response= await axios.post(`${BASE_URL}/resetPassword/${token}`,{token, password});
            // console.log('Registration successful', response.data);
            const successMessage= response.data.message
            set({
                loading:false,
                error:null,
                message:successMessage
            })
            return successMessage
            

        }catch(err){
            const errorMessage= err.response?.data?.message || "An error occurred"
            set({
                loading:false,
                error:errorMessage
            })
            throw errorMessage

        }

    }


}))