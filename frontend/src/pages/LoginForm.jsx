import React, { useState } from "react";
import '../styles/LoginForm.css';
import Input from "../components/input";
import { Loader, Lock, Mail, User} from 'lucide-react';
import { Link } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function LoginForm() {
     const [formData,setFormData]=useState
        ({
        email:"",
        password:""
        })
        const navigate = useNavigate()
        
        const {login, loading} = userStore()
        const handleChange=(e)=>{
            const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]:value
            })}
         const handleSubmit=async(e)=>{
                e.preventDefault();
                // console.log("Login Form Submitted",formData) 
                try{
                    const loginMessage=await login(formData.email, formData.password);
                    toast.success(loginMessage,{
                                        position:'top-center',
                                        autoClose: 3000
                                    });
                      navigate("/");

                }catch(err){
                 toast.error(err,{
                  position:'top-center',
                   autoClose: 3000
                  });
                
                            }
            }

  return (
    <div className="login-container">
        <div className="login-wrapper">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} >
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
                    <Link to="/forgotPassword" className='forgot'>Forgot Password</Link>
                    <button className="submit-button" type="submit"> {loading?<Loader/>:"Login"}

                    </button>

            </form>
            <div className="form-footer">
                Dont have an account? <Link to="/register">Register</Link>
            </div>
        </div>

    </div>

  )
}

export default LoginForm