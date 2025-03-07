import React, { useState } from "react";
import { Loader, Lock, Mail, User} from 'lucide-react'
import '../styles/RegistrationForm.css'
import Input from "../components/input";
import { Link } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import { userStore } from "../app/store";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

function RegistrationForm() {
    const [formData,setFormData]=useState
    ({
    name:"",
    email:"",
    password:""
    });

    // userStore((state)=>console.log(state))
    const navigate = useNavigate()

    const {register, loading} =userStore()




    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })}
        const handleSubmit=async(e)=>{
            e.preventDefault();
            // console.log("Form Submitted",formData)
            try{
                await register(formData.name, formData.email, formData.password);
                toast.success("Registration Successful",{
                    position:'top-center',
                    autoClose: 3000
                });
                navigate("/verifyEmail");


            }catch(err){
                toast.error(err,{
                    position:'top-center',
                    autoClose: 3000
                });

            }
        }

  return (
    <div className="form-container">
        <div className="form-wrapper">
            <h2 className="form-title"> Registration</h2>
            <form onSubmit={handleSubmit} >
                <div className="input-container">
                    <Input
                    icon={User}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    />
                    <Input
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <Input
                    icon={Lock}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    />

                <PasswordStrength password={formData.password}/>
                </div>
                
                <button className="submit-button" type="submit">
                    {loading?<Loader/>:"Register"}
                    </button>

            </form>
            <div className="form-footer">Already have an account? <Link to="/login">Login</Link>   </div>
        </div>
    </div>

  )
}

export default RegistrationForm