import React, { useRef, useState } from "react";
import '../styles/ForgotPassword.css';
import Input from "../components/input";
import { ArrowLeft, Loader, Lock, Mail, User} from 'lucide-react';
import { Link } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";


function ForgotPassword() {

    const [email, setEmail]= useState("");
    const [submitted, setSubmitted]= useState(false);
    const { forgotPassword, loading }=userStore()
    const handleChange=(e)=>{
        setEmail(e.target.value)
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // setSubmitted(true)
        // console.log(`Reset password request for:`,email);
        try{
            const response=await forgotPassword(email);
             toast.success(response,{
             position:'top-center',
             autoClose: 3000
             });
             setSubmitted(true)
            navigate("/");

        }catch(err){
            toast.error(err,{
             position:'top-center',
             autoClose: 3000
             });
        }
        
    }
     

  return (
    <>
    { !submitted?( 
        <div className="forgot-password-container">
            <div className="forgot-password-wrapper">
                <h2 className="forgot-password-title">Forgot Password</h2>
                <p className="forgot-password-description">Enter your email address and we'll send you the link to reset your password </p>
                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <div className="forgot-password-input-container">
                        <Input
                            icon={Mail}
                            type="text"
                            name="name"
                            placeholder="Enter your email address"
                            required
                            value={email}
                            onChange={handleChange}
                            />

                    </div>
                    <button className="forgot-password-submit" type="submit">{loading?<Loader/>:'Send Reset Link'}</button>
                    <Link to="/login" className="forgot-password-back-link"> ← Back to Login</Link>
                </form>
            </div>
        </div>
        )
        :
        (
            <div className="forgot-password-container">
                <div className="forgot-password-wrapper">
                    <h2 className="forgot-password-title">Forgot Password </h2>
                    <p className="forgot-password-description">Reset password link is sent to your registered email Id </p>
                    <Link to="/login" className="forgot-password-back-link"> ← Back to Login</Link>
                    
                </div>
            </div>
        )}</>

  )
}


export default ForgotPassword