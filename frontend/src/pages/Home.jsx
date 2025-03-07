import React, { useRef, useState } from "react";
import '../styles/Home.css';
import Input from "../components/input";
import { Lock, Mail, User} from 'lucide-react';
import { Link } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Home() {

  const {user, logout} = userStore();
  const navigate = useNavigate()
  
  const handleLogout =async()=>{
    //  e.preventDefault();
     // console.log("Form Submitted",formData)
      try{
         const response = await logout();
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
    <div className="home-container">
        {user?(<div className="profile">
            <div className="avatar">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="details">
                <h2 className="username">{user.name}</h2>
                <p className="email">Email: {user.email}</p>
                <p className="last-login"> Last Logon: {user.lastLogin?.split('T')[0]} </p>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>):(<p>Loading user details.....</p>)}
    </div>

  )
}


export default Home