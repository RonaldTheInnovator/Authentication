import React, { useState } from "react";
import '../styles/ResetPassword.css';
import Input from "../components/input";
import { Key, Loader, Lock, Mail, User} from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
    const [formData,setFormData]=useState
            ({
            password:"",
            confirmPassword:""
            })
            const navigate = useNavigate()
            const {token } = useParams()
            const {resetPassword, loading}= userStore()
            const handleChange=(e)=>{
                const {name, value} = e.target;
                setFormData({
                    ...formData,
                    [name]:value
                })}
             const handleSubmit=async(e)=>{
                    e.preventDefault();
                    // console.log("Password Data",formData) 
                    if(formData.password !== formData.confirmPassword){
                        toast.error("Password do not match",{
                        position:'top-center',
                        autoClose: 3000
                                          });
                    }

                    try{
                        const response=await resetPassword(token, formData.password);
                         toast.success(response,{
                         position:'top-center',
                         autoClose: 3000
                         });
                         navigate("/login");

                    }catch(err){
                        toast.error(err,{
                         position:'top-center',
                         autoClose: 3000
                          });
                    }
                }


  return (
    <div className="reset-container">
    <div className="reset-wrapper">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleSubmit} >
            
                <Input
                icon={Lock}
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                />
                <Input
                icon={Key}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                />
                <button className="submit-button" type="submit"> {loading?<Loader/>:"Reset Password"} </button>

        </form>
       
    </div>

</div>

  )
}

export default ResetPassword